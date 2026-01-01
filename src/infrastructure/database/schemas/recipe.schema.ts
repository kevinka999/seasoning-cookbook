import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RecipeData } from '../../../domain/entities/recipe.entity';

export type RecipeDocument = RecipeData & Document;

@Schema({ collection: 'recipes', timestamps: true })
export class RecipeSchema {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true, index: true })
  authorId: string;

  @Prop({ required: true, index: true })
  pokemonId: string;

  @Prop({ required: true, type: [String] })
  seasoningItemIds: string[];

  @Prop({ required: false, default: null, type: String })
  description: string | null;

  @Prop({ required: true, default: 0, index: -1 })
  upvoteCount: number;

  @Prop({ required: true, type: [String], default: [] })
  upvotedBy: string[];

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;
}

export const RecipeSchemaFactory = SchemaFactory.createForClass(RecipeSchema);

// Create compound indexes for optimized queries
RecipeSchemaFactory.index({ upvoteCount: -1, createdAt: -1 });
RecipeSchemaFactory.index({ pokemonId: 1, upvoteCount: -1 });

