import { Injectable, Inject } from '@nestjs/common';
import type { RecipeRepositoryInterface } from '../../../domain/repositories/recipe.repository.interface';
import { RECIPE_REPOSITORY } from '../../../domain/repositories/repository.tokens';
import { Recipe } from '../../../domain/entities/recipe.entity';
import { CreateRecipeDto } from './create-recipe.dto';

@Injectable()
export class CreateRecipeUseCase {
  constructor(
    @Inject(RECIPE_REPOSITORY)
    private readonly recipeRepository: RecipeRepositoryInterface,
  ) {}

  async execute(authorId: string, dto: CreateRecipeDto): Promise<Recipe> {
    const now = new Date();
    const recipeData = {
      authorId,
      pokemonId: dto.pokemonId,
      seasoningItemIds: dto.seasoningItemIds,
      description: dto.description ?? null,
      category: [],
      upvoteCount: 0,
      upvotedBy: [],
      createdAt: now,
      updatedAt: now,
    };

    return this.recipeRepository.create(recipeData);
  }
}

