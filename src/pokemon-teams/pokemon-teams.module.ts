import { Module } from '@nestjs/common';
import { PokemonTeamsService } from './pokemon-teams.service';
import { PokemonTeamsController } from './pokemon-teams.controller';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [HttpModule, DatabaseModule],
  providers: [PokemonTeamsService],
  controllers: [PokemonTeamsController],
})
export class PokemonTeamsModule {}
