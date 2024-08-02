import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../domains/user/user.module';
import { LocalStrategy } from './strategies/local.strategy';

import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';

@Module({
	imports: [JwtModule.register({}), UserModule],
	providers: [
		AuthService,
		LocalStrategy,
		AccessTokenStrategy,
		RefreshTokenStrategy,
		JwtService,
		ConfigService,
	],
	controllers: [AuthController],
})
export class AuthModule {}
