import { Injectable, Inject, ConflictException } from '@nestjs/common';
import type { UserRepositoryInterface } from '../../../domain/repositories/user.repository.interface';
import { USER_REPOSITORY } from '../../../domain/repositories/repository.tokens';
import { User } from '../../../domain/entities/user.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(identityId: string, dto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByIdentityId(identityId);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    const now = new Date();
    const userData = {
      identityId,
      nickname: dto.nickname,
      createdAt: now,
      updatedAt: now,
    };

    return this.userRepository.create(userData);
  }
}
