import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto/auth.dto';
import { AccessTokenGuard } from '../guards/accessToken.guard';
import { RefreshTokenGuard } from '../guards/refreshToken.guard';
import { LocalAuthGuard } from '../guards/local.auth.guard';

// Because req.user is not defined by default in Request, we need to extend the Request interface to include it.
interface RequestWithUser extends Request {
	user: {
		sub: string;
		refreshToken: string;
	};
}
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('signup')
	signup(@Body() registerDto: RegisterDTO) {
		return this.authService.signUp(registerDto);
	}

	@HttpCode(HttpStatus.CREATED)
	@UseGuards(LocalAuthGuard)
	@Post('login')
	signin(@Body() data: LoginDTO) {
		return this.authService.signIn(data);
	}

	@UseGuards(AccessTokenGuard)
	@Post('logout')
	logout(@Req() req: RequestWithUser) {
		this.authService.logout(req.user['sub']);
	}
	@UseGuards(RefreshTokenGuard)
	@Post('refresh')
	refreshTokens(@Req() req: RequestWithUser) {
		const userId = req.user['sub'];
		const refreshToken = req.user['refreshToken'];
		return this.authService.refreshTokens(userId, refreshToken);
	}
}
