import { BaseRepository } from './base.repository.interface';
import { User, UserData } from '../entities/user.entity';

export interface UserRepositoryInterface
  extends BaseRepository<User, UserData> {
  findByEmail(email: string): Promise<User | null>;
  findByGoogleId(googleId: string): Promise<User | null>;
}

