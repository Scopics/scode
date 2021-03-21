'use strict';

function codeItemASCII(item = '') {
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
