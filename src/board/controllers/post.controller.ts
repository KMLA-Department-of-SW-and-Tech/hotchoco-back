import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  Query,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { CreatePostDto } from '../dto/post/create-post.dto';
import { UpdatePostDto } from '../dto/post/update-post.dto';
import { PostService } from '../services/post.service';
import { FirebaseAuthGuard } from '../../common/guards/firebase-auth.guard';

@Controller('board/:boardId/posts')
@UseGuards(FirebaseAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Body() createDto: CreatePostDto,
  ) {
    return this.postService.create(boardId, createDto);
  }

  @Get()
  getAll(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.postService.getAll(boardId, { page, limit });
  }

  @Get(':id')
  get(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.postService.get(boardId, id);
  }

  @Patch(':id')
  update(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdatePostDto,
  ) {
    return this.postService.update(boardId, id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.postService.delete(boardId, id);
  }
}
