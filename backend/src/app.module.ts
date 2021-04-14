import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DecodeModule } from './decode/decode.module';
import { CrcModule } from './crc/crc.module';
import { UtilsModule } from './utils/utils.module';
import { EncodeController } from './encode/encode.controller';

@Module({
  imports: [DecodeModule, UtilsModule],
  controllers: [AppController, EncodeController],
  providers: [AppService],
})
export class AppModule {}
