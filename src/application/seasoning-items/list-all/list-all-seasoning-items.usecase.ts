import { Injectable, Inject } from '@nestjs/common';
import type { SeasoningItemRepositoryInterface } from '../../../domain/repositories/seasoning-item.repository.interface';
import { SEASONING_ITEM_REPOSITORY } from '../../../domain/repositories/repository.tokens';
import { SeasoningItem } from '../../../domain/entities/seasoning-item.entity';

@Injectable()
export class ListAllSeasoningItemsUseCase {
  constructor(
    @Inject(SEASONING_ITEM_REPOSITORY)
    private readonly seasoningItemRepository: SeasoningItemRepositoryInterface,
  ) {}

  async execute(): Promise<SeasoningItem[]> {
    return this.seasoningItemRepository.findAll();
  }
}
