/* eslint-disable @typescript-eslint/no-unused-vars */

import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { PaginationParams } from '../../utils/paginationParams';

describe('EpisodesController', () => {
	let controller: EpisodesController;

	const mockEpisodesService = {
		episodesByFeedId: jest.fn(
			(feedId: number, { offset, limit }: PaginationParams) => {
				if (feedId === 0) return [];
				return [
					{ id: 1, name: 'Test Episode' },
					{ id: 2, name: 'Test Episode 2' },
				];
			}
		),
		episodesById: jest.fn((id: number) => {
			if (id === 0) return [];
			return [
				{ id: 1, name: 'Test Episode' },
				{ id: 2, name: 'Test Episode 2' },
			];
		}),
		searchEpisodes: jest.fn(
			(query: string, { offset, limit }: PaginationParams) => {
				if (query === 'invalid' || query === '') return [];
				return [
					{ id: 1, name: 'Test Episode' },
					{ id: 2, name: 'Test Episode 2' },
				];
			}
		),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [EpisodesController],
			providers: [EpisodesService],
		})
			.overrideProvider(EpisodesService)
			.useValue(mockEpisodesService)
			.compile();

		controller = module.get<EpisodesController>(EpisodesController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should find episodes by feed id', async () => {
		const episodes = await controller.episodesByFeedId(1, {
			offset: 0,
			limit: 10,
		});
		expect(episodes).toEqual([
			{ id: 1, name: 'Test Episode' },
			{ id: 2, name: 'Test Episode 2' },
		]);
	});

	it('should find episodes by id', async () => {
		const episodes = await controller.episodesById(1);
		expect(episodes).toEqual([
			{ id: 1, name: 'Test Episode' },
			{ id: 2, name: 'Test Episode 2' },
		]);
	});

	it('should search episodes', async () => {
		const episodes = await controller.searchEpisodes('test', {
			offset: 0,
			limit: 10,
		});
		expect(episodes).toEqual([
			{ id: 1, name: 'Test Episode' },
			{ id: 2, name: 'Test Episode 2' },
		]);
	});

	it('should return error if no episode is found by feedId or feedId invalid', async () => {
		const episodes = await controller.episodesByFeedId(0, {
			offset: 0,
			limit: 10,
		});
		expect(episodes).toEqual([]);
	});

	it('should return error if no episode is found by id or id invalid', async () => {
		const episodes = await controller.episodesById(0);
		expect(episodes).toEqual([]);
	});

	it('should return error if no episode is found by query', async () => {
		const episodes = await controller.searchEpisodes('', {
			offset: 0,
			limit: 10,
		});
		expect(episodes).toEqual([]);
	});

	// Add more tests for other methods in the same way
});
