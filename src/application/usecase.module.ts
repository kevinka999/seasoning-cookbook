import { Module } from '@nestjs/common';
import { RepositoryModule } from '../infrastructure/repositories/repository.module';
import controllers from './controllers';
import usecases from './usecases';

@Module({
  imports: [RepositoryModule],
  controllers: controllers,
  providers: usecases,
  exports: usecases,
})
export class UseCaseModule {}
