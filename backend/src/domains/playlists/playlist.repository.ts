// playlist.repository.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Playlist } from './entities/playlist.entity';

@Injectable()
export class PlaylistRepository {
	constructor(
		@InjectModel(Playlist.name) private playlistModel: Model<Playlist>
	) {}

	async create(playlistData: Partial<Playlist>): Promise<Playlist> {
		const createdPlaylist = new this.playlistModel(playlistData);
		return createdPlaylist.save();
	}

	async findById(id: string): Promise<Playlist | null> {
		return this.playlistModel
			.findById(id)
			.populate('episodes')
			.populate('user')
			.exec();
	}

	async findAll(): Promise<Playlist[]> {
		return this.playlistModel
			.find()
			.populate('episodes')
			.populate('user')
			.exec();
	}

	async addEpisodeToPlaylist(
		playlistId: string,
		episodeId: string
	): Promise<Playlist | null> {
		const playlist = await this.playlistModel.findOneAndUpdate(
			{ _id: playlistId },
			{ $addToSet: { episodes: episodeId } },
			{ new: true }
		);

		return playlist;
	}

	async removeEpisodeFromPlaylist(
		playlistId: string,
		episodeId: string
	): Promise<Playlist | null> {
		return this.playlistModel
			.findByIdAndUpdate(
				playlistId,
				{ $pull: { episodes: episodeId } },
				{ new: true }
			)
			.populate('episodes')
			.exec();
	}
	async editPlaylist ( playlistId: string, name: string, episodes: string[] ): Promise<Playlist | null> {
		return this.playlistModel
			.findByIdAndUpdate(
				playlistId,
				{ name: name, episodes: episodes },
				{ new: true }
			)
			.populate('episodes')
			.exec();
	}
}
