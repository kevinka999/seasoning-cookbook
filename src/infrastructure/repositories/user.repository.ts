import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { User, UserData } from '../../domain/entities/user.entity';
import { UserDocument } from '../database/schemas/user.schema';
import { BaseRepositoryImpl } from './base.repository';

@Injectable()
export class UserRepository
  extends BaseRepositoryImpl<User, UserData, UserDocument>
  implements UserRepositoryInterface
{
  constructor(@InjectModel('User') userModel: Model<UserDocument>) {
    super(userModel);
  }

  protected toEntity(document: UserDocument): User {
    return new User(document.toObject() as UserData);
  }

  async findByIdentityId(identityId: string): Promise<User | null> {
    const document = await this.model.findOne({ identityId }).exec();
    if (!document) {
      return null;
    }
    return this.toEntity(document);
  }
}
