import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ZodValidationPipe } from 'nestjs-zod';
import { JwtAuthGuard } from '../../../infrastructure/auth/jwt-auth.guard';
import { IdentityDecorator } from '../../../infrastructure/auth/identity.decorator';
import type { Identity } from '../../../infrastructure/auth/identity.decorator';
import { CreateUserUseCase } from './create-user.usecase';
import { CreateUserDto } from './create-user.dto';
import { User } from '../../../domain/entities/user.entity';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @IdentityDecorator() identity: Identity,
    @Body(ZodValidationPipe) dto: CreateUserDto,
  ): Promise<User> {
    return this.createUserUseCase.execute(identity.id, dto);
  }
}
