import { BaseRepository } from './base.repository.interface';
import { Recipe, RecipeData } from '../entities/recipe.entity';

export interface RecipeRepositoryInterface
  extends BaseRepository<Recipe, RecipeData> {
  findByPokemonId(pokemonId: string): Promise<Recipe[]>;
  findByAuthorId(authorId: string): Promise<Recipe[]>;
  findTopRated(limit: number): Promise<Recipe[]>;
  addUpvote(recipeId: string, userId: string): Promise<Recipe | null>;
  removeUpvote(recipeId: string, userId: string): Promise<Recipe | null>;
}

