/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './categories.controller';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

describe('CategoriesController', () => {
	let controller: CategoryController;

	const mockCategoryService = {
		createCategory: jest.fn((dto: CreateCategoryDto) => {
			return { id: 1, ...dto };
		}),
		findAllCategories: jest.fn(({ offset, limit }) => {
			return [
				{ id: 1, name: 'Test Category' },
				{ id: 2, name: 'Test Category 2' },
			];
		}),
		findCategoryById: jest.fn((id: string) => {
			return { id: 1, name: 'Test Category' };
		}),
		updateCategory: jest.fn((id: string, dto: CreateCategoryDto) => {
			return { id: 1, ...dto };
		}),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CategoryController],
			providers: [CategoryService],
		})
			.overrideProvider(CategoryService)
			.useValue(mockCategoryService)
			.compile();

		controller = module.get<CategoryController>(CategoryController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('should create a category', async () => {
		const createCategoryDto: CreateCategoryDto = { name: 'Test Category' };

		expect(controller.createCategory(createCategoryDto)).resolves.toEqual({
			id: 1,
			...createCategoryDto,
		});

		expect(mockCategoryService.createCategory).toHaveBeenCalledWith(
			createCategoryDto
		);
	});

	// Add more tests for other methods in the same way
	it('should find all categories', async () => {
		const categories = await controller.findAllCategories({
			offset: 0,
			limit: 10,
		});
		expect(categories).toEqual([
			{ id: 1, name: 'Test Category' },
			{ id: 2, name: 'Test Category 2' },
		]);
	});

	it('should find a category by id', async () => {
		const category = await controller.findCategoryById('1');
		expect(category).toEqual({ id: 1, name: 'Test Category' });
	});

	it('should update a category', async () => {
		const updateCategoryDto: CreateCategoryDto = {
			name: 'Test Category Updated',
		};
		const updatedCategory = await controller.updateCategory(
			'1',
			updateCategoryDto
		);
		expect(updatedCategory).toEqual({
			id: 1,
			...updateCategoryDto,
		});
	});

	it('should throw an error when creating a category with invalid data', async () => {
		const createCategoryDto: CreateCategoryDto = { name: '' }; // Invalid data

		mockCategoryService.createCategory.mockImplementation(() => {
			throw new Error('Invalid data');
		});

		await expect(controller.createCategory(createCategoryDto)).rejects.toThrow(
			'Invalid data'
		);
	});

	it('should throw an error when finding a category by non-existing id', async () => {
		const nonExistingId = '999';

		mockCategoryService.findCategoryById.mockImplementation(() => {
			throw new Error('Category not found');
		});

		await expect(controller.findCategoryById(nonExistingId)).rejects.toThrow(
			'Category not found'
		);
	});

	it('should throw an error when updating a category with invalid data', async () => {
		const updateCategoryDto: CreateCategoryDto = { name: '' }; // Invalid data

		mockCategoryService.updateCategory.mockImplementation(() => {
			throw new Error('Invalid data');
		});

		await expect(
			controller.updateCategory('1', updateCategoryDto)
		).rejects.toThrow('Invalid data');
	});
});
