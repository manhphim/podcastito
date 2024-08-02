import { Test, TestingModule } from '@nestjs/testing';
import { UserPreferencesService } from './user-preferences.service';

describe('UserPreferencesService', () => {
	let service: UserPreferencesService;
	const mockUserPreferencesModel = {};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserPreferencesService,
				{
					provide: 'UserPreferencesModel',
					useValue: mockUserPreferencesModel,
				},
			],
		}).compile();

		service = module.get<UserPreferencesService>(UserPreferencesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
