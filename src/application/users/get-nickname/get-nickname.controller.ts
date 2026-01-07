import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../infrastructure/auth/jwt-auth.guard';
import { IdentityDecorator } from '../../../infrastructure/auth/identity.decorator';
import type { Identity } from '../../../infrastructure/auth/identity.decorator';
import { GetNicknameUseCase } from './get-nickname.usecase';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class GetNicknameController {
  constructor(private readonly getNicknameUseCase: GetNicknameUseCase) {}

  @Get('nickname')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obter nickname do usuário autenticado' })
  @ApiResponse({
    status: 200,
    description: 'Nickname do usuário',
    schema: {
      type: 'object',
      properties: {
        nickname: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  async getNickname(
    @IdentityDecorator() identity: Identity,
  ): Promise<{ nickname: string }> {
    return this.getNicknameUseCase.execute(identity.id);
  }
}

