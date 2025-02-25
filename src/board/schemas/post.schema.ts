import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Comment } from './comment.schema';
import { User } from 'src/user/schemas/user.schema';

export enum Reaction {
  LIKE = 'like',
  LOVE = 'love',
  CARE = 'care',
  HAHA = 'haha',
  WOW = 'wow',
  SAD = 'sad',
  ANGRY = 'angry',
}

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Date, required: true, default: Date.now }) // use the server's time
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: Comment[];

  @Prop({ type: [String], enum: Reaction })
  reactions: Reaction[];

  // @Prop()
  // likes: number;
  // 페이스북처럼 리액션처럼 하거나 그냥 좋아요만 할 수 있거나
}

export const PostSchema = SchemaFactory.createForClass(Post);
