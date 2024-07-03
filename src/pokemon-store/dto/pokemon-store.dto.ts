import { ArrayMinSize, IsArray, IsNumber, IsString } from 'class-validator';
import { IDeletePokemonByPokemonStoreIdRequest } from '../../interfaces/pokemon-store.interface';
import { IPokemonProfile } from '../../interfaces/pokemon-profile.interface';

export class DeletePokemonByPokemonStoreIdFromStoreDto
  implements IDeletePokemonByPokemonStoreIdRequest
{
  @IsNumber()
  pokemonStoreId: number;
}

export class AddPokemonToStoreDto implements IPokemonProfile {
  @IsString()
  name: string;

  @IsString()
  url: string;

  @IsString()
  sprite: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  types: string[];
}
