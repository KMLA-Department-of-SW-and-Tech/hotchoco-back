import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IsValidUid } from '../../../common/decorators/is-valid-uid.decorator';

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string; // TODO: 같은 값이 존재하는가 체크하는 데코레이터 필요

  @IsString()
  readonly description: string;

  @IsArray()
  @IsString({ each: true })
  @IsValidUid({ each: true })
  readonly admin: string[]; // TODO: Check admin is a valid uid

  @IsArray()
  @IsString({ each: true })
  @IsValidUid({ each: true })
  readonly reader: string[];
}
