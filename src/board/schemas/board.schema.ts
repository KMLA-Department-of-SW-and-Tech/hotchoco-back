import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from './post.schema';

export type BoardDocument = HydratedDocument<Board>;

@Schema()
export class Board {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization', // Organization schema must be implemented
    required: false,
  })
  admin: string; // later change to Organization

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: false,
  })
  reader: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: Post[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
