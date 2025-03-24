import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { Request } from 'express';
import { DecodedIdToken } from 'firebase-admin/auth';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockRequest = {
    user: {
      uid: 'test-uid',
    },
  } as Request & { user: DecodedIdToken };

  const mockUser: User = {
    uid: 'test-uid',
    email: 'test@example.com',
    wave: 1,
    student_number: 20240309,
    type: 'student',
    birth_date: new Date('2000-01-01'),
    name: 'Test User',
  };

  const mockUserService = {
    create: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new user', () => {
      const createUserDto: CreateUserDto = {
        uid: mockUser.uid,
        email: mockUser.email,
        wave: mockUser.wave,
        student_number: mockUser.student_number,
        type: mockUser.type,
        birth_date: mockUser.birth_date,
        name: mockUser.name,
      };

      mockUserService.create.mockReturnValue(mockUser);

      expect(controller.create(createUserDto)).toEqual(mockUser);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('findOne', () => {
    it('should return a user', () => {
      mockUserService.findOne.mockReturnValue(mockUser);

      expect(controller.findOne(mockUser.uid)).toEqual(mockUser);
      expect(service.findOne).toHaveBeenCalledWith(mockUser.uid);
    });

    it('should throw NotFoundException when user is not found', () => {
      mockUserService.findOne.mockImplementation(() => {
        throw new NotFoundException();
      });

      expect(() => controller.findOne('non-existent-uid')).toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('자신의 정보를 업데이트할 수 있어야 함', () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };
      const updatedUser = { ...mockUser, ...updateUserDto };

      mockUserService.update.mockReturnValue(updatedUser);

      expect(
        controller.update(mockRequest, mockUser.uid, updateUserDto),
      ).toEqual(updatedUser);
      expect(service.update).toHaveBeenCalledWith(
        mockUser.uid,
        updateUserDto,
        mockUser.uid,
      );
    });

    it('다른 사용자의 정보를 수정하려 할 때 ForbiddenException을 던져야 함', () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };

      mockUserService.update.mockImplementation(() => {
        throw new ForbiddenException('자신의 정보만 수정할 수 있습니다.');
      });

      expect(() =>
        controller.update(mockRequest, 'other-uid', updateUserDto),
      ).toThrow(ForbiddenException);
    });

    it('존재하지 않는 사용자를 수정할 때 NotFoundException을 던져야 함', () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };

      mockUserService.update.mockImplementation(() => {
        throw new NotFoundException();
      });

      expect(() =>
        controller.update(mockRequest, 'non-existent-uid', updateUserDto),
      ).toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('자신의 정보를 삭제할 수 있어야 함', () => {
      mockUserService.remove.mockReturnValue(undefined);

      expect(controller.remove(mockRequest, mockUser.uid)).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(mockUser.uid, mockUser.uid);
    });

    it('다른 사용자의 정보를 삭제하려 할 때 ForbiddenException을 던져야 함', () => {
      mockUserService.remove.mockImplementation(() => {
        throw new ForbiddenException('자신의 정보만 삭제할 수 있습니다.');
      });

      expect(() => controller.remove(mockRequest, 'other-uid')).toThrow(
        ForbiddenException,
      );
    });

    it('존재하지 않는 사용자를 삭제할 때 NotFoundException을 던져야 함', () => {
      mockUserService.remove.mockImplementation(() => {
        throw new NotFoundException();
      });

      expect(() => controller.remove(mockRequest, 'non-existent-uid')).toThrow(
        NotFoundException,
      );
    });
  });
});
