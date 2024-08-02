import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './categories.repository';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	async createCategory(categoryData: Partial<Category>): Promise<Category> {
		return this.categoryRepository.createCategory(categoryData);
	}

	async findAllCategories(skip: number, limit: number) {
		return this.categoryRepository.findAllCategories(skip, limit);
	}

	async findCategoryById(id: string): Promise<Category | null> {
		const category = this.categoryRepository.findCategoryById(id);
		if (!category) {
			throw new NotFoundException(`Category with id ${id} not found`);
		}
		return category;
	}

	async updateCategory(
		id: string,
		updatedData: Partial<Category>
	): Promise<Category | null> {
		return this.categoryRepository.updateCategory(id, updatedData);
	}
}
