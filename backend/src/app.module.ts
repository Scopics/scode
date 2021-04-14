import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DecodeModule } from './decode/decode.module';
import { UtilsModule } from './utils/utils.module';
import { EncodeController } from './encode/encode.controller';
import { DecodeController } from './decode/decode.controller';
import { EncodeModule } from './encode/encode.module';

@Module({
  imports: [DecodeModule, UtilsModule],
  controllers: [AppController, EncodeController, DecodeController],
  providers: [AppService],
})
export class AppModule {}
