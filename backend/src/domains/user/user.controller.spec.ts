import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserController', () => {
	let userController: UserController;

	const mockUserService = {
		create: jest.fn(),
		findAll: jest.fn(),
		findById: jest.fn(),
		update: jest.fn(),
		remove: jest.fn(),
	};

	beforeAll(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserController],
			providers: [{ provide: UserService, useValue: mockUserService }],
		})
			.overrideProvider(UserService)
			.useValue(mockUserService)
			.compile();

		userController = module.get<UserController>(UserController);
	});

	it('should be defined', () => {
		expect(userController).toBeDefined();
	});

	it('should create a user and return the user', async () => {
		const mockUser = {
			id: '1',
			username: 'test',
			password: 'testpassword',
			refreshToken: 'testrefreshtoken',
			profile: '1',
		};
		const mockCreateUserDto: CreateUserDto = {
			username: 'test',
			password: 'testpassword',
			refreshToken: 'testrefreshtoken',
		};

		mockUserService.create.mockReturnValue(mockUser);

		expect(await userController.create(mockCreateUserDto)).toBe(mockUser);
	});

	it('should return an array of users', async () => {
		const mockUsers = [
			{
				id: '1',
				username: 'test',
				password: 'testpassword',
				refreshToken: 'testrefreshtoken',
				profile: '1',
			},
			{
				id: '2',
				username: 'test2',
				password: 'testpassword2',
				refreshToken: 'testrefreshtoken2',
				profile: '2',
			},
		];

		mockUserService.findAll.mockReturnValue([mockUsers]);

		expect(await userController.findAll()).toEqual([mockUsers]);
	});

	it('find user by id should return a user', async () => {
		const mockUser = {
			id: '1',
			username: 'test',
			password: 'testpassword',
			refreshToken: 'testrefreshtoken',
			profile: '1',
		};

		mockUserService.findById.mockReturnValue(mockUser);

		expect(await userController.findById('1')).toBe(mockUser);
	});
});
