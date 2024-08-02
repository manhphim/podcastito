import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { ProfileRepository } from './profile.repository';

describe('ProfileService', () => {
	let service: ProfileService;
	const mockProfileRepository = {};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProfileService, ProfileRepository],
		})
			.overrideProvider(ProfileRepository)
			.useValue(mockProfileRepository)
			.compile();

		service = module.get<ProfileService>(ProfileService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
