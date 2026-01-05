import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createUserSchema = z.object({
  nickname: z.string().min(1, 'Nickname is required'),
});

export class CreateUserDto extends createZodDto(createUserSchema) {}
