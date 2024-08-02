// base.schema.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Base {
	@Prop({ type: Number, default: Date.now() })
	createdAt: number;

	@Prop({ type: Number, default: Date.now() })
	updatedAt: number;

	@Prop({ type: Number, default: null })
	deletedAt: number;

	@Prop({ type: Boolean, default: false })
	isDeleted: boolean;
}

export type BaseDocument = Base & Document;

export const BaseSchema = SchemaFactory.createForClass(Base);
