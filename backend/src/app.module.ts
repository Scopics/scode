import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EncodeController } from './encode/encode.controller';
import { DecodeController } from './decode/decode.controller';

@Module({
  imports: [],
  controllers: [AppController, EncodeController, DecodeController],
  providers: [AppService],
})
export class AppModule {}
