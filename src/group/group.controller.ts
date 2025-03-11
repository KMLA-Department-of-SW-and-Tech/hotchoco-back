import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { FirebaseAuthGuard } from '../common/guards/firebase-auth.guard'; // FIXED IMPORT PATH
import { CreateGroupDto } from './dto/create-group.dto';
import { AddUserDto } from './dto/add-user.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UpdateUserPermissionsDto } from './dto/update-user-permissions.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';

@Controller('group')
@UseGuards(FirebaseAuthGuard)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  createGroup(@Body() _createGroupDto: CreateGroupDto) {
    return true; //this.groupService.createGroup(createGroupDto);
  }

  @Post(':groupId/users')
  addUserToGroup(
    @Param('groupId') _groupId: string,
    @Body() _addUserDto: AddUserDto,
  ) {
    return true; // this.groupService.addUserToGroup(groupId, addUserDto);
  }

  @Get(':groupId')
  getGroup(@Param('groupId') _groupId: string) {
    return true; // this.groupService.getGroup(groupId);
  }

  @Get(':groupId/users')
  getGroupUsers(@Param('groupId') _groupId: string) {
    return true; // this.groupService.getGroupUsers(groupId);
  }

  @Get()
  getGroups() {
    return true; // this.groupService.getGroups();
  }

  @Patch(':groupId')
  updateGroup(
    @Param('groupId') _groupId: string,
    @Body() _updateGroupDto: UpdateGroupDto,
  ) {
    return true; // this.groupService.updateGroup(groupId, updateGroupDto);
  }

  @Patch(':groupId/users/:userId/permissions')
  updateUserPermissions(
    @Param('groupId') _groupId: string,
    @Param('userId') _userId: string,
    @Body() _permissionsDto: UpdateUserPermissionsDto,
  ) {
    return true; /* this.groupService.updateUserPermissions(
      groupId,
      userId,
      permissionsDto,
    );
    */
  }

  @Patch(':groupId/users/:userId/status')
  updateUserStatus(
    @Param('groupId') _groupId: string,
    @Param('userId') _userId: string,
    @Body() _statusDto: UpdateUserStatusDto,
  ) {
    return true; // this.groupService.updateUserStatus(groupId, userId, statusDto);
  }

  @Delete(':groupId')
  deleteGroup(@Param('groupId') _groupId: string) {
    return true; // this.groupService.deleteGroup(groupId);
  }

  @Delete(':groupId/users/:userId')
  removeUserFromGroup(
    @Param('groupId') _groupId: string,
    @Param('userId') _userId: string,
  ) {
    return true; // this.groupService.removeUserFromGroup(groupId, userId);
  }
}
