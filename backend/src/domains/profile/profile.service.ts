import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
	constructor(private readonly profileRepository: ProfileRepository) {}

	async createProfile(
		userId: string,
		fullName: string,
		preferences: any,
		favoriteContent: any
	): Promise<Profile> {
		return this.profileRepository.createProfile(
			userId,
			fullName,
			preferences,
			favoriteContent
		);
	}

	async getProfileByUserId(userId: string): Promise<Profile> {
		const profile = await this.profileRepository.getProfileByUserId(userId);
		if (!profile) {
			throw new NotFoundException('Profile not found');
		}
		return profile;
	}

	async updateProfileFullName(
		userId: string,
		fullName: string
	): Promise<Profile> {
		return this.profileRepository.updateProfileFullName(userId, fullName);
	}

	async updateProfilePreferences(
		userId: string,
		preferences: any
	): Promise<Profile> {
		return this.profileRepository.updateProfilePreferences(userId, preferences);
	}

	async updateProfileFavoriteContent(
		userId: string,
		favoriteContent: any
	): Promise<Profile> {
		return this.profileRepository.updateProfileFavoriteContent(
			userId,
			favoriteContent
		);
	}

	async deleteProfile(userId: string): Promise<Profile> {
		return this.profileRepository.deleteProfile(userId);
	}

	// You can add more service methods if needed, based on your business logic.
}
