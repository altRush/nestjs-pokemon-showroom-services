import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PokemonTeamsModule } from './pokemon-teams/pokemon-teams.module';
// import { PokemonTeamsController } from './pokemon-teams/pokemon-teams.controller';
// import { PokemonTeamsService } from './pokemon-teams/pokemon-teams.service';
import { HttpModule } from '@nestjs/axios';
// import { PokemonProfileModule } from './pokemon-profile/pokemon-profile.module';
// import { PokemonProfileController } from './pokemon-profile/pokemon-profile.controller';
// import { PokemonProfileService } from './pokemon-profile/pokemon-profile.service';
import { DatabaseModule } from './database/database.module';
import { PokemonStoreModule } from './pokemon-store/pokemon-store.module';
import { PokemonStoreController } from './pokemon-store/pokemon-store.controller';
import { PokemonStoreService } from './pokemon-store/pokemon-store.service';
import { UtilsModule } from './utils/utils.module';
import { UtilsService } from './utils/utils.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
    }),
    // PokemonTeamsModule,
    HttpModule,
    // PokemonProfileModule,
    DatabaseModule,
    PokemonStoreModule,
    UtilsModule,
  ],
  controllers: [
    AppController,
    // PokemonTeamsController,
    // PokemonProfileController,
    PokemonStoreController,
  ],
  providers: [
    AppService,
    // PokemonTeamsService,
    // PokemonProfileService,
    PokemonStoreService,
    UtilsService,
  ],
})
export class AppModule {}
