import { Module } from '@nestjs/common';
import { UtilsService } from './utils.service';

const utilsProvider = {
  provide: 'utils',
  useValue: new UtilsService(),
};

@Module({
  providers: [utilsProvider],
  exports: ['utils'],
})
export class UtilsModule {}
