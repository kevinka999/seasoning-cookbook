import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  UserSchema,
  UserSchemaFactory,
} from './schemas/user.schema';
import {
  RecipeSchema,
  RecipeSchemaFactory,
} from './schemas/recipe.schema';
import {
  PokemonSchema,
  PokemonSchemaFactory,
} from './schemas/pokemon.schema';
import {
  SeasoningItemSchema,
  SeasoningItemSchemaFactory,
} from './schemas/seasoning-item.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchemaFactory },
      { name: 'Recipe', schema: RecipeSchemaFactory },
      { name: 'Pokemon', schema: PokemonSchemaFactory },
      { name: 'SeasoningItem', schema: SeasoningItemSchemaFactory },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}

