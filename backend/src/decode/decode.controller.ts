import { Body, Controller, Post } from '@nestjs/common';
import { DecodeModule } from './decode.module';

@Controller('decode')
export class DecodeController {
    @Post()
    decodeQuery(@Body() str: string[]): string{
        let link: string = '';
        try {
            link = DecodeModule.getLink(str)
        }
        catch(err) {
            return err.message;
        }
        return link;
    }
}
