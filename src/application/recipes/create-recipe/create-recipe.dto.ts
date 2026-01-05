import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createRecipeSchema = z.object({
  pokemonId: z.string().min(1, 'Pokemon ID is required'),
  seasoningItemIds: z
    .array(z.string())
    .length(3, 'Exactly 3 seasoning items are required'),
  description: z.string().optional().nullable(),
});

export class CreateRecipeDto extends createZodDto(createRecipeSchema) {}

