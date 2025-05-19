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
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { User } from '../common/decorators/user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { DecodedIdToken } from 'firebase-admin/auth';

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
    type: UserDto,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청입니다. (Bad Request)' })
  @ApiResponse({
    status: 401,
    description: '인증되지 않았습니다. (Unauthorized)',
  })
  @ApiResponse({
    status: 403,
    description: '접근 권한이 없습니다. (Forbidden)',
  })
  @ApiResponse({
    status: 500,
    description: '서버 오류가 발생했습니다. (Internal Server Error)',
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
    type: UserDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않았습니다. (Unauthorized)',
  })
  @ApiResponse({
    status: 403,
    description: '접근 권한이 없습니다. (Forbidden)',
  })
  @ApiResponse({ status: 404, description: '유저를 찾을 수 없습니다.' })
  @ApiResponse({
    status: 500,
    description: '서버 오류가 발생했습니다. (Internal Server Error)',
  })
  findOne(@Param('uid') uid: string) {
    return this.userService.findOne(uid);
  }

  @UseGuards(FirebaseAuthGuard)
  @Patch(':uid')
  @ApiOperation({
    summary: '유저 정보 수정',
    description: '특정 유저의 정보를 수정합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '유저 정보가 성공적으로 수정되었습니다.',
    type: UserDto,
  })
  @ApiResponse({ status: 400, description: '잘못된 요청입니다. (Bad Request)' })
  @ApiResponse({
    status: 401,
    description: '인증되지 않았습니다. (Unauthorized)',
  })
  @ApiResponse({
    status: 403,
    description: '접근 권한이 없습니다. (Forbidden)',
  })
  @ApiResponse({ status: 404, description: '유저를 찾을 수 없습니다.' })
  @ApiResponse({
    status: 500,
    description: '서버 오류가 발생했습니다. (Internal Server Error)',
  })
  update(@User() user: DecodedIdToken, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(user.uid, updateUserDto);
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete(':uid')
  @ApiOperation({
    summary: '유저 삭제',
    description: '특정 유저를 삭제합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '유저가 성공적으로 삭제되었습니다.',
  })
  @ApiResponse({
    status: 401,
    description: '인증되지 않았습니다. (Unauthorized)',
  })
  @ApiResponse({
    status: 403,
    description: '접근 권한이 없습니다. (Forbidden)',
  })
  @ApiResponse({ status: 404, description: '유저를 찾을 수 없습니다.' })
  @ApiResponse({
    status: 500,
    description: '서버 오류가 발생했습니다. (Internal Server Error)',
  })
  remove(@User() user: DecodedIdToken) {
    return this.userService.remove(user.uid);
  }
}
