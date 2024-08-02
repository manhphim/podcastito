import { Module } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { PodcastsController } from './podcasts.controller';
import { PodcastsRepository } from './podcasts.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Podcast, PodcastSchema } from './entities/podcast.entity';

@Module({
	controllers: [PodcastsController],
	providers: [PodcastsService, PodcastsRepository],
	imports: [
		MongooseModule.forFeature([{ name: Podcast.name, schema: PodcastSchema }]),
	],
})
export class PodcastsModule {}
