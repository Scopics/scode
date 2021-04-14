import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UtilsModule } from './utils/utils.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
