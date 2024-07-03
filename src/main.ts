import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const stringPORT = process.env?.PORT;
  const PORT = stringPORT ? +stringPORT : 3000;
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(PORT);
  console.log(`Server is running at port ${PORT}`);
}
bootstrap();
