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

export class CreateUserDto {
  @IsString()
  uid: string;

  @IsEmail()
  email: string;

  @IsNumber()
  wave: number;

  @IsNumber()
  student_number: number;

  @IsEnum(['foreigner', 'student', 'graduate'])
  type: 'foreigner' | 'student' | 'graduate';

  @Type(() => Date)
  @IsDate()
  birth_date: Date;

  @IsNumber()
  @IsOptional()
  phone?: number;

  @IsString()
  name: string;

  @IsBoolean()
  @IsOptional()
  isManager?: boolean;
}
