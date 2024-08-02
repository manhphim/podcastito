import {
	Controller,
	Get,
	Post,
	Param,
	Body,
	Put,
	Query,
	UseGuards,
} from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationParams } from '../../utils/paginationParams';
import { AccessTokenGuard } from '../../guards/accessToken.guard';

@Controller('categories')
@UseGuards(AccessTokenGuard)
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
	async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
		const category =
			await this.categoryService.createCategory(createCategoryDto);
		return category;
	}

	@Get()
	async findAllCategories(@Query() { offset, limit }: PaginationParams) {
		const categories = await this.categoryService.findAllCategories(
			offset,
			limit
		);
		return categories;
	}

	@Get(':id')
	async findCategoryById(@Param('id') id: string) {
		const category = await this.categoryService.findCategoryById(id);
		return category;
	}

	@Put(':id')
	async updateCategory(
		@Param('id') id: string,
		@Body() updateCategoryDto: UpdateCategoryDto
	) {
		const updatedCategory = await this.categoryService.updateCategory(
			id,
			updateCategoryDto
		);
		return updatedCategory;
	}
}
