import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './categories.service';
import { CategoryRepository } from './categories.repository';

describe('CategoryService', () => {
	let service: CategoryService;
	const mockCategoryRepository = {};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [CategoryService, CategoryRepository],
		})
			.overrideProvider(CategoryRepository)
			.useValue(mockCategoryRepository)
			.compile();

		service = module.get<CategoryService>(CategoryService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	// Add more tests for other methods in the same way
});
