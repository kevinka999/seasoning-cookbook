import { Injectable, Inject } from '@nestjs/common';
import type { PokemonRepositoryInterface } from '../../../domain/repositories/pokemon.repository.interface';
import { POKEMON_REPOSITORY } from '../../../domain/repositories/repository.tokens';
import { Pokemon } from '../../../domain/entities/pokemon.entity';
import { SearchPokemonsQueryDto } from './search-pokemons.dto';

@Injectable()
export class SearchPokemonsUseCase {
  constructor(
    @Inject(POKEMON_REPOSITORY)
    private readonly pokemonRepository: PokemonRepositoryInterface,
  ) {}

  async execute(query: SearchPokemonsQueryDto): Promise<Pokemon[]> {
    const limit = query.limit ?? 10;
    return this.pokemonRepository.searchByName(query.name, limit);
  }
}

