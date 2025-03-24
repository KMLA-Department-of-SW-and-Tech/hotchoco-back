import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getFirestore } from 'firebase-admin/firestore';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// Firestore 모킹
jest.mock('firebase-admin/firestore', () => ({
  getFirestore: jest.fn(),
}));

describe('UserService', () => {
  let service: UserService;
  let mockCollection: jest.Mock;
  let mockDoc: jest.Mock;
  let mockSet: jest.Mock;
  let mockGet: jest.Mock;
  let mockUpdate: jest.Mock;
  let mockDelete: jest.Mock;

  const mockUser = {
    uid: 'test-uid',
    email: 'test@example.com',
    wave: 1,
    student_number: 12345678,
    type: 'student' as const,
    birth_date: new Date('2000-01-01'),
    name: 'Test User',
  };

  beforeEach(async () => {
    // Firestore 메서드 모킹
    mockSet = jest.fn();
    mockGet = jest.fn();
    mockUpdate = jest.fn();
    mockDelete = jest.fn();
    mockDoc = jest.fn().mockReturnValue({
      set: mockSet,
      get: mockGet,
      update: mockUpdate,
      delete: mockDelete,
    });
    mockCollection = jest.fn().mockReturnValue({
      doc: mockDoc,
    });

    (getFirestore as jest.Mock).mockReturnValue({
      collection: mockCollection,
    });

    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('create', () => {
    it('사용자를 생성하고 저장된 데이터를 반환해야 함', async () => {
      const createUserDto: CreateUserDto = {
        ...mockUser,
      };

      mockSet.mockResolvedValueOnce(undefined);

      const result = await service.create(createUserDto);

      expect(mockCollection).toHaveBeenCalledWith('users');
      expect(mockDoc).toHaveBeenCalledWith(createUserDto.uid);
      expect(mockSet).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(createUserDto);
    });
  });

  describe('findOne', () => {
    it('존재하는 사용자를 찾아서 반환해야 함', async () => {
      const mockUserData = {
        ...mockUser,
      };

      mockGet.mockResolvedValueOnce({
        exists: true,
        data: () => mockUserData,
      });

      const result = await service.findOne(mockUser.uid);

      expect(mockCollection).toHaveBeenCalledWith('users');
      expect(mockDoc).toHaveBeenCalledWith(mockUser.uid);
      expect(result).toEqual(mockUser);
    });

    it('존재하지 않는 사용자를 찾을 때 NotFoundException을 던져야 함', async () => {
      mockGet.mockResolvedValueOnce({
        exists: false,
      });

      await expect(service.findOne('non-existent-uid')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('자신의 정보를 업데이트하고 업데이트된 데이터를 반환해야 함', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };

      const mockUserData = {
        ...mockUser,
      };

      mockGet.mockResolvedValueOnce({
        exists: true,
        data: () => mockUserData,
      });

      mockUpdate.mockResolvedValueOnce(undefined);

      const result = await service.update(
        mockUser.uid,
        updateUserDto,
        mockUser.uid,
      );

      expect(mockCollection).toHaveBeenCalledWith('users');
      expect(mockDoc).toHaveBeenCalledWith(mockUser.uid);
      expect(mockUpdate).toHaveBeenCalled();
      expect(result).toEqual({
        ...mockUser,
        ...updateUserDto,
      });
    });

    it('다른 사용자의 정보를 수정하려 할 때 ForbiddenException을 던져야 함', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };

      const mockUserData = {
        ...mockUser,
      };

      mockGet.mockResolvedValueOnce({
        exists: true,
        data: () => mockUserData,
      });

      await expect(
        service.update(mockUser.uid, updateUserDto, 'other-uid'),
      ).rejects.toThrow(ForbiddenException);
    });

    it('존재하지 않는 사용자를 업데이트할 때 NotFoundException을 던져야 함', async () => {
      mockGet.mockResolvedValueOnce({
        exists: false,
      });

      await expect(
        service.update('non-existent-uid', { name: 'New Name' }, mockUser.uid),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('자신의 정보를 삭제해야 함', async () => {
      mockGet.mockResolvedValueOnce({
        exists: true,
      });

      mockDelete.mockResolvedValueOnce(undefined);

      await service.remove(mockUser.uid, mockUser.uid);

      expect(mockCollection).toHaveBeenCalledWith('users');
      expect(mockDoc).toHaveBeenCalledWith(mockUser.uid);
      expect(mockDelete).toHaveBeenCalled();
    });

    it('다른 사용자의 정보를 삭제하려 할 때 ForbiddenException을 던져야 함', async () => {
      mockGet.mockResolvedValueOnce({
        exists: true,
      });

      await expect(service.remove(mockUser.uid, 'other-uid')).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('존재하지 않는 사용자를 삭제할 때 NotFoundException을 던져야 함', async () => {
      mockGet.mockResolvedValueOnce({
        exists: false,
      });

      await expect(
        service.remove('non-existent-uid', mockUser.uid),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
