import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('유저')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({
    summary: '유저 생성',
    description: '새로운 유저를 생성합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '유저가 성공적으로 생성되었습니다.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':uid')
  @ApiOperation({
    summary: '유저 조회',
    description: 'uid를 통해 특정 유저의 정보를 조회합니다.',
  })
  @ApiParam({
    name: 'uid',
    required: true,
    description: '유저의 고유 식별자',
  })
  @ApiResponse({
    status: 200,
    description: '유저 정보를 성공적으로 조회했습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '유저를 찾을 수 없습니다.',
  })
  findOne(@Param('uid') uid: string) {
    return this.userService.findOne(uid);
  }

  @Patch(':uid')
  @ApiOperation({
    summary: '유저 정보 수정',
    description: '특정 유저의 정보를 수정합니다.',
  })
  @ApiParam({
    name: 'uid',
    required: true,
    description: '유저의 고유 식별자',
  })
  @ApiResponse({
    status: 200,
    description: '유저 정보가 성공적으로 수정되었습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '유저를 찾을 수 없습니다.',
  })
  update(@Param('uid') uid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(uid, updateUserDto);
  }

  @Delete(':uid')
  @ApiOperation({
    summary: '유저 삭제',
    description: '특정 유저를 삭제합니다.',
  })
  @ApiParam({
    name: 'uid',
    required: true,
    description: '유저의 고유 식별자',
  })
  @ApiResponse({
    status: 200,
    description: '유저가 성공적으로 삭제되었습니다.',
  })
  @ApiResponse({
    status: 404,
    description: '유저를 찾을 수 없습니다.',
  })
  remove(@Param('uid') uid: string) {
    return this.userService.remove(uid);
  }
}
