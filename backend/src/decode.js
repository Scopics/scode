'use strict';

const Crc = require('./crc');

function stabilize(rays) {
  if (rays.length % 4 !== 0)
    throw new Error('Something is wrong...');
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

function removeGuides(rays) {
  const raysCopy = [...rays];
  const sides = 4;
  const step = rays.length / sides;
  const guidesIndexes = Array.from(
    { length: sides }, (item, index) => step * index
  );

  guidesIndexes.reverse().forEach((index) => raysCopy.splice(index, 1));
  return raysCopy;
}

const getChunksOfString = (str, size) => {
  if (size <= 0)
    throw new Error('Invalid size value');
  const numChunks = Math.ceil(str.length / size);
  const chunks = new Array(numChunks);

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size);
  }
  return chunks;
};

const decodeHexInQueryParam = (scode, urlCodeLen) => {
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
  const asciChars = getChunksOfString(codeOfLink, asciiItemLen);
  const crc = new Crc(readoutСrcWidth);
  const generatedCrc = crc.calcCrc(asciChars);

  if (parseInt(readoutСrc, 16) !== generatedCrc) {
    throw new Error('Checksums CRC did not match');
  }

  const charCodes = asciChars.map((code) => parseInt(code, 16));
  const resQueryParam = String.fromCharCode(...charCodes);

  return resQueryParam;
};

const decodeDataFromImage = (lengthOfLines, urlCodeLen) => {
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
  const res = decodeHexInQueryParam(scodeHex, urlCodeLen);
  return res;
};

function getLink(rays, linkLen) {
  const asciiItemLen = 2;
  const scodeLen = linkLen * asciiItemLen;
  const stabilized = stabilize(rays);

  const raysCoded = removeGuides(stabilized);
  const result = decodeDataFromImage(raysCoded, scodeLen);
  return result;
}

module.exports = {
  stabilize,
  removeGuides,
  getChunksOfString,
  decodeHexInQueryParam,
  decodeDataFromImage,
  getLink,
};
