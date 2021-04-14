'use strict';

const Utils = {

  codeItemASCII: function(item: string): string{
    if(item.length === 0 || typeof item !== 'string') throw new Error('Argument is not a char');
    return item.charCodeAt(0).toString(16);
  },

  codeASCII: function(text: string): string[] {
    let dataToDecoding = text;
    if (Array.isArray(text)) dataToDecoding = text.join('');
    return dataToDecoding
      .toString()
      .split('')
      .map(item => Utils.codeItemASCII(item));
  }

};

module.exports = Utils;
