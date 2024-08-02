import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Podcast extends Document {
	@Prop()
	id: number;

	@Prop()
	podcastGuid: string;

	@Prop()
	medium: string;

	@Prop()
	title: string;

	@Prop()
	url: string;

	@Prop()
	originalUrl: string;

	@Prop()
	link: string;

	@Prop()
	description: string;

	@Prop()
	author: string;

	@Prop()
	ownerName: string;

	@Prop()
	image: string;

	@Prop()
	artwork: string;

	@Prop()
	lastUpdateTime: number;

	@Prop()
	lastCrawlTime: number;

	@Prop()
	lastParseTime: number;

	@Prop()
	lastGoodHttpStatusTime: number;

	@Prop()
	lastHttpStatus: number;

	@Prop()
	contentType: string;

	@Prop()
	itunesId: number;

	@Prop()
	itunesType: string;

	@Prop()
	generator: string;

	@Prop()
	language: string;

	@Prop()
	explicit: boolean;

	@Prop()
	type: number;

	@Prop()
	dead: number;

	@Prop()
	chash: string;

	@Prop()
	episodeCount: number;

	@Prop()
	crawlErrors: number;

	@Prop()
	parseErrors: number;

	@Prop({ type: Map, of: String })
	categories: Map<number, string>;

	@Prop()
	locked: number;

	@Prop()
	imageUrlHash: number;
}

const PodcastSchema = SchemaFactory.createForClass(Podcast);

PodcastSchema.index({ title: 'text' });

export { PodcastSchema };
