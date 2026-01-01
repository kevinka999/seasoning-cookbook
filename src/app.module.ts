import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UseCaseModule } from './application/usecase.module';
import { CommonModule } from './infrastructure/common/common.module';

@Module({
  imports: [CommonModule, UseCaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
