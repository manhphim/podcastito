import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Podcast } from './entities/podcast.entity';

interface PodcastResult {
	results: Podcast[];
	count: number;
	total: number;
	page: number;
}
@Injectable()
export class PodcastsRepository {
	constructor(
		@InjectModel(Podcast.name) private podcastModel: Model<Podcast>
	) {}

	async findById(id: number): Promise<Podcast | null> {
		return this.podcastModel.findOne({ id }).exec();
	}

	async findAll(
		documentsToSkip = 0,
		limitOfDocuments?: number,
		startId?: string
	): Promise<PodcastResult> {
		const query = this.podcastModel
			.find({
				...(startId && { _id: { $gt: startId } }),
			})
			.sort({ _id: 1 })
			.skip(documentsToSkip);
		if (limitOfDocuments) {
			query.limit(limitOfDocuments);
		}

		const results = await query;
		const count = await results.length;
		const total = await this.podcastModel.countDocuments();
		const page = Math.floor(documentsToSkip / limitOfDocuments) + 1;

		return { results, count, total, page };
	}

	async findByUrl(url: string): Promise<Podcast | null> {
		return this.podcastModel.findOne({ url }).exec();
	}

	async findByGuid(guid: string): Promise<Podcast> {
		return this.podcastModel.findOne({ podcastGuid: guid }).exec();
	}

	async findByCategory(
		categoryId: number,
		documentsToSkip = 0,
		limitOfDocuments?: number,
		startId?: string
	): Promise<PodcastResult> {
		const query = this.podcastModel
			.find({
				[`categories.${categoryId}`]: { $exists: true },
				...(startId && { _id: { $gt: startId } }),
			})
			.sort({ _id: 1 })
			.skip(documentsToSkip);
		if (limitOfDocuments) {
			query.limit(limitOfDocuments);
		}

		const results = await query;
		const count = await results.length;
		const total = await this.podcastModel
			.find({ [`categories.${categoryId}`]: { $exists: true } })
			.countDocuments();
		const page = Math.floor(documentsToSkip / limitOfDocuments) + 1;

		return { results, count, total, page };
	}

	async search(
		searchKeyword: string,
		documentsToSkip = 0,
		limitOfDocuments?: number
	): Promise<PodcastResult> {
		const query = this.podcastModel
			.find({
				$text: { $search: searchKeyword },
				score: { $meta: 'textScore' },
			})
			.sort({ score: { $meta: 'textScore' } })
			.skip(documentsToSkip);
		if (limitOfDocuments) {
			query.limit(limitOfDocuments);
		}

		const results = await query;
		const count = await results.length;
		const total = await this.podcastModel.countDocuments();
		const page = Math.floor(documentsToSkip / limitOfDocuments) + 1;

		return { results, count, total, page };
	}
}
