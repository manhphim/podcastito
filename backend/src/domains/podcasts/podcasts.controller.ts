// podcasts.controller.ts
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { PaginationParams } from '../../utils/paginationParams';
import { AccessTokenGuard } from '../../guards/accessToken.guard';

@Controller('podcasts')
@UseGuards(AccessTokenGuard)
export class PodcastsController {
	constructor(private readonly podcastsService: PodcastsService) {}

	@Get()
	async podcasts(@Query() { offset = 0, limit = 10 }: PaginationParams) {
		return this.podcastsService.podcasts(offset, limit);
	}

	@Get('byFeedURL/:feedURL')
	async podcastsByFeedURL(@Param('feedURL') feedURL: string) {
		return this.podcastsService.podcastByFeedURL(feedURL);
	}

	@Get('byFeedId/:feedId')
	async podcastsByFeedId(@Param('feedId') feedId: number) {
		return this.podcastsService.podcastByFeedId(feedId);
	}

	@Get('byGUID/:guid')
	async podcastsByGUID(@Param('guid') guid: string) {
		return this.podcastsService.podcastByGUID(guid);
	}

	// get podcast by category
	@Get('byCategory/:category')
	async podcastsByCategory(
		@Param('category') categoryId: number,
		@Query() { offset = 0, limit = 10 }: PaginationParams
	) {
		return this.podcastsService.podcastsByCategory(categoryId, offset, limit);
	}

	@Get('bySearch')
	async searchPodcasts(
		@Query('query') query: string,
		@Query() { offset = 0, limit = 10 }: PaginationParams
	) {
		return this.podcastsService.searchPodcasts(query, offset, limit);
	}
}
