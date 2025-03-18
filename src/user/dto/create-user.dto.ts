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
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '유저의 고유 식별자',
    example: 'abc123xyz',
  })
  @IsString()
  uid: string;

  @ApiProperty({
    description: '유저의 이메일 주소',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '기수',
    example: 1,
  })
  @IsNumber()
  wave: number;

  @ApiProperty({
    description: '학번',
    example: 20240001,
  })
  @IsNumber()
  student_number: number;

  @ApiProperty({
    description: '유저 타입',
    enum: ['foreigner', 'student', 'graduate'],
    example: 'student',
  })
  @IsEnum(['foreigner', 'student', 'graduate'])
  type: 'foreigner' | 'student' | 'graduate';

  @ApiProperty({
    description: '생년월일',
    example: '2000-01-01',
  })
  @Type(() => Date)
  @IsDate()
  birth_date: Date;

  @ApiProperty({
    description: '전화번호',
    example: 821012345678,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  phone?: number;

  @ApiProperty({
    description: '이름',
    example: '홍길동',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: '관리자 여부',
    example: false,
    required: false,
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  isManager?: boolean;
}
