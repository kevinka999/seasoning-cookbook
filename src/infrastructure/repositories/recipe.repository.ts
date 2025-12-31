import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecipeRepositoryInterface } from '../../domain/repositories/recipe.repository.interface';
import { Recipe, RecipeData } from '../../domain/entities/recipe.entity';
import { RecipeDocument } from '../database/schemas/recipe.schema';
import { BaseRepositoryImpl } from './base.repository';

@Injectable()
export class RecipeRepository
  extends BaseRepositoryImpl<Recipe, RecipeData, RecipeDocument>
  implements RecipeRepositoryInterface
{
  constructor(@InjectModel('Recipe') recipeModel: Model<RecipeDocument>) {
    super(recipeModel);
  }

  protected toEntity(document: RecipeDocument): Recipe {
    return new Recipe(document.toObject() as RecipeData);
  }

  async findByPokemonId(pokemonId: string): Promise<Recipe[]> {
    const documents = await this.model
      .find({ pokemonId })
      .sort({ upvoteCount: -1, createdAt: -1 })
      .exec();
    return documents.map((doc) => this.toEntity(doc));
  }

  async findByAuthorId(authorId: string): Promise<Recipe[]> {
    const documents = await this.model
      .find({ authorId })
      .sort({ createdAt: -1 })
      .exec();
    return documents.map((doc) => this.toEntity(doc));
  }

  async findTopRated(limit: number): Promise<Recipe[]> {
    const documents = await this.model
      .find()
      .sort({ upvoteCount: -1, createdAt: -1 })
      .limit(limit)
      .exec();
    return documents.map((doc) => this.toEntity(doc));
  }

  async addUpvote(recipeId: string, userId: string): Promise<Recipe | null> {
    const document = await this.model
      .findOneAndUpdate(
        { id: recipeId, upvotedBy: { $ne: userId } },
        {
          $addToSet: { upvotedBy: userId },
          $inc: { upvoteCount: 1 },
          updatedAt: new Date(),
        },
        { new: true },
      )
      .exec();

    if (!document) {
      return null;
    }
    return this.toEntity(document);
  }

  async removeUpvote(
    recipeId: string,
    userId: string,
  ): Promise<Recipe | null> {
    const document = await this.model
      .findOneAndUpdate(
        { id: recipeId, upvotedBy: userId },
        {
          $pull: { upvotedBy: userId },
          $inc: { upvoteCount: -1 },
          updatedAt: new Date(),
        },
        { new: true },
      )
      .exec();

    if (!document) {
      return null;
    }
    return this.toEntity(document);
  }
}
