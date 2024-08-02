import { Test, TestingModule } from '@nestjs/testing';
import { PodcastsController } from './podcasts.controller';
import { PodcastsService } from './podcasts.service';
import { PaginationParams } from 'src/utils/paginationParams';
describe('PodcastsController', () => {
	let controller: PodcastsController;

	const mockPodcastsService = {
		podcasts: jest.fn(),
		podcastByFeedURL: jest.fn(),
		podcastByFeedId: jest.fn(),
		podcastByGUID: jest.fn(),
		podcastsByCategory: jest.fn(),
		searchPodcasts: jest.fn(),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PodcastsController],
			providers: [PodcastsService],
		})
			.overrideProvider(PodcastsService)
			.useValue(mockPodcastsService)
			.compile();

		controller = module.get<PodcastsController>(PodcastsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('podcasts', () => {
		it('should return an array of podcasts', async () => {
			const paginationParams: PaginationParams = {
				offset: 0,
				limit: 10,
			};
			const podcasts = await controller.podcasts(paginationParams);
			expect(podcasts).toEqual(mockPodcastsService.podcasts());
		});
	});

	describe('podcastByFeedURL', () => {
		it('should return a podcast', async () => {
			const feedURL = 'https://feedurl.com';
			const podcast = await controller.podcastsByFeedURL(feedURL);
			expect(podcast).toEqual(mockPodcastsService.podcastByFeedURL(feedURL));
		});
	});

	describe('podcastByFeedId', () => {
		it('should return a podcast', async () => {
			const feedId = 1;
			const podcast = await controller.podcastsByFeedId(feedId);
			expect(podcast).toEqual(mockPodcastsService.podcastByFeedId(feedId));
		});
	});

	describe('podcastByGUID', () => {
		it('should return a podcast', async () => {
			const guid = '123';
			const podcast = await controller.podcastsByGUID(guid);
			expect(podcast).toEqual(mockPodcastsService.podcastByGUID(guid));
		});
	});

	describe('podcastsByCategory', () => {
		it('should return an array of podcasts', async () => {
			const categoryId = 1;
			const paginationParams: PaginationParams = {
				offset: 0,
				limit: 10,
			};
			const podcasts = await controller.podcastsByCategory(
				categoryId,
				paginationParams
			);
			expect(podcasts).toEqual(
				mockPodcastsService.podcastsByCategory(categoryId)
			);
		});
	});

	describe('searchPodcasts', () => {
		it('should return an array of podcasts', async () => {
			const query = 'test';
			const paginationParams: PaginationParams = {
				offset: 0,
				limit: 10,
			};
			const podcasts = await controller.searchPodcasts(query, paginationParams);
			expect(podcasts).toEqual(mockPodcastsService.searchPodcasts(query));
		});
	});
});
