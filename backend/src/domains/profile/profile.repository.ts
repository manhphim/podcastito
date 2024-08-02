import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from './entities/profile.entity';

@Injectable()
export class ProfileRepository {
	constructor(
		@InjectModel(Profile.name) private profileModel: Model<ProfileDocument>
	) {}

	async createProfile(
		userId: string,
		fullName: string,
		preferences: any,
		favoriteContent: any
	): Promise<ProfileDocument> {
		const profile = new this.profileModel({
			user: userId,
			fullName,
			preferences,
			favoriteContent,
		});

		return profile.save();
	}

	async getProfileByUserId(userId: string): Promise<ProfileDocument> {
		return this.profileModel.findOne({ user: userId }).exec();
	}

	async updateProfileFullName(
		userId: string,
		fullName: string
	): Promise<ProfileDocument> {
		return this.updateProfileProperty(userId, { fullName });
	}

	async updateProfilePreferences(
		userId: string,
		preferences: any
	): Promise<ProfileDocument> {
		return this.updateProfileProperty(userId, { preferences });
	}

	async updateProfileFavoriteContent(
		userId: string,
		favoriteContent: any
	): Promise<ProfileDocument> {
		return this.updateProfileProperty(userId, { favoriteContent });
	}

	private async updateProfileProperty(
		userId: string,
		propertyToUpdate: Record<string, any>
	): Promise<ProfileDocument> {
		const profile = await this.profileModel.findOne({ user: userId }).exec();
		if (!profile) {
			// Handle the case where the profile doesn't exist for the user
			throw new NotFoundException('Profile not found');
		}

		Object.assign(profile, propertyToUpdate);

		return profile.save();
	}

	async deleteProfile(userId: string): Promise<ProfileDocument> {
		const profile = await this.profileModel
			.findOneAndRemove({ user: userId })
			.exec();
		if (!profile) {
			// Handle the case where the profile doesn't exist for the user
			throw new NotFoundException('Profile not found');
		}

		return profile;
	}

	// You can add more repository methods if needed, based on your data access requirements.
}
