import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesService } from './episodes.service';
import { EpisodeRepository } from './episodes.repository';

describe('EpisodesService', () => {
	let service: EpisodesService;

	const mockEpisodesRepository = {};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [EpisodesService, EpisodeRepository],
		})
			.overrideProvider(EpisodeRepository)
			.useValue(mockEpisodesRepository)
			.compile();

		service = module.get<EpisodesService>(EpisodesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
