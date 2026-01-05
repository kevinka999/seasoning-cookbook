import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import type { RecipeRepositoryInterface } from '../../../domain/repositories/recipe.repository.interface';
import { RECIPE_REPOSITORY } from '../../../domain/repositories/repository.tokens';
import { Recipe } from '../../../domain/entities/recipe.entity';
import { ToggleUpvoteDto } from './toggle-upvote.dto';

@Injectable()
export class ToggleUpvoteUseCase {
  constructor(
    @Inject(RECIPE_REPOSITORY)
    private readonly recipeRepository: RecipeRepositoryInterface,
  ) {}

  async execute(recipeId: string, userId: string): Promise<Recipe> {
    const recipe = await this.recipeRepository.findById(recipeId);
    
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    const hasUpvoted = recipe.upvotedBy.includes(userId);

    let updatedRecipe: Recipe | null;
    
    if (hasUpvoted) {
      updatedRecipe = await this.recipeRepository.removeUpvote(recipeId, userId);
    } else {
      updatedRecipe = await this.recipeRepository.addUpvote(recipeId, userId);
    }

    if (!updatedRecipe) {
      throw new BadRequestException('Failed to update upvote');
    }

    return updatedRecipe;
  }
}

