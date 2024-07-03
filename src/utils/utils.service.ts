import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  jsArrayToSqlStringifiedArrayConverter = (array: Array<string>): string => {
    return array.map((type: string) => `'${type}'`).join(',');
  };

  getPokemonIdFromUrl = (url: string) => {
    const delimiter = '/';
    const start = 6;
    const tokens = url.split(delimiter).slice(start);
    const rawResult = tokens.join(delimiter);
    const result = rawResult.replace(/\/$/g, '');
    return result;
  };
}
