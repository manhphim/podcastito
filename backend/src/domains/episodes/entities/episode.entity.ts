import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Episode extends Document {
	@Prop()
	id: number;

	@Prop({ index: true })
	title: string;

	@Prop({ index: true })
	description: string;

	@Prop()
	link: string;

	@Prop()
	guid: string;

	@Prop()
	datePublished: number;

	@Prop()
	datePublishedPretty: string;

	@Prop()
	dateCrawled: number;

	@Prop()
	enclosureUrl: string;

	@Prop()
	enclosureType: string;

	@Prop()
	enclosureLength: number;

	@Prop()
	duration: number;

	@Prop()
	explicit: number;

	@Prop()
	episode: number;

	@Prop()
	episodeType: string;

	@Prop()
	season: number;

	@Prop()
	image: string;

	@Prop()
	feedItunesId: number;

	@Prop()
	feedImage: string;

	@Prop()
	feedId: number;

	@Prop()
	feedLanguage: string;

	@Prop()
	feedDead: number;

	@Prop()
	feedDuplicateOf: string;

	@Prop()
	chaptersUrl: string;

	@Prop()
	transcriptUrl: string;
}

const EpisodeSchema = SchemaFactory.createForClass(Episode);

EpisodeSchema.index({ title: 'text' });

export { EpisodeSchema };
