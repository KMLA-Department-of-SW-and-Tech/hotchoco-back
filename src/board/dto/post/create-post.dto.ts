import { IsArray, IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreatePostDto {
  // no createdAt, id prop in the dto because it will be set by the server

  @IsBoolean()
  @IsNotEmpty()
  readonly isAnonymous: boolean;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsArray()
  @IsString({ each: true })
  readonly images: string[];

  @IsArray()
  @IsString({ each: true })
  readonly files: string[];
}
