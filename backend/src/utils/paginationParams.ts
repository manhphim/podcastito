import { IsNumber, Min, IsOptional, IsMongoId } from 'class-validator';
import { Type } from 'class-transformer';

class PaginationParams {
	@IsOptional()
	@IsMongoId()
	startId?: string;

	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	@Min(0)
	offset?: number;

	@IsOptional()
	@Type(() => Number)
	@IsNumber()
	@Min(1)
	limit?: number;
}

export { PaginationParams };
