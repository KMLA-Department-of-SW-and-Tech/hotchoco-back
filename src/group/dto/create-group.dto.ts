import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsUUID()
  uid: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
