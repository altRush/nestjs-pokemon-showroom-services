import { Inject, Injectable } from '@nestjs/common';
import { PG_POOL } from './constants';
import { Pool } from 'pg';

@Injectable()
export class AppService {
  constructor(@Inject(PG_POOL) private pool: Pool) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getPokemons() {
    const res = await this.pool.query('SELECT * FROM stored_pokemons');
    return res.rows;
  }
}
