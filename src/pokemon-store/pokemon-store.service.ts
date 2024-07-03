import {
  // BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ClientBase } from 'pg';
import { HttpResponseMessage } from 'src/constants/http-response-messages.enums';
import { IPokemonProfile } from 'src/interfaces/PokemonProfile.interface';
import { IStorePokemonResponse } from 'src/interfaces/Store.interface';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class PokemonStoreService {
  private readonly logger = new Logger('PokemonStoreService');
  constructor(
    @Inject('PG_CONNECTION')
    private db: ClientBase,
    @Inject('utils')
    private utils: UtilsService,
  ) {}

  getPokemonByNameFromStore = async (
    pokemonName: string,
  ): Promise<IPokemonProfile | null> => {
    const { rowCount, rows } = await this.db.query(
      `SELECT name, url, sprite, types
      FROM stored_pokemons
      WHERE name = '${pokemonName}'`,
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

    const pokemonProfile = {
      ...pokemon,
      types: pokemonTypes,
    };

    return pokemonProfile;
  };

  addPokemonToStore = async (
    pokemonProfile: IPokemonProfile,
  ): Promise<IStorePokemonResponse> => {
    const successResponse = {
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
      successResponse.success = true;
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
