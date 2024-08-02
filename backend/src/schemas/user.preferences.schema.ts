import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = UserPreferences & Document;

@Schema()
export class UserPreferences {
    @Prop({ required: true })
    userId: string;

    @Prop({ required: true })
    recommendations: [];


}
export const UserPreferencesSchema = SchemaFactory.createForClass(UserPreferences);
