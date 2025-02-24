import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type OrgsDocument = HydratedDocument<Orgs>;

@Schema()
export class Orgs {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  manager: User[];

  @Prop({ required: true })
  description: string;
}

export const OrgsSchema = SchemaFactory.createForClass(Orgs);
