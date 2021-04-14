import { Module } from '@nestjs/common';
import { CrcModule } from '../crc/crc.module';

@Module({})
export class EncodeModule {

    static getRays (link: string): number[] {
        const data = EncodeModule.hexGenerator(link);
        const crc16 = new CrcModule(16);
        const crc = crc16.calcCrc(data);
        const rays = data.join('') + crc.toString(16) + 'fa';
        const raysArr = [];
        const specialRays = [15, 15, 0, 15];
        const iterator = rays.length / 4;
        for (let i = 0; i < rays.length; i++) {
            if (i % iterator == 0) {
                raysArr.push(specialRays[i / iterator]);
                raysArr.push(parseInt(rays[i], 16));
            } else raysArr.push(parseInt(rays[i], 16));
        }
        return raysArr;
    }

    static hexGenerator (link: string, options = { linkSeparator: '=' }): string[] {
        const indx = link.indexOf(options.linkSeparator);
        const videoCode = link.slice(indx + 1);
        const res = [];
        for (let i = 0; i < videoCode.length; i++) {
            res[i] = videoCode.charCodeAt(i).toString(16);
        }
        return res;
    };
}