import { BaseRepository } from './base.repository.interface';
import { User, UserData } from '../entities/user.entity';

export interface UserRepositoryInterface extends BaseRepository<
  User,
  UserData
> {
  findByIdentityId(identityId: string): Promise<User | null>;
}
