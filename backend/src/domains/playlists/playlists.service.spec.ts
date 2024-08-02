import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistsService } from './playlists.service';
import { PlaylistRepository } from './playlist.repository';

describe('PlaylistsService', () => {
	let service: PlaylistsService;
	const mockPlaylistsRepository = {};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PlaylistsService, PlaylistRepository],
		})
			.overrideProvider(PlaylistRepository)
			.useValue(mockPlaylistsRepository)
			.compile();

		service = module.get<PlaylistsService>(PlaylistsService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
