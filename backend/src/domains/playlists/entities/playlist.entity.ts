import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base } from '../../../schemas/base.schema';
@Schema()
export class Playlist extends Base {
	@Prop({ required: true })
	name: string;

	@Prop({
		type: [{ type: Types.ObjectId, ref: 'Episode' }],
		default: [],
	})
	episodes: string[];

	@Prop({ type: Types.ObjectId, ref: 'User' })
	user: string;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
