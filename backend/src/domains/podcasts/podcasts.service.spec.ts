import { Test, TestingModule } from '@nestjs/testing';
import { PodcastsService } from './podcasts.service';
import { PodcastsRepository } from './podcasts.repository';

describe('PodcastsService', () => {
	let service: PodcastsService;
	const mockPodcastsRepository = {};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PodcastsService, PodcastsRepository],
		})
			.overrideProvider(PodcastsRepository)
			.useValue(mockPodcastsRepository)
			.compile();

		service = module.get<PodcastsService>(PodcastsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
