import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard';
import { Request as ExpressRequest } from 'express';
import { DecodedIdToken } from 'firebase-admin/auth';

interface CustomRequest extends ExpressRequest {
  user: DecodedIdToken;
}
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.userService.findOne(uid);
  }

  @UseGuards(FirebaseAuthGuard)
  @Patch(':uid')
  update(
    @Request() req: CustomRequest,
    @Param('uid') uid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(uid, updateUserDto, req.user.uid);
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete(':uid')
  remove(@Request() req: CustomRequest, @Param('uid') uid: string) {
    return this.userService.remove(uid, req.user.uid);
  }
}
