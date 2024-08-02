// profile.controller.ts

import {
	Controller,
	UseGuards,
	Get,
	Post,
	Patch,
	Delete,
	Body,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import {
	UpdatePreferencesDto,
	UpdateBasicInfoDto,
	AddFavoriteDto,
	AddToPlaylistDto,
} from './dto/profile.dto';
import { AccessTokenGuard } from '../../guards/accessToken.guard';

@Controller('profile')
@UseGuards(AccessTokenGuard)
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}

	// GET
	@Get('favorites')
	getFavorites() {
		return 'Getting favorites';
	}

	@Get('playlists')
	getPlaylists() {
		return 'Getting playlists';
	}

	@Get()
	getProfile() {
		return 'Getting profile';
	}

	// POST
	@Post('favorites')
	addFavorite(@Body() addFavoriteDto: AddFavoriteDto) {
		return `Adding a favorite: ${JSON.stringify(addFavoriteDto)}`;
	}

	@Post('playlists')
	addToPlaylist(@Body() addToPlaylistDto: AddToPlaylistDto) {
		return `Adding to a playlist: ${JSON.stringify(addToPlaylistDto)}`;
	}

	// PATCH
	@Patch('preferences')
	updatePreferences(@Body() updatePreferencesDto: UpdatePreferencesDto) {
		return `Updating preferences: ${JSON.stringify(updatePreferencesDto)}`;
	}

	@Patch('basic-info')
	updateBasicInfo(@Body() updateBasicInfoDto: UpdateBasicInfoDto) {
		return `Updating basic information: ${JSON.stringify(updateBasicInfoDto)}`;
	}

	@Patch()
	updateProfile() {
		return 'Updating profile';
	}

	// DELETE
	@Delete('favorites')
	deleteFavorite() {
		return 'Deleting a favorite';
	}

	@Delete('playlists')
	deletePlaylist() {
		return 'Deleting a playlist';
	}
}
