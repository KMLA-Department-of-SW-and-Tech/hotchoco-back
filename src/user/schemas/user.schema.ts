import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Orgs } from './orgs.schema';

export type UserDocument = HydratedDocument<User>;

export enum UserTypes {
  foreigner,
  student,
  graduate,
}

@Schema()
export class User {
  @Prop({ required: true })
  uid: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  wave: number;

  @Prop({ required: true })
  student_number: number;

  @Prop({ required: true, enum: UserTypes })
  type: UserTypes;

  @Prop({ required: true })
  birth_date: Date;

  @Prop()
  phone: string;

  @Prop({ required: true })
  name: string; // ABC 포함

  @Prop()
  description: string;

  @Prop()
  profile_picture: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Orgs' }] })
  orgs: Orgs[];

  @Prop()
  major: string;

  @Prop()
  instagram_handle: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
