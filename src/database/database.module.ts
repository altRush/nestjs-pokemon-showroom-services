import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { PG_CONNECTION } from 'src/constants';

const databaseConnectionProvider = {
  provide: PG_CONNECTION,
  useValue: new Pool({
    user: process.env.DB_USERNAME,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
  }),
};

@Module({
  providers: [databaseConnectionProvider],
  exports: [PG_CONNECTION],
})
export class DatabaseModule {}
