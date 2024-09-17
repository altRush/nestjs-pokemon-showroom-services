import { Inject, Injectable } from '@nestjs/common';
import { PG_POOL } from '../constants';
import { Pool } from 'pg';

@Injectable()
export class StoreService {
  constructor(@Inject(PG_POOL) private pool: Pool) {}

  async getPokemons() {
    const res = await this.pool.query('SELECT * FROM stored_pokemons');
    return res.rows;
  }
}
