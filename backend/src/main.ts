import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as dotenv from 'dotenv';
import { HttpExceptionFilter } from './utils/http-exception.filter';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
dotenv.config();
async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bufferLogs: true,
	});

	const config = new DocumentBuilder()
		.setTitle('Podcastito')
		.setDescription('The podcast API')
		.setVersion('1.0')
		.addTag('podcasts')
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	app.enableCors();
	app.setGlobalPrefix('api/v1');
	app.useGlobalFilters(new HttpExceptionFilter());
	app.useLogger(app.get(Logger));
	app.useGlobalInterceptors(new LoggerErrorInterceptor());

	await app.listen(5500);
}
bootstrap();
