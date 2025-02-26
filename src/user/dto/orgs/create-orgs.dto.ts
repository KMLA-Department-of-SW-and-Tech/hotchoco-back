import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrgsDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  readonly manager: string[];

  @IsString()
  readonly description: string;
}
