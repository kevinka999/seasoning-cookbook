import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PokemonRepositoryInterface } from '../../domain/repositories/pokemon.repository.interface';
import {
  Pokemon,
  PokemonRegistryItem,
} from '../../domain/entities/pokemon.entity';
import { PokemonDocument } from '../database/schemas/pokemon.schema';
import { BaseRepositoryImpl } from './base.repository';

@Injectable()
export class PokemonRepository
  extends BaseRepositoryImpl<Pokemon, PokemonRegistryItem, PokemonDocument>
  implements PokemonRepositoryInterface
{
  constructor(@InjectModel('Pokemon') pokemonModel: Model<PokemonDocument>) {
    super(pokemonModel);
  }

  protected toEntity(document: PokemonDocument): Pokemon {
    return new Pokemon(document.toObject() as PokemonRegistryItem);
  }

  async searchByName(name: string, limit: number): Promise<Pokemon[]> {
    const regex = new RegExp(name, 'i');
    const documents = await this.model
      .find({ name: { $regex: regex } })
      .limit(limit)
      .exec();
    return documents.map((doc) => this.toEntity(doc));
  }
}
