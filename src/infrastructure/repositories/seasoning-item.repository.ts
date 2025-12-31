import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SeasoningItemRepositoryInterface } from '../../domain/repositories/seasoning-item.repository.interface';
import {
  SeasoningItem,
  GameItem,
} from '../../domain/entities/seasoning-item.entity';
import { SeasoningItemDocument } from '../database/schemas/seasoning-item.schema';
import { BaseRepositoryImpl } from './base.repository';

@Injectable()
export class SeasoningItemRepository
  extends BaseRepositoryImpl<SeasoningItem, GameItem, SeasoningItemDocument>
  implements SeasoningItemRepositoryInterface
{
  constructor(
    @InjectModel('SeasoningItem')
    seasoningItemModel: Model<SeasoningItemDocument>,
  ) {
    super(seasoningItemModel);
  }

  protected toEntity(document: SeasoningItemDocument): SeasoningItem {
    return new SeasoningItem(document.toObject() as GameItem);
  }
}
