import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';

export interface CategoryResult {
	results: Category[];
	total: number;
	// prevOffset: number;
}
@Injectable()
export class CategoryRepository {
	constructor(
		@InjectModel(Category.name) private categoryModel: Model<Category>
	) {}

	async createCategory(categoryData: Partial<Category>): Promise<Category> {
		const createdCategory = new this.categoryModel(categoryData);
		return createdCategory.save();
	}

	async findAllCategories(
		documentsToSkip: number = 0,
		limitOfDocuments?: number,
		startId?: string
	): Promise<CategoryResult> {
		const categories = this.categoryModel
			.find({ ...(startId && { _id: { $gt: startId } }) })
			.sort({ _id: 1 })
			.skip(documentsToSkip);

		if (limitOfDocuments) {
			categories.limit(limitOfDocuments);
		}

		const results = await categories;
		const total = await this.categoryModel.find().countDocuments();
		// const prevOffset = Number(documentsToSkip);

		// const response = { results, total, prevOffset };
		// console.log(response);
		return { results, total };
	}

	async findCategoryById(id: string): Promise<Category | null> {
		return this.categoryModel.findOne({ _id: id }).exec();
	}

	async updateCategory(
		id: string,
		updatedData: Partial<Category>
	): Promise<Category | null> {
		return this.categoryModel
			.findByIdAndUpdate(id, updatedData, { new: true })
			.exec();
	}
}
