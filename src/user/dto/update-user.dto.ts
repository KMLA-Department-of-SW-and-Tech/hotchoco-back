import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsNumber()
  @IsOptional()
  wave?: number;

  @IsNumber()
  @IsOptional()
  student_number?: number;

  @IsEnum(['foreigner', 'student', 'graduate'])
  @IsOptional()
  type?: 'foreigner' | 'student' | 'graduate';

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  birth_date?: Date;

  @IsNumber()
  @IsOptional()
  phone?: number;

  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  isManager?: boolean;
}
