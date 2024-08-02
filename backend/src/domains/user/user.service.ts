// user.service.ts

import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDocument } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async create(createUserDto: CreateUserDto): Promise<UserDocument> {
		const newUser = this.userRepository.create(createUserDto);

		return newUser;
	}

	async findAll(): Promise<UserDocument[]> {
		return this.userRepository.findAll();
	}

	async findById(id: string): Promise<UserDocument> {
		return this.userRepository.findById(id);
	}

	async findByUsername(username: string): Promise<UserDocument> {
		return this.userRepository.findByUsername(username);
	}

	async update(
		id: string,
		updateUserDto: UpdateUserDto
	): Promise<UserDocument> {
		return this.userRepository.update(id, updateUserDto);
	}
}
