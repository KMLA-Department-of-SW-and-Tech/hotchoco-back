import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { getFirestore } from 'firebase-admin/firestore';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserSchema } from './schemas/user.schema';

@Injectable()
export class UserService {
  private readonly userCollection = 'users';
  private get firestore() {
    return getFirestore();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const userData = UserSchema.parse(createUserDto);

    const userRef = this.firestore
      .collection(this.userCollection)
      .doc(userData.uid);
    await userRef.set(userData);

    return userData;
  }

  async findOne(uid: string): Promise<User> {
    const userDoc = await this.firestore
      .collection(this.userCollection)
      .doc(uid)
      .get();

    if (!userDoc.exists) {
      throw new NotFoundException(`User with UID ${uid} not found`);
    }

    const userData = userDoc.data() as User;
    // Firestore에서 가져온 Timestamp를 Date 객체로 변환
    userData.birth_date =
      userData.birth_date instanceof Date
        ? userData.birth_date
        : (userData.birth_date as FirebaseFirestore.Timestamp).toDate();

    return UserSchema.parse(userData);
  }

  async update(
    uid: string,
    updateUserDto: UpdateUserDto,
    requestUid: string,
  ): Promise<User> {
    const userRef = this.firestore.collection(this.userCollection).doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new NotFoundException(`User with UID ${uid} not found`);
    }

    if (uid !== requestUid) {
      throw new ForbiddenException('자신의 정보만 수정할 수 있습니다.');
    }

    const currentData = userDoc.data() as User;
    const updatedData = {
      ...currentData,
      ...updateUserDto,
    };

    // 스키마 검증
    const validatedData = UserSchema.parse(updatedData);

    await userRef.update(validatedData);
    return validatedData;
  }

  async remove(uid: string, requestUid: string): Promise<void> {
    const userRef = this.firestore.collection(this.userCollection).doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      throw new NotFoundException(`User with UID ${uid} not found`);
    }

    if (uid !== requestUid) {
      throw new ForbiddenException('자신의 정보만 삭제할 수 있습니다.');
    }

    await userRef.delete();
  }
}
