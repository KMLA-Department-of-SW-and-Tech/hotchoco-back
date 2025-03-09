import { IsEnum } from 'class-validator';

export class UpdateUserStatusDto {
  @IsEnum(['active', 'retired'])
  status: 'active' | 'retired';
}
