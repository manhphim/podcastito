// episodes.controller.ts
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { EpisodesService } from './episodes.service';
import { PaginationParams } from '../../utils/paginationParams';
import { AccessTokenGuard } from '../../guards/accessToken.guard';

@Controller('episodes')
@UseGuards(AccessTokenGuard)
export class EpisodesController {
	constructor(private readonly episodesService: EpisodesService) {}

	@Get('byFeedId/:feedId')
	async episodesByFeedId(
		@Param('feedId') feedId: number,
		@Query() { offset = 0, limit = 10 }: PaginationParams
	) {
		return this.episodesService.episodesByFeedId(feedId, offset, limit);
	}

	@Get('byId/:id')
	async episodesById(@Param('id') id: number) {
		return this.episodesService.episodesById(id);
	}

	@Get('bySearch')
	async searchEpisodes(
		@Query('query') query: string,
		@Query() { offset = 0, limit = 10 }: PaginationParams
	) {
		return this.episodesService.searchEpisodes(query, offset, limit);
	}
}
