import {
  IsDate,
  IsEmail,
  IsEnum,
  IsMongoId,
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

  @IsUrl()
  readonly profile_picture: string;

  @IsMongoId({ each: true })
  readonly orgs: string[];

  @IsString()
  readonly major: string;

  @IsUrl()
  readonly instagram_handle: string;
}
