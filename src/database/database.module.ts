import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Pool } from 'pg';
import { PG_CONNECTION } from '../constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
    }),
  ],
  providers: [
    {
      provide: PG_CONNECTION,
      useValue: new Pool({
        user: process.env.DB_USERNAME,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT),
      }),
    },
  ],
  exports: [PG_CONNECTION],
})
export class DatabaseModule {}
