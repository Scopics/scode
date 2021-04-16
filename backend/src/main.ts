import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UtilsModule } from './utils/utils.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
