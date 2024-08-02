import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessTokenGuard } from '../../guards/accessToken.guard';

@Controller('users')
@UseGuards(AccessTokenGuard)
export class UserController {
	constructor(private readonly usersService: UserService) {}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Get(':id')
	findById(@Param('id') id: string) {
		return this.usersService.findById(id);
	}

	@UseGuards(AccessTokenGuard)
	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}
}
