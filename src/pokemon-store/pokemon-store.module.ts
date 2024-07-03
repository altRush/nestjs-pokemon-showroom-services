import { Module } from '@nestjs/common';
import { PokemonStoreService } from './pokemon-store.service';
import { PokemonStoreController } from './pokemon-store.controller';
import { UtilsModule } from '../utils/utils.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [UtilsModule, DatabaseModule],
  providers: [PokemonStoreService],
  controllers: [PokemonStoreController],
})
export class PokemonStoreModule {}
