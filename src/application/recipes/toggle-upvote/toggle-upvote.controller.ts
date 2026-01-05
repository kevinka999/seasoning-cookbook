import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { JwtAuthGuard } from '../../../infrastructure/auth/jwt-auth.guard';
import { IdentityDecorator } from '../../../infrastructure/auth/identity.decorator';
import type { Identity } from '../../../infrastructure/auth/identity.decorator';
import { ToggleUpvoteUseCase } from './toggle-upvote.usecase';
import { ToggleUpvoteDto } from './toggle-upvote.dto';
import { Recipe } from '../../../domain/entities/recipe.entity';

@ApiTags('Recipes')
@Controller('recipes')
@ApiBearerAuth()
export class ToggleUpvoteController {
  constructor(private readonly toggleUpvoteUseCase: ToggleUpvoteUseCase) {}

  @Post('upvote')
  @UseGuards(JwtAuthGuard)
  async toggleUpvote(
    @IdentityDecorator() identity: Identity,
    @Body(ZodValidationPipe) dto: ToggleUpvoteDto,
  ): Promise<Recipe> {
    return this.toggleUpvoteUseCase.execute(dto.recipeId, identity.id);
  }
}

