import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { mockDecodedIdToken } from '../../test/mocks/mock-decode-id-token';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUser = {
    uid: 'test-uid',
    email: 'test@example.com',
    wave: 1,
    student_number: 20240309,
    type: 'student' as 'student' | 'foreigner' | 'graduate',
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
    it('should update a user', () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated Name',
      };
      const updatedUser = { ...mockUser, ...updateUserDto };

      mockUserService.update.mockReturnValue(updatedUser);

      expect(controller.update(mockDecodedIdToken, updateUserDto)).toEqual(
        updatedUser,
      );
      expect(service.update).toHaveBeenCalledWith(
        mockDecodedIdToken.uid,
        updateUserDto,
      );
    });

    // it('should throw NotFoundException when user is not found', () => {
    //   const updateUserDto: UpdateUserDto = {
    //     name: 'Updated Name',
    //   };

    //   mockUserService.update.mockImplementation(() => {
    //     throw new NotFoundException();
    //   });

    //   expect(() =>
    //     controller.update('non-existent-uid', updateUserDto),
    //   ).toThrow(NotFoundException);
    // });
  });

  describe('remove', () => {
    it('should remove a user', () => {
      mockUserService.remove.mockReturnValue(undefined);

      expect(controller.remove(mockDecodedIdToken)).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(mockDecodedIdToken.uid);
    });

    // it('should throw NotFoundException when user is not found', () => {
    //   mockUserService.remove.mockImplementation(() => {
    //     throw new NotFoundException();
    //   });

    //   expect(() => controller.remove('non-existent-uid')).toThrow(
    //     NotFoundException,
    //   );
    // });
  });
});
