import { Controller, Get, Param } from '@nestjs/common';
import { PokemonProfileService } from '../pokemon-profile/pokemon-profile.service';
import { PokemonProfileDto } from './dto/pokemon-profile.dto';

@Controller('pokemon-profile')
export class PokemonProfileController {
  constructor(private readonly pokemonProfileService: PokemonProfileService) {}

  @Get(':idOrName')
  getPokemonById(
    @Param('idOrName') idOrName: string,
  ): Promise<PokemonProfileDto> {
    return this.pokemonProfileService.getPokemonByIdOrName(idOrName);
  }
}
