import { Body, Controller, Post } from '@nestjs/common';
import { EncodeModule } from '../encode/encode.module';

@Controller('create')
export class EncodeController {
    @Post()
    createScode(@Body() body): string[] | string {
        let rays = [];
        try {
            rays = EncodeModule.getRays(body.link);
        } catch(err) {
            return err.message;
        }
        return rays;
    }
}
