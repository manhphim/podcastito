import { Module } from '@nestjs/common';
import { CategoryService } from './categories.service';
import { CategoryController } from './categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { CategoryRepository } from './categories.repository';
@Module({
	controllers: [CategoryController],
	providers: [CategoryService, CategoryRepository],
	imports: [
		MongooseModule.forFeature([
			{ name: Category.name, schema: CategorySchema },
		]),
	],
})
export class CategoriesModule {}
