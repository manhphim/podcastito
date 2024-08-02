// playlists.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Playlist, PlaylistSchema } from './entities/playlist.entity';
import { PlaylistRepository } from './playlist.repository';
import { PlaylistsService } from './playlists.service';
import { PlaylistsController } from './playlists.controller';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: Playlist.name, schema: PlaylistSchema },
		]),
	],
	providers: [PlaylistRepository, PlaylistsService],
	controllers: [PlaylistsController],
	exports: [PlaylistsService],
})
export class PlaylistsModule {}
