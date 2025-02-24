import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsMongoId()
  readonly admin: string;

  @IsMongoId()
  readonly reader: string;

  @IsArray()
  @IsMongoId({ each: true })
  readonly posts: string[];
}
