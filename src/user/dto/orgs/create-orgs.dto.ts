import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrgsDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsArray()
  @IsMongoId({ each: true })
  @IsNotEmpty()
  readonly manager: string[];

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
