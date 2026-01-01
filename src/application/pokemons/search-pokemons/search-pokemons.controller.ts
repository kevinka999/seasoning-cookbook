import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SearchPokemonsUseCase } from './search-pokemons.usecase';
import {
  type SearchPokemonsQueryDto,
  searchPokemonsQuerySchema,
} from './search-pokemons.dto';
import { Pokemon } from '../../../domain/entities/pokemon.entity';
import { ZodValidationPipe } from '../../../infrastructure/common/zod-validation.pipe';

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
  @UsePipes(new ZodValidationPipe(searchPokemonsQuerySchema))
  async search(@Query() query: SearchPokemonsQueryDto): Promise<Pokemon[]> {
    return this.searchPokemonsUseCase.execute(query);
  }
}
