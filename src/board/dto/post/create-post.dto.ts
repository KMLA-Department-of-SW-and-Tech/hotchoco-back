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

  // no createdAt prop in the dto because it will be set by the server

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
  // 페이스북처럼 리액션처럼 하거나 그냥 좋아요만 할 수 있거나
}
