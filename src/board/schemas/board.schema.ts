import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from './post.schema';
import { Orgs } from 'src/user/schemas/orgs.schema';

export type BoardDocument = HydratedDocument<Board>;

@Schema()
export class Board {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Orgs',
    required: false,
  })
  admin: Orgs;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Orgs',
    required: false,
  })
  reader: Orgs;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: Post[];
}

export const BoardSchema = SchemaFactory.createForClass(Board);
