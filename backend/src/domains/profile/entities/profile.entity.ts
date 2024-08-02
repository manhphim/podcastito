// profile.entity.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Base } from '../../../schemas/base.schema';

@Schema()
export class Profile extends Base {
	@Prop({ type: Types.ObjectId, required: true, ref: 'User' })
	user: string;

	@Prop()
	fullName: string;

	@Prop()
	preferences: string[]; // Define your preference structure

	@Prop()
	favorites: string[]; // Store favorite content IDs

	@Prop()
	playlists: string[]; // Store playlist IDs

	// Add any other properties as needed
}

export type ProfileDocument = Profile & Document;

export const ProfileSchema = SchemaFactory.createForClass(Profile);
