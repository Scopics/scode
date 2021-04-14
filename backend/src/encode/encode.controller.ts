import { Controller, Get, Post } from '@nestjs/common';
import { get } from 'node:http';

@Controller('encode')
export class EncodeController {
    @Post()
    create(): string{
        return "input";
    }

    @Get()
    findAll(): string{
        return "output";
    }
}
