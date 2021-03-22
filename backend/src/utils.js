'use strict';

function codeItemASCII(item = '') {
  if(item.length === 0) throw new Error('This is not a char');
  return item.charCodeAt().toString(16);
}

function codeASCII(text) {
  let dataToDecoding = text;
  if (Array.isArray(text)) dataToDecoding = text.join('');
  return dataToDecoding
    .toString()
    .split('')
    .map(item => codeItemASCII(item));
}

module.exports = { codeItemASCII, codeASCII };
