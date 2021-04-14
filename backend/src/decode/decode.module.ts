import { Module } from '@nestjs/common';
import { AppModule } from '../app.module';
import { CrcModule } from '../crc/crc.module';

@Module({})
export class DecodeModule {

    static stabilize(rays: number[]): number[] {
        if (rays.length % 4 !== 0)
          throw new Error('Invalid array length');
        const len = rays.length;
        const sides = 4;
        const step = len / sides;
      
        let startFound = false;
        let iterator = 0;
        const neededLen = [15, 15, 0, 15];
      
        while (!startFound && iterator < len) {
          let correct = true;
      
          neededLen.forEach((item, i) => {
            const ind = (iterator + (step * i)) % len;
            if (item !== rays[ind]) {
              correct = false;
            }
          });
      
          if (correct) {
            startFound = true;
          } else {
            iterator++;
          }
        }
      
        if (!startFound)
          throw new Error('Something is wrong...');
      
        const stabilized = rays.slice(iterator).concat(rays.slice(0, iterator));
        return stabilized;
      }
    
    static removeGuides(rays: number[]): number[] {
        if (!(rays.length > 0) || !Array.isArray(rays))
          throw new Error('Array is empty or it is not an array');
        if (rays.length % 4 !== 0)
          throw new Error('Invalid array length');
        const raysCopy = [...rays];
        const sides = 4;
        const step = rays.length / sides;
        const guidesIndexes = Array.from(
          { length: sides }, (item, index) => step * index
        );
      
        guidesIndexes.reverse().forEach((index) => raysCopy.splice(index, 1));
        return raysCopy;
      }
    
    static getChunksOfString = (str, size) => {
        if (!(size > 0))
          throw new Error('Invalid size value');
        if (str.length === 0)
          throw new Error('Wrong str length');
        const numChunks = Math.ceil(str.length / size);
        const chunks = new Array(numChunks);
      
        for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
          chunks[i] = str.substr(o, size);
        }
        return chunks;
      }
    
    static decodeHexInQueryParam = (scode, urlCodeLen) => {
        const scodeLen = scode.length;
      
        if (scodeLen < urlCodeLen || !scodeLen) {
          throw new Error('The code is wrong or empty');
        }
      
        const codeOfLink = scode.slice(0, urlCodeLen);
        const readoutСrc = scode.slice(urlCodeLen);
      
        const readoutСrcWidth = 4 * readoutСrc.length;
        if (readoutСrcWidth % 8 !== 0 ||
            readoutСrcWidth > 32) {
          throw new Error('Length of the crc sum is invalid')
        }
      
        const asciiItemLen = 2;
        const asciChars = DecodeModule.getChunksOfString(codeOfLink, asciiItemLen);
        const crc = new CrcModule(readoutСrcWidth);
        const generatedCrc = crc.calcCrc(asciChars);
      
        if (parseInt(readoutСrc, 16) !== generatedCrc) {
          throw new Error('Checksums CRC did not match');
        }
      
        const charCodes = asciChars.map((code) => parseInt(code, 16));
        const resQueryParam = String.fromCharCode(...charCodes);
      
        return resQueryParam;
    }
    
    static decodeDataFromImage = (lengthOfLines, urlCodeLen) => {
        const END_CODE = 'fa';
        const len = lengthOfLines.length;
        if (!len || !Array.isArray(lengthOfLines)) {
          throw new Error('Array of lengths is empty or it is not an array');
        }
      
        let scodeHex = '';
        for (const len of lengthOfLines) {
          scodeHex += len.toString(16);
        }
      
        if (scodeHex.slice(len - 2) !== END_CODE) {
          throw new Error('The code reading was not correct');
        }
      
        scodeHex = scodeHex.slice(0, len - 2);
        const res = DecodeModule.decodeHexInQueryParam(scodeHex, urlCodeLen);
        return res;
    }
    
    static getLink(rays, linkLen) {
        if (!(rays.length > 0) || !Array.isArray(rays))
          throw new Error('Array is empty or it is not an array');
        if (!(linkLen > 0))
          throw new Error('Invalid link length');
        const asciiItemLen = 2;
        const scodeLen = linkLen * asciiItemLen;
        const stabilized = DecodeModule.stabilize(rays);
      
        const raysCoded = DecodeModule.removeGuides(stabilized);
        const result = DecodeModule.decodeDataFromImage(raysCoded, scodeLen);
        return result;
    }

}
