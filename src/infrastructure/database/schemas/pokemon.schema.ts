import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import type {
  PokemonRegistryItem,
  PokemonBucket,
  PokemonType,
  EggGroup,
} from '../../../domain/entities/pokemon.entity';

export type PokemonDocument = PokemonRegistryItem & Document;

@Schema({ collection: 'pokemons', timestamps: false })
export class PokemonSchema {
  @Prop({ required: true })
  registrationNumber: string;

  @Prop({ required: true, index: true })
  name: string;

  @Prop({ required: true, enum: ['common', 'uncommon', 'rare', 'ultra-rare'] })
  bucket: PokemonBucket;

  @Prop({ required: true, type: [String] })
  types: PokemonType[];

  @Prop({ required: true, type: [String] })
  eggGroups: EggGroup[];
}

export const PokemonSchemaFactory = SchemaFactory.createForClass(PokemonSchema);
