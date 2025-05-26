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
import { CreateCommentDto } from '../dto/comment/create-comment.dto';
import { UpdateCommentDto } from '../dto/comment/update-comment.dto';
import { CommentService } from '../services/comment.service';
import { FirebaseAuthGuard } from '../../common/guards/firebase-auth.guard';

@Controller('board/:boardId/posts/:postId/comments')
@UseGuards(FirebaseAuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() createDto: CreateCommentDto,
  ) {
    return this.commentService.create(boardId, postId, createDto);
  }

  @Get()
  getAll(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.commentService.getAll(boardId, postId, { page, limit });
  }

  @Patch(':id')
  update(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateCommentDto,
  ) {
    return this.commentService.update(boardId, postId, id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(
    @Param('boardId', ParseUUIDPipe) boardId: string,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.commentService.delete(boardId, postId, id);
  }
}
