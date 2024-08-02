import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserPreferencesService } from './user-preferences.service';
import { UserPreferences } from '../../schemas/user.preferences.schema';

@Controller('user-preferences')
export class UserPreferencesController {
	constructor(
		private readonly userPreferencesService: UserPreferencesService
	) {}

	@Post('recommendations')
	async create(
		@Body() createUserPreferencesDto: UserPreferences
	): Promise<UserPreferences> {
		return this.userPreferencesService.createUserPreferences(
			createUserPreferencesDto
		);
	}

	@Get(':userId')
	async findByUserId(
		@Param('userId') userId: string
	): Promise<UserPreferences | undefined> {
		return this.userPreferencesService.findByUserId(userId);
	}
}
