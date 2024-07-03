import { Client } from 'pg';

interface IStoreModelUtils {
  jsArrayToSqlStringifiedArrayConverter(stringArray: string[]): string;
  client: Client;
}

interface IStorePokemonResponse {
  success: boolean;
  message?: string;
}

interface IDeletePokemonByPokemonStoreIdRequest {
  pokemonStoreId: number;
}

export {
  IStoreModelUtils,
  IStorePokemonResponse,
  IDeletePokemonByPokemonStoreIdRequest,
};
