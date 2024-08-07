import {
  // BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ClientBase } from 'pg';
import { HttpResponseMessage } from '../constants/http-response-messages.enums';
import {
  IPokemonProfile,
  IPokemonProfileWithTypes,
} from '../interfaces/pokemon-profile.interface';
import { IStorePokemonResponse } from '../interfaces/pokemon-store.interface';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class PokemonStoreService {
  private readonly logger = new Logger('PokemonStoreService');
  constructor(
    @Inject('PG_CONNECTION')
    private db: ClientBase,
    @Inject('utils')
    private utils: UtilsService,
  ) {}

  getPokemonByIdFromStore = async (
    pokemonId: string,
  ): Promise<IPokemonProfileWithTypes | null> => {
    const { rowCount, rows } = await this.db.query(
      `SELECT name, url, sprite, types
      FROM stored_pokemons
      WHERE pokemon_store_id = '${pokemonId}'`,
    );

    if (!rowCount) {
      return null;
    }

    const pokemon: IPokemonProfile = rows[0];

    const sqlPokemonTypesArray =
      this.utils.jsArrayToSqlStringifiedArrayConverter(pokemon.types);

    const { rows: pokemonTypes } = await this.db.query(
      `select t.* from unnest(array[${sqlPokemonTypesArray}]) type_name_s left join types t on t.type_name = type_name_s`,
    );

    const pokemonProfile: IPokemonProfileWithTypes = {
      ...pokemon,
      types: pokemonTypes,
    };

    return pokemonProfile;
  };

  addPokemonToStore = async (
    pokemonProfile: IPokemonProfile,
  ): Promise<IStorePokemonResponse> => {
    let successResponse: IStorePokemonResponse = {
      success: false,
    };
    const { name, url, sprite, types } = pokemonProfile;

    const sqlTypeNamesStringifiedArray =
      this.utils.jsArrayToSqlStringifiedArrayConverter(types);

    const { command, rowCount } = await this.db.query(`
      INSERT INTO public.stored_pokemons (name, url, sprite, types)
      VALUES ('${name}','${url}','${sprite}',ARRAY[${sqlTypeNamesStringifiedArray}]);
      `);

    if (command === 'INSERT' && rowCount) {
      successResponse = {
        success: true,
        message: HttpResponseMessage.ADD_SUCCESS,
      };
    }

    return successResponse;
  };

  deletePokemonByPokemonStoreIdFromStore = async (
    pokemonStoreId: number,
  ): Promise<IStorePokemonResponse> => {
    const results = await this.db.query(
      `DELETE from stored_pokemons WHERE pokemon_store_id = ${pokemonStoreId}`,
    );

    if (!results.rowCount) {
      throw new Error(HttpResponseMessage.DELETE_NOT_FOUND);
    }

    const successResponse = {
      success: true,
      message: HttpResponseMessage.DELETE_SUCCESS,
    };

    return successResponse;
  };
}
