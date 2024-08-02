import { Module } from '@nestjs/common';
import { UserPreferencesService } from './user-preferences.service';
import { UserPreferencesController } from './user-preferences.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPreferencesSchema } from '../../schemas/user.preferences.schema';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'UserPreferences', schema: UserPreferencesSchema },
		]),
	],
	controllers: [UserPreferencesController],
	providers: [UserPreferencesService],
})
export class UserPreferencesModule {}
