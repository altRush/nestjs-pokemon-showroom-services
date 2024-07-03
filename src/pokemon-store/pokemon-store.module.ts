import { Module } from '@nestjs/common';
import { PokemonStoreService } from './pokemon-store.service';
import { PokemonStoreController } from './pokemon-store.controller';
import { UtilsModule } from 'src/utils/utils.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [UtilsModule, DatabaseModule],
  providers: [PokemonStoreService],
  controllers: [PokemonStoreController],
})
export class PokemonStoreModule {}
