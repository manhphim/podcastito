import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { ProfileRepository } from './profile.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema } from './entities/profile.entity';

@Module({
	controllers: [ProfileController],
	providers: [ProfileService, ProfileRepository],
	imports: [
		MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
	],
})
export class ProfileModule {}
