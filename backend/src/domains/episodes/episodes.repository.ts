import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Episode } from './entities/episode.entity';

export interface EpisodeResult {
	results: Episode[];
	count: number;
	total: number;
}
@Injectable()
export class EpisodeRepository {
	constructor(
		@InjectModel(Episode.name) private episodeModel: Model<Episode>
	) {}

	async findEpisodeById(id: number): Promise<Episode | null> {
		return this.episodeModel.findOne({ id }).exec();
	}

	async findEpisodesByFeedId(
		feedId: number,
		documentsToSkip = 0,
		limitOfDocuments?: number,
		startId?: string
	): Promise<EpisodeResult> {
		const episodes = this.episodeModel
			.find({ feedId, ...(startId && { _id: { $gt: startId } }) })
			.sort({ _id: 1 })
			.skip(documentsToSkip);

		if (limitOfDocuments) {
			episodes.limit(limitOfDocuments);
		}

		const results = await episodes;
		const count = await results.length;
		const total = await this.episodeModel.find({ feedId }).countDocuments();

		return { results, count, total };
	}

	async searchEpisodes(
		keyword: string,
		skip: number,
		limit: number
	): Promise<EpisodeResult> {
		const query = this.episodeModel
			.find({ $text: { $search: keyword } }, { score: { $meta: 'textScore' } })
			.sort({ score: { $meta: 'textScore' } })
			.skip(skip)
			.limit(limit);

		const results = await query.exec();
		const count = results.length;
		const total = await this.episodeModel.countDocuments({
			$text: { $search: keyword },
		});

		return { results, count, total };
	}

	// Add more repository methods as needed for your application
}
