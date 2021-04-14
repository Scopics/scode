import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DecodeModule } from './decode/decode.module';
import { CrcModule } from './crc/crc.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [DecodeModule, UtilsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
