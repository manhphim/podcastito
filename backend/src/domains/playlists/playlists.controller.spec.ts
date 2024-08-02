/* eslint-disable @typescript-eslint/no-unused-vars */

import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistsController } from './playlists.controller';
import { PlaylistsService } from './playlists.service';

describe('PlaylistsController', () => {
	let controller: PlaylistsController;

	const mockPlaylistsService = {
		getAllPlaylists: jest.fn(() => {
			return [
				{ id: 1, name: 'Test Playlist', episodes: [], userId: 1 },
				{ id: 2, name: 'Test Playlist 2', episodes: [], userId: 1 },
			];
		}),
		getPlaylistById: jest.fn((id: string) => {
			if (!Number(id) || Number(id) === 0) return {};
			return { id: 1, name: 'Test Playlist', episodes: [], userId: 1 };
		}),
		createPlaylist: jest.fn((name: string, userId: string) => {
			return { id: 1, name: 'Test Playlist', episodes: [], userId: 1 };
		}),
		addEpisodeToPlaylist: jest.fn((playlistId: number, episodeId: number) => {
			return {
				id: 1,
				name: 'Test Playlist',
				episodes: [
					{
						id: 1,
						name: 'Test Episode',
					},
				],
				userId: 1,
			};
		}),
		editPlaylist: jest.fn(
			(playlistId: number, name: string, episodes: string[]) => {
				return {
					id: 1,
					name: 'Test Playlist Edited',
					episodes: [
						{
							id: 1,
							name: 'Test Episode',
						},
					],
					userId: 1,
				};
			}
		),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PlaylistsController],
			providers: [PlaylistsService],
		})
			.overrideProvider(PlaylistsService)
			.useValue(mockPlaylistsService)
			.compile();

		controller = module.get<PlaylistsController>(PlaylistsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should create playlist', async () => {
		const playlist = await controller.createPlaylist('Test Playlist', '1');
		expect(playlist).toEqual({
			id: 1,
			name: 'Test Playlist',
			episodes: [],
			userId: 1,
		});
	});

	it('should find playlist by id', async () => {
		const playlist = await controller.getPlaylistById('1');
		expect(playlist).toEqual({
			id: 1,
			name: 'Test Playlist',
			episodes: [],
			userId: 1,
		});
	});

	it('should return error if no playlist is found by id or id invalid', async () => {
		const playlist = await controller.getPlaylistById('0');
		expect(playlist).toEqual({});
	});

	it('should return all playlists', async () => {
		const playlists = await controller.getAllPlaylists();
		expect(playlists).toEqual([
			{ id: 1, name: 'Test Playlist', episodes: [], userId: 1 },
			{ id: 2, name: 'Test Playlist 2', episodes: [], userId: 1 },
		]);
	});

	it('should add episode to playlist', async () => {
		const playlist = await controller.addEpisodeToPlaylist('1', '1');
		expect(playlist).toEqual({
			id: 1,
			name: 'Test Playlist',
			episodes: [
				{
					id: 1,
					name: 'Test Episode',
				},
			],
			userId: 1,
		});
	});

	it('should edit playlist', async () => {
		const playlist = await controller.editPlaylist(
			'1',
			'Test Playlist Edited',
			['1']
		);
		expect(playlist).toEqual({
			id: 1,
			name: 'Test Playlist Edited',
			episodes: [
				{
					id: 1,
					name: 'Test Episode',
				},
			],
			userId: 1,
		});
	});

	// Add more tests for other methods in the same way
});
