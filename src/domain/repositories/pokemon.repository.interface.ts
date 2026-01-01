import { BaseRepository } from './base.repository.interface';
import { Pokemon, PokemonRegistryItem } from '../entities/pokemon.entity';

export interface PokemonRepositoryInterface
  extends BaseRepository<Pokemon, PokemonRegistryItem> {
  searchByName(name: string, limit: number): Promise<Pokemon[]>;
}

