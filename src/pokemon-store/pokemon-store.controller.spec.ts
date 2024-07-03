import { Test, TestingModule } from '@nestjs/testing';
import { PokemonStoreController } from './pokemon-store.controller';

describe('PokemonStoreController', () => {
  let controller: PokemonStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonStoreController],
    }).compile();

    controller = module.get<PokemonStoreController>(PokemonStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
