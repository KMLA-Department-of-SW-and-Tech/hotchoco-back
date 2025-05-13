import { IsString, IsIn } from 'class-validator';

export class AddUserDto {
  @IsString()
  uid: string;

  @IsString()
  @IsIn(['member', 'admin'])
  role: 'member' | 'admin';

  @IsString()
  @IsIn(['active', 'retired'])
  status: 'active' | 'retired';
}
