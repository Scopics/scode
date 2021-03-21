'use strict'

const createCrcTable = function (width, castMask, polynom) {
  const msbMask = 0x01 << (width - 1);
  const crcTable = new Array(256);

  for (let i = 0; i < 256; i++) {
    let byte = (i << (width - 8));
    for (let bit = 0; bit < 8; bit++) {
      if (byte & msbMask) {
        byte <<= 1;
        byte ^= polynom;
      } else {
        byte <<= 1;
      }
    }
    crcTable[i] = (byte & castMask);
  }
  return crcTable;
}

const getCrc = (width) => {
  let castMask, polynom, initialVal, finalXorVal;
  switch (width) {
    case 8:
      castMask = 0xFF;
      polynom = 0x07;
      initialVal = 0x00;
      finalXorVal = 0x00;
      break;
    case 16:
      castMask = 0xFFFF;
      polynom = 0x8005;
      initialVal = 0x0000;
      finalXorVal = 0x0000;
      break;
    case 32:
      castMask = 0xFFFFFFFF;
      polynom = 0x04C11DB7;
      initialVal = 0xFFFFFFFF;
      finalXorVal = 0xFFFFFFFF;
      break;
    default:
      throw "Invalid CRC width";
      break;
  }
  this.table = createCrcTable(width, castMask, polynom);

  return (bytes) => {
    let crc = initialVal;
    for (let b of bytes) {
      const byte = parseInt(b, 16);
      crc ^= (byte << (width - 8));
      const pos = (crc >> (width - 8));
      crc = ((crc << 8) ^ table[pos]) & castMask;
    }
    return (crc ^ finalXorVal);
  }
}

module.exports = getCrc;
