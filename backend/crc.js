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

const crcParamsByWidth = {
  '8': [0xFF, 0x07, 0x00, 0x00],
  '16': [0xFFFF, 0x8005, 0x0000, 0x0000],
  '32': [0xFFFFFFFF, 0x04C11DB7, 0xFFFFFFFF, 0xFFFFFFFF]
}

const partial = (fn, ...args) => (...rest) => fn(...args, ...rest);

const getCrcByConfig = (crcConfig, width) => {
  let castMask, polynom, initialVal, finalXorVal;
  const paramsByWidth = crcConfig[width];
  if (paramsByWidth) {
    [ castMask, polynom, initialVal, finalXorVal ] = paramsByWidth;
  } else {
    throw 'Invalid CRC width';
  }
  
  const table = createCrcTable(width, castMask, polynom);
  

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
const getCrc = partial(getCrcByConfig, crcParamsByWidth);

module.exports = getCrc;
