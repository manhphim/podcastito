import { Module } from '@nestjs/common';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { EpisodeRepository } from './episodes.repository';
import { Episode, EpisodeSchema } from './entities/episode.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	controllers: [EpisodesController],
	providers: [EpisodesService, EpisodeRepository],
	imports: [
		MongooseModule.forFeature([{ name: Episode.name, schema: EpisodeSchema }]),
	],
})
export class EpisodesModule {}
