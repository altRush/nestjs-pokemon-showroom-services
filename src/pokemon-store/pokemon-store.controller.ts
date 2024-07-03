import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
} from '@nestjs/common';
import { PokemonStoreService } from './pokemon-store.service';
import { IPokemonProfile } from 'src/interfaces/PokemonProfile.interface';
import HttpStatusCode from 'src/constants/http-statuses.enums';
import { HttpResponseMessage } from 'src/constants/http-response-messages.enums';
import { IStorePokemonResponse } from 'src/interfaces/Store.interface';
import { deletePokemonByPokemonStoreIdFromStoreDto } from './dto/DeletePokemonByPokemonStoreId.dto';

@Controller('store')
export class PokemonStoreController {
  constructor(private readonly pokemonStoreService: PokemonStoreService) {}

  @Get(':name')
  async getPokemonByNameFromStore(
    @Param('name') name: string,
  ): Promise<IPokemonProfile> {
    const response =
      await this.pokemonStoreService.getPokemonByNameFromStore(name);
    if (!response) {
      throw new HttpException(
        HttpResponseMessage.GET_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
      );
    }

    return response;
  }

  @Delete('')
  async deletePokemonByPokemonStoreIdFromStore(
    @Body() { pokemonStoreId }: deletePokemonByPokemonStoreIdFromStoreDto,
  ): Promise<IStorePokemonResponse> {
    try {
      if (!pokemonStoreId) {
        throw new HttpException(
          HttpResponseMessage.DELETE_FAILED,
          HttpStatusCode.BAD_REQUEST,
        );
      }

      const response =
        await this.pokemonStoreService.deletePokemonByPokemonStoreIdFromStore(
          pokemonStoreId,
        );

      return response;
    } catch (e: unknown) {
      if (e instanceof Error) {
        switch (e.message) {
          case HttpResponseMessage.DELETE_FAILED:
            throw new HttpException(
              HttpResponseMessage.DELETE_FAILED,
              HttpStatusCode.BAD_REQUEST,
            );
          case HttpResponseMessage.DELETE_NOT_FOUND:
            throw new HttpException(
              HttpResponseMessage.DELETE_NOT_FOUND,
              HttpStatusCode.NOT_FOUND,
            );
          default:
            throw new HttpException(
              HttpResponseMessage.INTERNAL_SERVER_ERROR,
              HttpStatusCode.INTERNAL_SERVER_ERROR,
            );
        }
      }
    }
  }
}
