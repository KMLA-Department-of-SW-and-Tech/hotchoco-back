import { IsEnum } from 'class-validator';

export class UpdateUserPermissionsDto {
  @IsEnum(['member', 'admin'])
  role: 'member' | 'admin';
}
