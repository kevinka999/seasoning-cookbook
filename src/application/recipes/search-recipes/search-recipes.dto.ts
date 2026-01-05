import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const searchRecipesQuerySchema = z.object({
  sortBy: z
    .enum(['most-upvotes', 'least-upvotes'])
    .optional()
    .default('most-upvotes'),
  pokemonIds: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      if (Array.isArray(val)) return val;
      return val
        .split(',')
        .map((id) => id.trim())
        .filter((id) => id.length > 0);
    })
    .pipe(z.array(z.string()).optional()),
  seasoningItemIds: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      if (Array.isArray(val)) return val;
      return val
        .split(',')
        .map((id) => id.trim())
        .filter((id) => id.length > 0);
    })
    .pipe(z.array(z.string()).optional()),
});

export class SearchRecipesDto extends createZodDto(searchRecipesQuerySchema) {}
