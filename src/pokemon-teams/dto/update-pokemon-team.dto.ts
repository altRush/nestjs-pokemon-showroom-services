import { PartialType } from '@nestjs/mapped-types';
import { PokemonProfileDto } from '../../pokemon-profile/dto/pokemon-profile.dto';
import { CreatePokemonTeamDto } from './create-pokemon-team.dto';

export class UpdatePokemonTeamDto extends PartialType(CreatePokemonTeamDto) {
  name: string;
  pokemonMembers: Array<PokemonProfileDto>;
}
