import { Module } from '@nestjs/common';
import { BoardController } from './controllers/board.controller';
import { PostController } from './controllers/post.controller';
import { CommentController } from './controllers/comment.controller';
import { BoardService } from './services/board.service';
import { PostService } from './services/post.service';
import { CommentService } from './services/comment.service';

@Module({
  imports: [],
  controllers: [BoardController, PostController, CommentController],
  providers: [BoardService, PostService, CommentService],
})
export class BoardModule {}
