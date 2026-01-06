import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import { RecipeCategory } from 'src/domain/entities/recipe.entity';

export const createRecipeSchema = z.object({
  pokemonId: z.string().min(1, 'Pokemon ID is required'),
  seasoningItemIds: z
    .array(z.string())
    .length(3, 'Exactly 3 seasoning items are required'),
  category: z.array(z.enum(RecipeCategory)).optional(),
  description: z.string().optional().nullable(),
});

export class CreateRecipeDto extends createZodDto(createRecipeSchema) {}
