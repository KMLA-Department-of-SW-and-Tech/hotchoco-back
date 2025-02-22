import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Reaction } from 'src/board/schemas/post.schema';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  // @IsDate()
  // @IsNotEmpty()
  // readonly createdAt: Date;

  @IsMongoId()
  @IsNotEmpty()
  readonly author: string;

  @IsArray()
  @IsMongoId({ each: true })
  readonly comments: string[];

  @IsArray()
  @IsEnum(Reaction, { each: true })
  readonly reactions: Reaction[];

  // @IsNumber()
  // readonly likes: number;
}
