import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { SearchRecipesUseCase } from './search-recipes.usecase';
import { SearchRecipesDto } from './search-recipes.dto';
import { Recipe } from '../../../domain/entities/recipe.entity';

@ApiTags('Recipes')
@Controller('recipes')
export class SearchRecipesController {
  constructor(private readonly searchRecipesUseCase: SearchRecipesUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Buscar receitas com filtros' })
  @ApiResponse({
    status: 200,
    description: 'Lista de receitas encontradas',
  })
  async search(
    @Query(ZodValidationPipe) query: SearchRecipesDto,
  ): Promise<Recipe[]> {
    return this.searchRecipesUseCase.execute(query);
  }
}

