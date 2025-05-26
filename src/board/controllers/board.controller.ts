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
import { CreateBoardDto } from '../dto/board/create-board.dto';
import { UpdateBoardDto } from '../dto/board/update-board.dto';
import { BoardService } from '../services/board.service';
import { FirebaseAuthGuard } from '../../common/guards/firebase-auth.guard';

@Controller('board')
@UseGuards(FirebaseAuthGuard)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createDto: CreateBoardDto) {
    return this.boardService.create(createDto);
  }

  @Get()
  getAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.boardService.getAll({ page, limit });
  }

  @Get(':id')
  get(@Param('id', ParseUUIDPipe) id: string) {
    return this.boardService.get(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateBoardDto,
  ) {
    return this.boardService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.boardService.delete(id);
  }
}
