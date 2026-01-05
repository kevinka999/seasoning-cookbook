import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ListAllSeasoningItemsUseCase } from './list-all-seasoning-items.usecase';
import { SeasoningItem } from '../../../domain/entities/seasoning-item.entity';

@ApiTags('Seasoning Items')
@Controller('seasoning-items')
export class ListAllSeasoningItemsController {
  constructor(
    private readonly listAllSeasoningItemsUseCase: ListAllSeasoningItemsUseCase,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os seasoning items' })
  @ApiResponse({
    status: 200,
    description: 'Lista de seasoning items',
  })
  async listAll(): Promise<SeasoningItem[]> {
    return this.listAllSeasoningItemsUseCase.execute();
  }
}
