import { Module } from '@nestjs/common';
import { CrcModule } from '../crc/crc.module';

@Module({})
export class EncodeModule {

    static getRays (link: string): number[] {
        const data = EncodeModule.hexGenerator(link);
        const crc16 = new CrcModule(16);
        const crc = crc16.calcCrc(data);
        const rays = data.join('') + crc.toString(16);
        const raysArr = [];
        const specialRays = [15, 15, 0, 15];
        let i = 0;
        while(i < rays.length+4) {
            if (i % 8 == 0) {
                raysArr[i] = specialRays[i/8];
                raysArr[i + 1] = parseInt(rays[i], 16);
                i+=2;
            } else {
                raysArr[i] = parseInt(rays[i], 16);
                i++;
            }
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