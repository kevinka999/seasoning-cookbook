import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { UserRepositoryInterface } from '../../../domain/repositories/user.repository.interface';
import { USER_REPOSITORY } from '../../../domain/repositories/repository.tokens';

@Injectable()
export class GetNicknameUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(identityId: string): Promise<{ nickname: string }> {
    const user = await this.userRepository.findByIdentityId(identityId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { nickname: user.nickname };
  }
}
