import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
	@Prop({ required: true, unique: true })
	username: string;

	@Prop({ required: true })
	password: string;

	@Prop()
	refreshToken: string;

	@Prop({
		type: Types.ObjectId,
		ref: 'Profile',
		onDelete: 'CASCADE',
	})
	profile: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
