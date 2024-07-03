import { IsArray, IsString } from 'class-validator';
import { PokemonProfileDto } from '../../pokemon-profile/dto/pokemon-profile.dto';

export class CreatePokemonTeamDto {
  @IsString()
  name: string;

  @IsArray()
  pokemonMembers: Array<PokemonProfileDto>;
}
