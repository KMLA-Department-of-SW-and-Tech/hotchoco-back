import { PartialType } from '@nestjs/mapped-types';
import { CreateOrgsDto } from './create-orgs.dto';

export class UpdateOrgsDto extends PartialType(CreateOrgsDto) {}
