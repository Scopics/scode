'use strict';


class CRC {

  width: number;
  castMask: number;
  polynom: number;
  initialVal: number;
  finalXorVal: number;
  table: number[];

  constructor(width, ...params) {

    // width: [castMask, polynom, initialVal, finalXorVal]
    const crcParamsByWidth = {
      '8': [0xFF, 0x07, 0x00, 0x00],
      '16': [0xFFFF, 0x8005, 0x0000, 0x0000],
      '32': [0xFFFFFFFF, 0x04C11DB7, 0xFFFFFFFF, 0xFFFFFFFF]
    };

    this.width = width;
    const paramsByWidth = crcParamsByWidth[width];
    if (paramsByWidth) {
      [this.castMask, this.polynom, this.initialVal, this.finalXorVal] = paramsByWidth;
    } else {
      throw 'Invalid CRC width';
    }

    if (arguments.length === 4) {
      [this.polynom,
        this.initialVal,
        this.finalXorVal] = params;
    } else if (arguments.length !== 1) {
      throw 'Invalid arguments';
    }

    if (!Number.isInteger(this.polynom) ||
      !Number.isInteger(this.initialVal) ||
      !Number.isInteger(this.finalXorVal))
      throw 'Invalid arguments';

    this.table = this.createCrcTable(width);

  }

  createCrcTable(width) {
    const msbMask = 0x01 << (width - 1);
    const table = new Array(256);

    for (let i = 0; i < 256; i++) {
      let byte = (i << (width - 8));
      for (let bit = 0; bit < 8; bit++) {
        if (byte & msbMask) {
          byte <<= 1;
          byte ^= this.polynom;
        } else {
          byte <<= 1;
        }
      }
      table[i] = (byte & this.castMask);
    }
    return table;
  }


  calcCrc(bytes) {
    if (!Array.isArray(bytes) || bytes.length === 0)
      throw 'It\'s not an array or empty array';
    let result = this.initialVal;
    for (const b of bytes) {
      const byte = parseInt(b, 16);
      result ^= (byte << (this.width - 8));
      const pos = (result >> (this.width - 8));
      result = ((result << 8) ^ this.table[pos]) & this.castMask;
    }
    return (result ^ this.finalXorVal);
  }

}

module.exports = CRC;
