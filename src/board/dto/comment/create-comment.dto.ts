import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateCommentDto {
  // no createdAt, id prop in the dto because it will be set by the server

  @IsBoolean()
  @IsNotEmpty()
  readonly isAnonymous: boolean;

  @IsString()
  @IsNotEmpty()
  readonly content: string;
}
