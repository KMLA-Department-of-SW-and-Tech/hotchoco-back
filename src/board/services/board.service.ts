import { Injectable, NotFoundException } from '@nestjs/common';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { CreateBoardDto } from '../dto/board/create-board.dto';
import { UpdateBoardDto } from '../dto/board/update-board.dto';
import { Board } from '../schemas/board.schema';
import {
  FirestoreBoard,
  PaginationOptions,
  PaginatedResponse,
} from '../types/firestore.types';

@Injectable()
export class BoardService {
  private db = getFirestore();
  private boardsCollection = this.db.collection('boards');
  private postsCollection = this.db.collection('posts');
  private commentsCollection = this.db.collection('comments');

  private convertBoard(data: FirestoreBoard & { id: string }): Board {
    return {
      ...data,
      createdAt: data.createdAt.toDate(),
    };
  }

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const boardRef = this.boardsCollection.doc();
    const board: FirestoreBoard = {
      id: boardRef.id,
      name: createBoardDto.name,
      description: createBoardDto.description,
      createdAt: Timestamp.now(),
    };

    await boardRef.set(board);
    return this.convertBoard(board);
  }

  async getAll(options: PaginationOptions): Promise<PaginatedResponse<Board>> {
    const { page, limit } = options;
    const skip = (page - 1) * limit;

    const snapshot = await this.boardsCollection.get();
    if (snapshot.empty) {
      return {
        items: [],
        total: 0,
        page,
        limit,
      };
    }

    const total = snapshot.size;
    const boards: Board[] = [];

    const boardDocs = await this.boardsCollection
      .orderBy('name')
      .offset(skip)
      .limit(limit)
      .get();

    boardDocs.forEach((doc) => {
      const data = doc.data() as FirestoreBoard;
      boards.push(this.convertBoard({ ...data, id: doc.id }));
    });

    return {
      items: boards,
      total,
      page,
      limit,
    };
  }

  async get(id: string): Promise<Board> {
    const boardDoc = await this.boardsCollection.doc(id).get();

    if (!boardDoc.exists) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }

    return this.convertBoard({
      ...(boardDoc.data() as FirestoreBoard),
      id: boardDoc.id,
    });
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const boardRef = this.boardsCollection.doc(id);
    const boardDoc = await boardRef.get();

    if (!boardDoc.exists) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }

    const updateData: Partial<Omit<FirestoreBoard, 'id' | 'createdAt'>> = {
      ...updateBoardDto,
    };

    await boardRef.update(updateData);

    const updatedDoc = await boardRef.get();
    return this.convertBoard({
      ...(updatedDoc.data() as FirestoreBoard),
      id: updatedDoc.id,
    });
  }

  async delete(id: string): Promise<void> {
    const boardRef = this.boardsCollection.doc(id);
    const boardDoc = await boardRef.get();

    if (!boardDoc.exists) {
      throw new NotFoundException(`Board with ID "${id}" not found`);
    }

    // Get all posts in the board
    const postsSnapshot = await this.postsCollection
      .where('boardId', '==', id)
      .get();

    // Delete all comments and posts
    const batch = this.db.batch();

    for (const postDoc of postsSnapshot.docs) {
      // Get and delete all comments for this post
      const commentsSnapshot = await this.commentsCollection
        .where('postId', '==', postDoc.id)
        .get();

      commentsSnapshot.docs.forEach((commentDoc) => {
        batch.delete(commentDoc.ref);
      });

      // Delete the post
      batch.delete(postDoc.ref);
    }

    // Delete the board
    batch.delete(boardRef);

    // Execute all deletions in a single batch
    await batch.commit();
  }

  async exists(id: string): Promise<boolean> {
    const boardDoc = await this.boardsCollection.doc(id).get();
    return boardDoc.exists;
  }
}
