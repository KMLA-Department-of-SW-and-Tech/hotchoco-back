import { Injectable, NotFoundException } from '@nestjs/common';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { CreatePostDto } from '../dto/post/create-post.dto';
import { UpdatePostDto } from '../dto/post/update-post.dto';
import { Post } from '../schemas/post.schema';
import { BoardService } from './board.service';
import {
  FirestorePost,
  PaginationOptions,
  PaginatedResponse,
} from '../types/firestore.types';
import { Reaction } from '../schemas/reaction.schema';

@Injectable()
export class PostService {
  private db = getFirestore();
  private postsCollection = this.db.collection('posts');
  private commentsCollection = this.db.collection('comments');

  constructor(private readonly boardService: BoardService) {}

  private initializeReactions(): Reaction {
    return {
      like: 0,
      love: 0,
      care: 0,
      haha: 0,
      wow: 0,
      sad: 0,
      angry: 0,
    };
  }

  private convertPost(data: FirestorePost & { id: string }): Post {
    return {
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    };
  }

  async create(boardId: string, createPostDto: CreatePostDto): Promise<Post> {
    const boardExists = await this.boardService.exists(boardId);
    if (!boardExists) {
      throw new NotFoundException(`Board with ID "${boardId}" not found`);
    }

    const postRef = this.postsCollection.doc();
    const post: FirestorePost = {
      id: postRef.id,
      boardId,
      author: createPostDto.isAnonymous ? 'Anonymous' : 'USER_ID', // TODO: Get from auth context
      title: createPostDto.title,
      content: createPostDto.content,
      images: createPostDto.images,
      files: createPostDto.files,
      createdAt: Timestamp.now(),
      reactions: this.initializeReactions(),
    };

    await postRef.set(post);
    return this.convertPost(post);
  }

  async getAll(
    boardId: string,
    options: PaginationOptions,
  ): Promise<PaginatedResponse<Post>> {
    const { page, limit } = options;
    const skip = (page - 1) * limit;

    const snapshot = await this.postsCollection
      .where('boardId', '==', boardId)
      .get();
    if (snapshot.empty) {
      return {
        items: [],
        total: 0,
        page,
        limit,
      };
    }

    const total = snapshot.size;
    const posts: Post[] = [];

    const postDocs = await this.postsCollection
      .where('boardId', '==', boardId)
      .orderBy('createdAt', 'desc')
      .offset(skip)
      .limit(limit)
      .get();

    postDocs.forEach((doc) => {
      const data = doc.data() as FirestorePost;
      posts.push(this.convertPost({ ...data, id: doc.id }));
    });

    return {
      items: posts,
      total,
      page,
      limit,
    };
  }

  async get(boardId: string, postId: string): Promise<Post> {
    const postDoc = await this.postsCollection.doc(postId).get();

    if (!postDoc.exists || postDoc.data()?.boardId !== boardId) {
      throw new NotFoundException(
        `Post with ID "${postId}" not found in board "${boardId}"`,
      );
    }

    return this.convertPost({
      ...(postDoc.data() as FirestorePost),
      id: postDoc.id,
    });
  }

  async update(
    boardId: string,
    postId: string,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    const postRef = this.postsCollection.doc(postId);
    const postDoc = await postRef.get();

    if (!postDoc.exists || postDoc.data()?.boardId !== boardId) {
      throw new NotFoundException(
        `Post with ID "${postId}" not found in board "${boardId}"`,
      );
    }

    // TODO: Check if user is author or has permission

    const updateData = {
      ...updatePostDto,
      updatedAt: Timestamp.now(),
    };

    await postRef.update(updateData);

    const updatedDoc = await postRef.get();
    return this.convertPost({
      ...(updatedDoc.data() as FirestorePost),
      id: updatedDoc.id,
    });
  }

  async delete(boardId: string, postId: string): Promise<void> {
    const postRef = this.postsCollection.doc(postId);
    const postDoc = await postRef.get();

    if (!postDoc.exists || postDoc.data()?.boardId !== boardId) {
      throw new NotFoundException(
        `Post with ID "${postId}" not found in board "${boardId}"`,
      );
    }

    // TODO: Check if user is author or has permission

    // Get all comments for this post
    const commentsSnapshot = await this.commentsCollection
      .where('postId', '==', postId)
      .get();

    // Delete all comments and the post in a batch
    const batch = this.db.batch();

    commentsSnapshot.docs.forEach((commentDoc) => {
      batch.delete(commentDoc.ref);
    });

    batch.delete(postRef);

    // Execute all deletions in a single batch
    await batch.commit();
  }

  async exists(boardId: string, postId: string): Promise<boolean> {
    const postDoc = await this.postsCollection.doc(postId).get();
    return postDoc.exists && postDoc.data()?.boardId === boardId;
  }
}
