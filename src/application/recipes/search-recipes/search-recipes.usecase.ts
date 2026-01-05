import { Injectable, Inject } from '@nestjs/common';
import type {
  RecipeRepositoryInterface,
  RecipeSearchFilters,
  RecipeSortOptions,
} from '../../../domain/repositories/recipe.repository.interface';
import { RECIPE_REPOSITORY } from '../../../domain/repositories/repository.tokens';
import { Recipe } from '../../../domain/entities/recipe.entity';
import { SearchRecipesDto } from './search-recipes.dto';

@Injectable()
export class SearchRecipesUseCase {
  constructor(
    @Inject(RECIPE_REPOSITORY)
    private readonly recipeRepository: RecipeRepositoryInterface,
  ) {}

  async execute(dto: SearchRecipesDto): Promise<Recipe[]> {
    const filters: RecipeSearchFilters = {};

    if (dto.pokemonIds && dto.pokemonIds.length > 0) {
      filters.pokemonIds = dto.pokemonIds;
    }

    if (dto.seasoningItemIds && dto.seasoningItemIds.length > 0) {
      filters.seasoningItemIds = dto.seasoningItemIds;
    }

    const sortBy = dto.sortBy;
    const sort: RecipeSortOptions = {
      upvoteCount: sortBy === 'most-upvotes' ? -1 : 1,
    };

    return this.recipeRepository.search(filters, sort);
  }
}
