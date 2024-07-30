import { PokemonType } from './types.interface';

export interface IPokemonProfile {
  name: string;
  url: string;
  sprite: string;
  types: string[];
}

export interface IPokemonProfileWithTypes
  extends Omit<IPokemonProfile, 'types'> {
  types: PokemonType[];
}
