// episodes.service.ts
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { EpisodeRepository } from './episodes.repository';

@Injectable()
export class EpisodesService {
	constructor(private readonly episodeRepository: EpisodeRepository) {}

	async episodesByFeedId(feedId: number, skip: number, limit: number) {
		if (isNaN(feedId)) {
			throw new BadRequestException(`feedId ${feedId} is not valid`);
		}
		const result = await this.episodeRepository.findEpisodesByFeedId(
			feedId,
			skip,
			limit
		);
		if (result.results.length === 0) {
			throw new NotFoundException(
				`Cannot find any episodes for feedId ${feedId}`
			);
		}
		return result;
	}
	async episodesById(id: number) {
		return this.episodeRepository.findEpisodeById(id);
	}
	async searchEpisodes(query: string, skip: number, limit: number) {
		const result = await this.episodeRepository.searchEpisodes(
			query,
			skip,
			limit
		);

		console.log(result);

		return result;
	}
}
