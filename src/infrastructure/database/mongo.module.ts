import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { UserSchemaFactory } from './schemas/user.schema';
import { RecipeSchemaFactory } from './schemas/recipe.schema';
import { PokemonSchemaFactory } from './schemas/pokemon.schema';
import { SeasoningItemSchemaFactory } from './schemas/seasoning-item.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        return {
          uri,
          dbName: 'seasoning-cookbook',
        };
      },
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
export class MongoModule {}
