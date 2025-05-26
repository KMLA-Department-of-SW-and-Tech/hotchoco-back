import { Timestamp } from 'firebase-admin/firestore';
import { Board } from '../schemas/board.schema';
import { Post } from '../schemas/post.schema';
import { Comment } from '../schemas/comment.schema';

export interface FirestoreBoard extends Omit<Board, 'createdAt'> {
  createdAt: Timestamp;
}

export interface FirestorePost extends Omit<Post, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface FirestoreComment
  extends Omit<Comment, 'createdAt' | 'updatedAt'> {
  createdAt: Timestamp;
  updatedAt?: Timestamp;
}

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
