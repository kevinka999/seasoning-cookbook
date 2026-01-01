import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongoModule } from '../database/mongo.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongoModule,
  ],
  exports: [ConfigModule, MongoModule],
})
export class CommonModule {}
