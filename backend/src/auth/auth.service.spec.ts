import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../domains/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../domains/user/user.repository';
describe('AuthService', () => {
	// let authService: AuthService;
	// let userService: UserService;
	// let jwtService: JwtService;

	let authService: AuthService;
	const mockUserService = {};
	const mockJwtService = {};
	const mockConfigService = {};
	const mockUserRepository = {};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				AuthService,
				{
					provide: UserService,
					useValue: mockUserService,
				},
				{
					provide: JwtService,
					useValue: mockJwtService,
				},
				{
					provide: ConfigService,
					useValue: mockConfigService,
				},
				{
					provide: UserRepository,
					useValue: mockUserRepository,
				},
			],
		}).compile();

		authService = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(authService).toBeDefined();
	});

	// describe('signUp', () => {
	// 	it('should create a new user', async () => {
	// 		const registerDto: RegisterDTO = {
	// 			username: 'testuser',
	// 			password: 'testpassword',
	// 			refreshToken: '',
	// 		};

	// 		const createdUser: Partial<User> = {
	// 			_id: '',
	// 			username: 'testuser',
	// 			password: 'testpassword',
	// 			refreshToken: '',
	// 			profile: '',
	// 		}; // Replace with the expected created user object

	// 		jest
	// 			.spyOn(userService, 'createUser' as keyof UserService)
	// 			.mockResolvedValue(createdUser);

	// 		const result = await authService.signUp(registerDto);

	// 		expect(result).toEqual(createdUser);
	// 	});
	// });

	// describe('signIn', () => {
	// 	it('should authenticate a user and return access token', async () => {
	// 		const loginDto: LoginDTO = {
	// 			username: 'testuser',
	// 			password: 'testpassword',
	// 		};

	// 		const authenticatedUser: any = {
	// 			accessToken: '',
	// 			refreshToken: '',
	// 		}; // Replace with the expected authenticated user object

	// 		jest
	// 			.spyOn(userService, 'authenticateUser' as keyof UserService)
	// 			.mockResolvedValue(authenticatedUser);
	// 		jest.spyOn(jwtService, 'sign').mockReturnValue('testAccessToken');

	// 		const result = await authService.signIn(loginDto);

	// 		expect(result).toEqual({
	// 			accessToken: 'testAccessToken',
	// 			user: authenticatedUser,
	// 		});
	// 	});
	// });

	// Add more test cases for other methods in AuthService
});
