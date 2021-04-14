import { Body, Controller, Post } from '@nestjs/common';
import { EncodeModule } from '../encode/encode.module';

@Controller('encode')
export class EncodeController {
    @Post()
    createScode(@Body() link: string): string {
        let rays = '';
        try {
            rays = EncodeModule.getRays(link);
        } catch(err) {
            return err.message;
        }
        return rays;
    }
}
