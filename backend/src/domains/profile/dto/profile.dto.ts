// profile.dto.ts
import { Episode } from 'src/domains/episodes/entities/episode.entity';

export class CreateProfileDto {
	id: string;
	name: string;
	preferences: string[];
	favorites: any[];
	playlists: Episode[];
}

export class UpdatePreferencesDto {
	// Define properties for updating preferences
}

export class UpdateBasicInfoDto {
	// Define properties for updating basic information
}

export class AddFavoriteDto {
	// Define properties for adding a favorite
}

export class AddToPlaylistDto {
	// Define properties for adding to a playlist
}
