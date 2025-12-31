import { BaseRepository } from './base.repository.interface';
import { SeasoningItem, GameItem } from '../entities/seasoning-item.entity';

export interface SeasoningItemRepositoryInterface
  extends BaseRepository<SeasoningItem, GameItem> {}

