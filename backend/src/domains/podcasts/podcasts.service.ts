import { PodcastsRepository } from './podcasts.repository';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PodcastsService {
	constructor(private readonly podcastsRepository: PodcastsRepository) {}

	async podcasts(
		documentsToSkip: number,
		limitOfDocuments: number
	): Promise<any> {
		// Use the podcastsRepository to call the findAll method
		return this.podcastsRepository.findAll(documentsToSkip, limitOfDocuments);
	}

	async podcastByFeedURL(feedURL: string): Promise<any> {
		// Use the podcastsRepository to call the podcastsByFeedURL method
		const result = await this.podcastsRepository.findByUrl(feedURL);

		if (!result)
			throw new NotFoundException(`Podcast with url ${feedURL} not found`);

		return result;
	}

	async podcastByFeedId(feedId: number): Promise<any> {
		// Use the podcastsRepository to call the podcastsByFeedId method
		const result = await this.podcastsRepository.findById(feedId);
		if (!result)
			throw new NotFoundException(`Podcast with id ${feedId} not found`);

		return result;
	}

	async podcastByGUID(guid: string): Promise<any> {
		// Use the podcastsRepository to call the podcastsByGUID method
		const result = await this.podcastsRepository.findByGuid(guid);
		if (!result)
			throw new NotFoundException(`Podcast with guid ${guid} not found`);

		return result;
	}

	async podcastsByCategory(
		categoryId: number,
		skip: number,
		limit: number
	): Promise<any> {
		// Use the podcastsRepository to call the podcastsByCategory method
		const result = await this.podcastsRepository.findByCategory(
			categoryId,
			skip,
			limit
		);
		if (result.total === 0)
			throw new NotFoundException(
				`There are no podcasts with category ${categoryId}`
			);
		return result;
	}

	async searchPodcasts(
		searchTerm: string,
		skip: number,
		limit: number
	): Promise<any> {
		// Use the podcastsRepository to call the searchPodcasts method
		const result = await this.podcastsRepository.search(
			searchTerm,
			skip,
			limit
		);
		if (result.total === 0)
			throw new NotFoundException(
				`There are no podcasts with search term ${searchTerm}`
			);
		return result;
	}
}
