// user.repository.ts

import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserRepository {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async create(createUserDto: CreateUserDto): Promise<UserDocument> {
		const createdUser = new this.userModel(createUserDto);
		return createdUser.save();
	}

	async findAll(): Promise<UserDocument[]> {
		return this.userModel.find().exec();
	}

	async findById(id: string): Promise<UserDocument> {
		return this.userModel.findById(id);
	}

	async findByUsername(username: string): Promise<UserDocument> {
		return this.userModel.findOne({ username }).exec();
	}

	async update(
		id: string,
		updateUserDto: UpdateUserDto
	): Promise<UserDocument> {
		return this.userModel
			.findByIdAndUpdate(id, updateUserDto, { new: true })
			.exec();
	}
}
