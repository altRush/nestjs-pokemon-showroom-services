import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'PG_OPTIONS',
      inject: [ConfigService],
      useFactory: (config) => ({
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        database: config.get('DB_DATABASE'),
        user: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
      }),
    },
    {
      provide: 'PG_POOL',
      inject: ['PG_OPTIONS'],
      useFactory: (options) => new Pool(options),
    },
  ],
  exports: ['PG_POOL'],
})
export class PgModule {}
