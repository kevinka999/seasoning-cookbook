import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserRepository } from './user.repository';
import { RecipeRepository } from './recipe.repository';
import { PokemonRepository } from './pokemon.repository';
import { SeasoningItemRepository } from './seasoning-item.repository';
import {
  USER_REPOSITORY,
  RECIPE_REPOSITORY,
  POKEMON_REPOSITORY,
  SEASONING_ITEM_REPOSITORY,
} from '../../domain/repositories/repository.tokens';

@Module({
  imports: [DatabaseModule],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: RECIPE_REPOSITORY,
      useClass: RecipeRepository,
    },
    {
      provide: POKEMON_REPOSITORY,
      useClass: PokemonRepository,
    },
    {
      provide: SEASONING_ITEM_REPOSITORY,
      useClass: SeasoningItemRepository,
    },
  ],
  exports: [
    USER_REPOSITORY,
    RECIPE_REPOSITORY,
    POKEMON_REPOSITORY,
    SEASONING_ITEM_REPOSITORY,
  ],
})
export class RepositoryModule {}
