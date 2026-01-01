import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const searchPokemonsQuerySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  limit: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return 10;
      const parsed = parseInt(val, 10);
      return isNaN(parsed) ? 10 : parsed;
    })
    .pipe(z.number().int().min(1).max(100)),
});

export class SearchPokemonsQueryDto extends createZodDto(searchPokemonsQuerySchema) {}
