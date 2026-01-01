import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import type {
  GameItem,
  ItemEffect,
} from '../../../domain/entities/seasoning-item.entity';

export type SeasoningItemDocument = GameItem & Document;

const EffectTypeValues = [
  'REDUCE_BITE_TIME_PERCENT',
  'BOOST_RARITY_BUCKET',
  'INCREASE_SHINY_CHANCE_MULTIPLIER',
  'ATTRACT_HIDDEN_ABILITY',
  'INCREASE_REEL_CHANCE',
  'BOOST_POKEMON_LEVEL',
  'ATTRACT_EV_YIELD',
  'BOOST_FRIENDSHIP',
  'ATTRACT_FEMALE_POKEMON',
  'ATTRACT_MALE_POKEMON',
  'DROPS_REROLL_COUNT',
  'BOOST_IVS',
  'EGG_GROUP_BOOST',
  'TYPE_BOOST',
  'ATTRACT_NATURE',
  'NO_EFFECT',
] as const;

const EffectCategoryValues = [
  'HP',
  'ATTACK',
  'DEFENSE',
  'SPECIAL_ATTACK',
  'SPECIAL_DEFENSE',
  'SPEED',
  'DRAGON',
  'MONSTER',
  'WATER_1',
  'WATER_2',
  'WATER_3',
  'BUG',
  'FAIRY',
  'GRASS',
  'HUMAN_LIKE',
  'FLYING',
  'FIELD',
  'MINERAL',
  'AMORPHOUS',
  'DARK',
  'ELECTRIC',
  'FIGHTING',
  'FIRE',
  'GHOST',
  'GROUND',
  'ICE',
  'NORMAL',
  'POISON',
  'PSYCHIC',
  'ROCK',
  'STEEL',
  'WATER',
] as const;

const ItemEffectSchema = {
  type: { type: String, required: true, enum: EffectTypeValues },
  category: {
    type: String,
    required: false,
    enum: EffectCategoryValues,
  },
  value: { type: String, required: false },
};

@Schema({ collection: 'seasoning_items', timestamps: false })
export class SeasoningItemSchema {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  item_name: string;

  @Prop({ required: true, type: [ItemEffectSchema] })
  effects: ItemEffect[];

  @Prop({ required: false, type: String })
  image: string | undefined;
}

export const SeasoningItemSchemaFactory =
  SchemaFactory.createForClass(SeasoningItemSchema);

