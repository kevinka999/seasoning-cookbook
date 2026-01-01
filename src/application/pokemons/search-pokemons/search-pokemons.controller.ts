import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { SearchPokemonsUseCase } from './search-pokemons.usecase';
import { SearchPokemonsQueryDto } from './search-pokemons.dto';
import { Pokemon } from '../../../domain/entities/pokemon.entity';

@ApiTags('Pokemons')
@Controller('pokemons')
export class SearchPokemonsController {
  constructor(private readonly searchPokemonsUseCase: SearchPokemonsUseCase) {}

  @Get('search')
  @ApiOperation({ summary: 'Buscar Pokemons por nome' })
  @ApiResponse({
    status: 200,
    description: 'Lista de Pokemons encontrados',
  })
  async search(
    @Query(ZodValidationPipe) query: SearchPokemonsQueryDto,
  ): Promise<Pokemon[]> {
    return this.searchPokemonsUseCase.execute(query);
  }
}
