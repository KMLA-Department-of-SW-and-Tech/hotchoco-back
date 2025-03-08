import { Injectable } from '@nestjs/common';
import { CreateBoardDto } from './dto/board/create-board.dto';
import { UpdateBoardDto } from './dto/board/update-board.dto';
// import { Board } from './schemas/board.schema';

@Injectable()
export class BoardService {
  create(_createBoardDto: CreateBoardDto) {
    // TODO: Implement create logic
    throw new Error('Method not implemented.');
  }

  findAll() {
    // TODO: Implement findAll logic
    throw new Error('Method not implemented.');
  }

  findOne(_id: number) {
    // TODO: Implement findOne logic
    throw new Error('Method not implemented.');
  }

  update(_id: number, _updateBoardDto: UpdateBoardDto) {
    // TODO: Implement update logic
    throw new Error('Method not implemented.');
  }

  remove(_id: number) {
    // TODO: Implement remove logic
    throw new Error('Method not implemented.');
  }
}
