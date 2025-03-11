import { IsString, IsEnum } from 'class-validator';

export class AddUserDto {
  @IsString()
  uid: string;

  @IsEnum(['member', 'admin'])
  role: 'member' | 'admin';
}
