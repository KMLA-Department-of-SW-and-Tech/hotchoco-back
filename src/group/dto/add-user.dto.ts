import { IsUUID, IsEnum } from 'class-validator';

export class AddUserDto {
  @IsUUID()
  uid: string;

  @IsEnum(['member', 'admin'])
  role: 'member' | 'admin';
}
