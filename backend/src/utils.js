'use strict';

const Utils = {};

Utils.codeItemASCII = function (item = '') {
  if(item.length === 0 || typeof item !== 'string') throw new Error('Argument is not a char');
  return item.charCodeAt().toString(16);
}

Utils.codeASCII  = function (text) {
  let dataToDecoding = text;
  if (Array.isArray(text)) dataToDecoding = text.join('');
  return dataToDecoding
    .toString()
    .split('')
    .map(item => Utils.codeItemASCII(item));
}

module.exports = Utils;
