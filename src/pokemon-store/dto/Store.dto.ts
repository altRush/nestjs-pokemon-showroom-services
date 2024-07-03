import { ArrayMinSize, IsArray, IsNumber, IsString } from 'class-validator';
import { IDeletePokemonByPokemonStoreIdRequest } from '../../interfaces/Store.interface';
import { IPokemonProfile } from 'src/interfaces/PokemonProfile.interface';

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
