import {IsString} from "class-validator";

export class CreatePlaylistDto {
    @IsString()
    name: string;

    @IsString()
    userId: string;

    @IsString()
    episodes: string[];
}
