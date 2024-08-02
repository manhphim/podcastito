import { Test, TestingModule } from '@nestjs/testing';
import { UserPreferencesController } from './user-preferences.controller';
import { UserPreferencesService } from './user-preferences.service';

describe('UserPreferencesController', () => {
	let controller: UserPreferencesController;
	const mockUserPreferencesService = {};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserPreferencesController],
			providers: [UserPreferencesService],
		})
			.overrideProvider(UserPreferencesService)
			.useValue(mockUserPreferencesService)
			.compile();

		controller = module.get<UserPreferencesController>(
			UserPreferencesController
		);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
