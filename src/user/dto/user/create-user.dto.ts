import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsUrl,
} from 'class-validator';
import { UserTypes } from 'src/user/schemas/user.schema';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly uid: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNumber()
  @IsNotEmpty()
  readonly wave: number;

  @IsNumber()
  @IsNotEmpty()
  readonly student_number: number;

  @IsEnum(UserTypes)
  @IsNotEmpty()
  readonly type: UserTypes;

  @IsDate()
  @IsNotEmpty()
  readonly birth_date: Date;

  @IsPhoneNumber('KR')
  readonly phone: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsUrl() // firebase storage에서 어떻게 처리하냐에 따라 다르다면서 정욱이가 주석 남기랬어요요
  readonly profile_picture: string;

  @IsArray()
  @IsString({ each: true })
  readonly orgs: string[];

  @IsString()
  readonly major: string;

  @IsUrl() // firebase storage에서 어떻게 처리하냐에 따라 다르다면서 정욱이가 주석 남기랬어요요
  readonly instagram_handle: string;
}
