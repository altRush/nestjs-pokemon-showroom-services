import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StoreModule } from './store/store.module';
import { PgModule } from './pg/pg.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    StoreModule,
    PgModule,
    ConfigModule.forRoot({ envFilePath: '.development.env' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
