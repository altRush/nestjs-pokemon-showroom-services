import { Module } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

const databaseConnectionProvider = {
  provide: 'DATABASE_CONNECTION',
  useFactory: async (): Promise<Db> => {
    try {
      const client = await MongoClient.connect('mongodb://127.0.0.1');

      return client.db('pokemon-teams');
    } catch (e) {
      throw e;
    }
  },
};

@Module({
  providers: [databaseConnectionProvider],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}
