import { Body, Controller, Post } from '@nestjs/common';
import { DecodeModule } from './decode.module';

@Controller('decode')
export class DecodeController {
  @Post()
  decodeQuery(@Body() body): { link: string } {
    let link: string = '';
    try {
      link = `https://www.youtube.com/embed/${DecodeModule.getLink(
        body.rays,
      )}`;
    } catch (err) {
      return err.message;
    }
    return { link };
  }
}
