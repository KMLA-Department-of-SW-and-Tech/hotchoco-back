import { Injectable, NotFoundException } from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { CreateGroupDto } from './dto/create-group.dto';
import { AddUserDto } from './dto/add-user.dto';
import { Group, GroupSchema } from './schemas/group.schema';
import { UserGroup, UserGroupSchema } from './schemas/user-group.schema';
import { User, UserSchema } from '../user/schemas/user.schema';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UpdateUserPermissionsDto } from './dto/update-user-permissions.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';

@Injectable()
export class GroupService {
  private readonly groupCollection = 'groups';
  private readonly userGroupCollection = 'user_groups';
  private get firestore() {
    return getFirestore();
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<Group> {
    const groupData = GroupSchema.parse(createGroupDto);

    const groupRef = this.firestore
      .collection(this.groupCollection)
      .doc(groupData.id);
    await groupRef.set(groupData);
    return groupData;
  }

  async addUserToGroup(
    groupId: string,
    addUserDto: AddUserDto,
  ): Promise<UserGroup> {
    const userGroupData = UserGroupSchema.parse({
      ...addUserDto,
      groupId,
      joinedAt: new Date(),
    });

    const docId = `${userGroupData.uid}_${groupId}`;

    const userGroupRef = this.firestore
      .collection(this.userGroupCollection)
      .doc(docId); //

    await userGroupRef.set(userGroupData);
    return userGroupData;
  }

  async getGroup(groupId: string): Promise<Group> {
    const groupDoc = await this.firestore
      .collection(this.groupCollection)
      .doc(groupId)
      .get();

    if (!groupDoc.exists) {
      throw new NotFoundException(`Group with groupID ${groupId} not found`);
    }

    const groupData = groupDoc.data() as Group;
    return GroupSchema.parse(groupData);
  }

  async getGroupUsers(groupId: string): Promise<User[]> {
    const snapshot = await this.firestore
      .collection(this.userGroupCollection)
      .where('groupId', '==', groupId)
      .get();

    const userDocs = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const { uid } = doc.data() as { uid: string };

        // Step 2: Fetch the actual user document
        const userSnap = await this.firestore
          .collection('users')
          .doc(uid)
          .get();

        if (!userSnap.exists) {
          throw new NotFoundException(
            `User with ${uid} not found during user-group search`,
          );
        }

        const raw = userSnap.data() as User;
        raw.birth_date =
          raw.birth_date instanceof Date
            ? raw.birth_date
            : (raw.birth_date as FirebaseFirestore.Timestamp).toDate();
        if (!raw) throw new NotFoundException('User data is undefined');

        // Step 3: Convert Firestore Timestamp to JS Date before parsing
        return UserSchema.parse(raw);
      }),
    );

    return userDocs;
  }

  async getAllGroups(): Promise<Group[]> {
    const snapshot = await this.firestore
      .collection(this.groupCollection)
      .get();
    const groups = snapshot.docs.map((doc) => GroupSchema.parse(doc.data()));
    return groups;
  }

  async updateGroup(
    groupId: string,
    updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    const groupRef = this.firestore
      .collection(this.groupCollection)
      .doc(groupId);
    const groupDoc = await groupRef.get();
    if (!groupDoc.exists) {
      throw new NotFoundException(`Group with groupId ${groupId} not found`);
    }
    const currentData = groupDoc.data() as Group;
    const updatedData = { ...currentData, ...updateGroupDto };
    const validatedData = GroupSchema.parse(updatedData);
    await groupRef.set(validatedData);
    return validatedData;
  }

  async updateUserPermissions(
    groupId: string,
    userId: string,
    updateUserPermissionsDto: UpdateUserPermissionsDto,
  ): Promise<UserGroup> {
    const docId = `${userId}_${groupId}`;
    const userGroupRef = this.firestore
      .collection(this.userGroupCollection)
      .doc(docId);

    const userGroupDoc = await userGroupRef.get();

    if (!userGroupDoc.exists) {
      throw new NotFoundException(
        `UserGroup (${userId} in ${groupId}) not found during user permission update`,
      );
    }

    const currentData = userGroupDoc.data();
    if (!currentData) {
      throw new NotFoundException(`Data missing in document ${docId}`);
    }

    // Merge current and updated values
    const mergedData = {
      ...currentData,
      ...updateUserPermissionsDto,
    };

    // Validate merged data
    const validatedData = UserGroupSchema.parse(mergedData);

    // Update with validated data
    await userGroupRef.set(validatedData); // or `.update(...)` if partial update is preferred

    return validatedData;
  }

  async updateUserStatus(
    groupId: string,
    userId: string,
    updateUserStatusDto: UpdateUserStatusDto,
  ): Promise<UserGroup> {
    const docId = `${userId}_${groupId}`;
    const userGroupRef = this.firestore
      .collection(this.userGroupCollection)
      .doc(docId);

    const userGroupDoc = await userGroupRef.get();
    if (!userGroupDoc.exists) {
      throw new NotFoundException(
        `UserGroup (${userId} in ${groupId}) not found during user status update`,
      );
    }
    const currentData = userGroupDoc.data();
    if (!currentData) {
      throw new NotFoundException(`UserGroup document (${docId}) has no data`);
    }
    const mergedData = {
      ...currentData,
      ...updateUserStatusDto,
    };
    const validatedData = UserGroupSchema.parse(mergedData);
    await userGroupRef.set(validatedData);
    return validatedData;
  }
  async deleteGroup(groupId: string) {
    const groupRef = this.firestore
      .collection(this.groupCollection)
      .doc(groupId);
    const groupDoc = await groupRef.get();
    if (!groupDoc.exists) {
      throw new NotFoundException(`Group with groupId ${groupId} not found`);
    }
    await groupRef.delete();
  }
  async removeUserFromGroup(groupId: string, userId: string) {
    const docId = `${userId}_${groupId}`;
    const userGroupRef = this.firestore
      .collection(this.userGroupCollection)
      .doc(docId);
    const userGroupDoc = await userGroupRef.get();
    if (!userGroupDoc.exists) {
      throw new NotFoundException(
        `User Group with userGroupId ${userId}_${groupId} not found`,
      );
    }
    await userGroupRef.delete();
  }
}
