import { ApiProperty } from '@nestjs/swagger';

export enum UserType {
  FOREIGNER = 'foreigner',
  STUDENT = 'student',
  GRADUATE = 'graduate',
}

export class UserDto {
  @ApiProperty({
    description: 'Firebase UID',
    example: 'someFirebaseUniqueId',
  })
  uid: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User wave (기수)',
    example: 10,
  })
  wave: number;

  @ApiProperty({
    description: 'Student number',
    example: 20240001,
  })
  student_number: number;

  @ApiProperty({
    description: 'User type',
    enum: UserType,
    example: UserType.STUDENT,
  })
  type: UserType;

  @ApiProperty({
    description: 'Birth date',
    example: '1990-01-01T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  birth_date: Date;

  @ApiProperty({
    description: 'Phone number (optional, without "-" or " ")',
    example: '01012345678',
    required: false,
  })
  phone?: number;

  @ApiProperty({
    description: 'User name',
    example: '홍길동',
  })
  name: string;

  @ApiProperty({
    description: 'Indicates if the user is a manager (optional)',
    example: false,
    required: false,
  })
  isManager?: boolean;
}
