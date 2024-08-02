import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AccessTokenGuard } from './guards/accessToken.guard';

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@UseGuards(AccessTokenGuard)
	@Get('protected')
	getHello(): string {
		return this.appService.getHello();
	}

	@Get('health')
	getHealth(): string {
		return 'ok';
	}
}
