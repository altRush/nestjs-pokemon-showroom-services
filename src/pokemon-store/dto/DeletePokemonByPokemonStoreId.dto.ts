import { IsNumber } from 'class-validator';
import { IDeletePokemonByPokemonStoreIdRequest } from './../../interfaces/Store.interface';

export class deletePokemonByPokemonStoreIdFromStoreDto
  implements IDeletePokemonByPokemonStoreIdRequest
{
  @IsNumber()
  pokemonStoreId: number;
}
