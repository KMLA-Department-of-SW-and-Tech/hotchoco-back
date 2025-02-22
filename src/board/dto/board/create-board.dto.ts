import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsMongoId()
  admin: string;

  @IsMongoId()
  reader: string;

  @IsMongoId({ each: true })
  posts: string[];
}
