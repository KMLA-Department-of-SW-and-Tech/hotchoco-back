import { Injectable, NotFoundException } from '@nestjs/common';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import { CreateCommentDto } from '../dto/comment/create-comment.dto';
import { UpdateCommentDto } from '../dto/comment/update-comment.dto';
import { Comment } from '../schemas/comment.schema';
import { PostService } from './post.service';
import {
  FirestoreComment,
  PaginationOptions,
  PaginatedResponse,
} from '../types/firestore.types';
import { Reaction } from '../schemas/reaction.schema';

@Injectable()
export class CommentService {
  private db = getFirestore();
  private commentsCollection = this.db.collection('comments');

  constructor(private readonly postService: PostService) {}

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

  private convertComment(data: FirestoreComment & { id: string }): Comment {
    return {
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt?.toDate(),
    };
  }

  async create(
    boardId: string,
    postId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const postExists = await this.postService.exists(boardId, postId);
    if (!postExists) {
      throw new NotFoundException(
        `Post with ID "${postId}" not found in board "${boardId}"`,
      );
    }

    const commentRef = this.commentsCollection.doc();
    const comment: FirestoreComment = {
      id: commentRef.id,
      postId,
      parentId: null, // TODO: Support nested comments
      author: createCommentDto.isAnonymous ? 'Anonymous' : 'USER_ID', // TODO: Get from auth context
      content: createCommentDto.content,
      createdAt: Timestamp.now(),
      reactions: this.initializeReactions(),
    };

    await commentRef.set(comment);
    return this.convertComment(comment);
  }

  async getAll(
    boardId: string,
    postId: string,
    options: PaginationOptions,
  ): Promise<PaginatedResponse<Comment>> {
    const { page, limit } = options;
    const skip = (page - 1) * limit;

    const snapshot = await this.commentsCollection
      .where('postId', '==', postId)
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
    const comments: Comment[] = [];

    const commentDocs = await this.commentsCollection
      .where('postId', '==', postId)
      .orderBy('createdAt', 'desc')
      .offset(skip)
      .limit(limit)
      .get();

    commentDocs.forEach((doc) => {
      const data = doc.data() as FirestoreComment;
      comments.push(this.convertComment({ ...data, id: doc.id }));
    });

    return {
      items: comments,
      total,
      page,
      limit,
    };
  }

  async update(
    boardId: string,
    postId: string,
    commentId: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const postExists = await this.postService.exists(boardId, postId);
    if (!postExists) {
      throw new NotFoundException(
        `Post with ID "${postId}" not found in board "${boardId}"`,
      );
    }

    const commentRef = this.commentsCollection.doc(commentId);
    const commentDoc = await commentRef.get();

    if (!commentDoc.exists || commentDoc.data()?.postId !== postId) {
      throw new NotFoundException(
        `Comment with ID "${commentId}" not found in post "${postId}"`,
      );
    }

    // TODO: Check if user is author or has permission

    const updateData = {
      ...updateCommentDto,
      updatedAt: Timestamp.now(),
    };

    await commentRef.update(updateData);

    const updatedDoc = await commentRef.get();
    return this.convertComment({
      ...(updatedDoc.data() as FirestoreComment),
      id: updatedDoc.id,
    });
  }

  async delete(
    boardId: string,
    postId: string,
    commentId: string,
  ): Promise<void> {
    const postExists = await this.postService.exists(boardId, postId);
    if (!postExists) {
      throw new NotFoundException(
        `Post with ID "${postId}" not found in board "${boardId}"`,
      );
    }

    const commentRef = this.commentsCollection.doc(commentId);
    const commentDoc = await commentRef.get();

    if (!commentDoc.exists || commentDoc.data()?.postId !== postId) {
      throw new NotFoundException(
        `Comment with ID "${commentId}" not found in post "${postId}"`,
      );
    }

    // TODO: Check if user is author or has permission

    await commentRef.delete();
  }
}
