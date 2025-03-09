import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  private readonly users: Map<string, User> = new Map();

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      ...createUserDto,
    };

    this.users.set(user.uid, user);
    return user;
  }

  findOne(uid: string): User {
    const user = this.users.get(uid);
    if (!user) {
      throw new NotFoundException(`User with UID ${uid} not found`);
    }
    return user;
  }

  update(uid: string, updateUserDto: UpdateUserDto): User {
    const user = this.findOne(uid);
    const updatedUser: User = {
      ...user,
      ...updateUserDto,
    };

    this.users.set(uid, updatedUser);
    return updatedUser;
  }

  remove(uid: string): void {
    const exists = this.users.delete(uid);
    if (!exists) {
      throw new NotFoundException(`User with UID ${uid} not found`);
    }
  }
}
