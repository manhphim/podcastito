import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PodcastsModule } from './domains/podcasts/podcasts.module';
import { EpisodesModule } from './domains/episodes/episodes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './domains/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PlaylistsModule } from './domains/playlists/playlists.module';
import { CategoriesModule } from './domains/categories/categories.module';
import { ProfileModule } from './domains/profile/profile.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
	imports: [
		LoggerModule.forRoot({
			pinoHttp: {
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				customProps: (req, res) => ({
					context: 'HTTP',
				}),
				transport:
					process.env.NODE_ENV !== 'production'
						? {
								target: 'pino-pretty',
								options: {
									singleLine: true,
								},
						  }
						: undefined,
			},
		}),
		PodcastsModule,
		EpisodesModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MongooseModule.forRootAsync({
			useFactory: () => ({
				uri: process.env.DB_URI,
				dbName: process.env.DB_NAME,
			}),
		}),
		UserModule,
		PlaylistsModule,
		CategoriesModule,
		ProfileModule,
		AuthModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	constructor() {}
}
