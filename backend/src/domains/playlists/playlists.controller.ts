import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';

@Controller('playlists')
export class PlaylistsController {
	constructor(private readonly playlistsService: PlaylistsService) {}

	@Post()
	async createPlaylist(
		@Body('name') name: string,
		@Body('userId') userId: string
	) {
		console.log('creating playlist');
		return this.playlistsService.createPlaylist(name, userId);
	}

	@Get(':id')
	async getPlaylistById(@Param('id') id: string) {
		return this.playlistsService.getPlaylistById(id);
	}

	@Get()
	async getAllPlaylists() {
		console.log('getting all playlists');
		return this.playlistsService.getAllPlaylists();
	}

	@Post(':playlistId/add-episodes')
	async addEpisodeToPlaylist(
		@Param('playlistId') playlistId: string,
		@Body('episodeId') episodeId: string
	) {
		return this.playlistsService.addEpisodeToPlaylist(playlistId, episodeId);
	}

	@Post('edit/:playlistId')
	async editPlaylist(
		@Param('playlistId') playlistId: string,
		@Body('name') name: string,
		@Body('episodes') episodes: string[]
	) {

		return this.playlistsService.editPlaylist(playlistId, name, episodes);
	}
}
