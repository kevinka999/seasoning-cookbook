import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { JwtAuthGuard } from '../../../infrastructure/auth/jwt-auth.guard';
import { IdentityDecorator } from '../../../infrastructure/auth/identity.decorator';
import type { Identity } from '../../../infrastructure/auth/identity.decorator';
import { CreateRecipeUseCase } from './create-recipe.usecase';
import { CreateRecipeDto } from './create-recipe.dto';
import { Recipe } from '../../../domain/entities/recipe.entity';

@ApiTags('Recipes')
@Controller('recipes')
@ApiBearerAuth()
export class CreateRecipeController {
  constructor(private readonly createRecipeUseCase: CreateRecipeUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @IdentityDecorator() identity: Identity,
    @Body(ZodValidationPipe) dto: CreateRecipeDto,
  ): Promise<Recipe> {
    return this.createRecipeUseCase.execute(identity.id, dto);
  }
}
