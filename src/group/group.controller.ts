import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { AddUserDto } from './dto/add-user.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UpdateUserPermissionsDto } from './dto/update-user-permissions.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGroup(createGroupDto);
  }

  @Post(':groupId/users')
  addUserToGroup(
    @Param('groupId') groupId: string,
    @Body() addUserDto: AddUserDto,
  ) {
    return this.groupService.addUserToGroup(groupId, addUserDto);
  }

  @Get(':groupId')
  getGroup(@Param('groupId') groupId: string) {
    return this.groupService.getGroup(groupId);
  }

  @Get(':groupId/users')
  getGroupUsers(@Param('groupId') groupId: string) {
    return this.groupService.getGroupUsers(groupId);
  }

  @Get()
  getAllGroups() {
    return this.groupService.getAllGroups();
  }

  @Patch(':groupId')
  updateGroup(
    @Param('groupId') groupId: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.updateGroup(groupId, updateGroupDto);
  }

  @Patch(':groupId/users/:userId/permissions')
  updateUserPermissions(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
    @Body() updateUserPermissionsDto: UpdateUserPermissionsDto,
  ) {
    return this.groupService.updateUserPermissions(
      groupId,
      userId,
      updateUserPermissionsDto,
    );
  }

  @Patch(':groupId/users/:userId/status')
  updateUserStatus(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
    @Body() updateUserStatusDto: UpdateUserStatusDto,
  ) {
    return this.groupService.updateUserStatus(
      groupId,
      userId,
      updateUserStatusDto,
    );
  }

  @Delete(':groupId')
  deleteGroup(@Param('groupId') groupId: string) {
    return this.groupService.deleteGroup(groupId);
  }

  @Delete(':groupId/users/:userId')
  removeUserFromGroup(
    @Param('groupId') groupId: string,
    @Param('userId') userId: string,
  ) {
    return this.groupService.removeUserFromGroup(groupId, userId);
  }
}
