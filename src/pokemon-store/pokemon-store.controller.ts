import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { PokemonStoreService } from './pokemon-store.service';
import { IPokemonProfileWithTypes } from '../interfaces/pokemon-profile.interface';
import HttpStatusCode from '../constants/http-statuses.enums';
import { HttpResponseMessage } from '../constants/http-response-messages.enums';
import { IStorePokemonResponse } from '../interfaces/pokemon-store.interface';
import {
  AddPokemonToStoreDto,
  DeletePokemonByPokemonStoreIdFromStoreDto,
} from './dto/pokemon-store.dto';

@Controller('store')
export class PokemonStoreController {
  constructor(private readonly pokemonStoreService: PokemonStoreService) {}

  @Get(':name')
  async getPokemonByNameFromStore(
    @Param('name') name: string,
  ): Promise<IPokemonProfileWithTypes> {
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

  @Post('')
  async addPokemonToStore(
    @Body() body: AddPokemonToStoreDto,
  ): Promise<IStorePokemonResponse> {
    try {
      const response = await this.pokemonStoreService.addPokemonToStore(body);

      return response;
    } catch (e: unknown) {}
  }

  @Delete('')
  async deletePokemonByPokemonStoreIdFromStore(
    @Body() { pokemonStoreId }: DeletePokemonByPokemonStoreIdFromStoreDto,
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
