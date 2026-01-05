import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const toggleUpvoteSchema = z.object({
  recipeId: z.string().min(1, 'Recipe ID is required'),
});

export class ToggleUpvoteDto extends createZodDto(toggleUpvoteSchema) {}

