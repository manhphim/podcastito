import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserPreferences } from '../../schemas/user.preferences.schema';

@Injectable()
export class UserPreferencesService {
	constructor(
		@InjectModel('UserPreferences')
		private readonly userPreferencesModel: Model<UserPreferences>
	) {}

	async createUserPreferences(
		preferences: UserPreferences
	): Promise<UserPreferences> {
		const createdUserPreferences = new this.userPreferencesModel(preferences);
		return await createdUserPreferences.save();
	}

	async findByUserId(userId: string): Promise<UserPreferences> {
		const userPreferences = await this.userPreferencesModel
			.findOne({ userId })
			.exec();
		if (!userPreferences) {
			throw new NotFoundException(
				`UserPreferences with userId ${userId} not found`
			);
		}
		return userPreferences;
	}
}
