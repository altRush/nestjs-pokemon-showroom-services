import { Test, TestingModule } from '@nestjs/testing';
import { PokemonStoreService } from './pokemon-store.service';

describe('PokemonStoreService', () => {
  let service: PokemonStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonStoreService],
    }).compile();

    service = module.get<PokemonStoreService>(PokemonStoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
