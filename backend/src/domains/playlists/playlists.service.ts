import { Injectable } from '@nestjs/common';
import { PlaylistRepository } from './playlist.repository';
import { Playlist } from './entities/playlist.entity';

@Injectable()
export class PlaylistsService {
	constructor(private readonly playlistRepository: PlaylistRepository) {}

	async createPlaylist(name: string, userId: string): Promise<Playlist> {
		const playlistData = { name, episodes: [], user: userId };
		return this.playlistRepository.create(playlistData);
	}

	async getPlaylistById(id: string): Promise<Playlist | null> {
		return this.playlistRepository.findById(id);
	}

	async getAllPlaylists(): Promise<Playlist[]> {
		return this.playlistRepository.findAll();
	}

	async addEpisodeToPlaylist(
		playlistId: string,
		episodeId: string
	): Promise<Playlist | null> {
		return this.playlistRepository.addEpisodeToPlaylist(playlistId, episodeId);
	}

	async removeEpisodeFromPlaylist(
		playlistId: string,
		episodeId: string
	): Promise<Playlist | null> {
		return this.playlistRepository.removeEpisodeFromPlaylist(
			playlistId,
			episodeId
		);
	}

	async editPlaylist ( playlistId: string, name: string, episodes: string[] ): Promise<Playlist | null> {
		return this.playlistRepository.editPlaylist( playlistId, name, episodes );

	}


}
