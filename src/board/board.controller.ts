import { Controller } from '@nestjs/common';
import { Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { CreateBoardDto } from './dto/board/create-board.dto';
import { UpdateBoardDto } from './dto/board/update-board.dto';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') id: string) {
    return this.boardService.findOne(+id);
  }

  @Patch(':name')
  update(@Param('name') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }

  @Delete(':name')
  remove(@Param('name') id: string) {
    return this.boardService.remove(+id);
  }
}
