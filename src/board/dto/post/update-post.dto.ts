import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto copy';

export class updatePostDto extends PartialType(CreatePostDto) {}
