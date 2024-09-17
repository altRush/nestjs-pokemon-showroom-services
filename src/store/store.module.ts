import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { PgModule } from 'src/pg/pg.module';

@Module({
  imports: [PgModule],
  controllers: [StoreController],
  providers: [StoreService],
})
export class StoreModule {}
