import { Controller, Get } from '@nestjs/common';
import { StoreService } from './store.service';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('get-stored-pokemons')
  getStoredPokemons(): any {
    return this.storeService.getPokemons();
  }
}
