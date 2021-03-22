'use strict';

const {
  decodeHexInQueryParam,
  decodeDataFromImage,
  removeGuides,
  getLink,
} = require('./../src/decode');

const { codeASCII, codeItemASCII } = require('./../src/utils');

describe('Testing removeGuides', () => {
  test('Passes when pass valid parameters', () => {
    const rays = [1, 5, 10, 15, 2, 5, 14, 12, 1, 9, 5, 11, 10, 7, 3, 5];
    const result = removeGuides(rays);
    const expectedResult = [5, 10, 15, 5, 14, 12, 9, 5, 11, 7, 3, 5];
    expect(result).toEqual(expectedResult);
  });

  test('Fails when pass array length that is not divisable by 4', () => {
    const rays = [1, 5, 10, 15, 2, 5, 14, 12, 1, 9, 5, 11, 10, 7, 3, 5, 10];
    expect(() => {
      removeGuides(rays);
    }).toThrowError('Invalid array length');
  });

  test('Fails when pass empty array', () => {
    const rays = [];
    expect(() => {
      removeGuides(rays);
    }).toThrowError('Array is empty or it is not an array');
  });

  test('Fails when pass not an array', () => {
    const rays = { key1: value1 };
    expect(() => {
      removeGuides(rays);
    }).toThrowError('Array is empty or it is not an array');
  });

  test('Fails when pass a string', () => {
    const rays = '01230123012301230123';
    expect(() => {
      removeGuides(rays);
    }).toThrowError('Array is empty or it is not an array');
  });

  test('Fails when pass not an array but with symbol.iterator', () => {
    const rays = {name: 'Trojan horse',
    [Symbol.iterator]: function*(){
      yield 1;
      yield 2;
      yield 3;
    }
    };
    expect(() => {
      removeGuides(rays);
    }).toThrowError('Array is empty or it is not an array');
  });


});

describe('Testing codeItemASCII', () => {
  test('Passes when pass valid parameters', () => {
    const char = 'a';
    const result = codeItemASCII(char);
    const expectedResult = '61';
    expect(result).toEqual(expectedResult);
  });

  test('Fails when pass a number', () => {
    const char = 1;
    expect(() => {
      codeItemASCII(char);
    }).toThrowError('Argument is not a char');
  });

  test('Fails when pass an array', () => {
    const char = ['a', 'b', 'c'];
    expect(() => {
      codeItemASCII(char);
    }).toThrowError('Argument is not a char');
  });

  test('Fails when pass not a char but with charCode key', () => {
    const char = { charCodeAt: () => 5 };
    expect(() => {
      codeItemASCII(char);
    }).toThrowError('Argument is not a char');
  });

  test('Fails when pass empty string', () => {
    const char = '';
    expect(() => {
      codeItemASCII(char);
    }).toThrowError('Argument is not a char');
  });
});

describe('Testing getLink', () => {
  test('Passes when pass valid parameters', () => {
    const arr = [
    15, 6, 3, 7, 3, 5, 0, 3,
    15, 3, 6, 10, 6, 11, 5, 3,
    0, 7, 2, 5, 7, 4, 12, 3,
    15, 4, 13, 6, 10, 6, 15, 10
    ];
    const linkLen = 11;
    const result = getLink(arr, linkLen);
    const expectedResult = 'csP3jkSrWL4';
    expect(result).toEqual(expectedResult);
  });

  test('Passes when pass valid parameters with offset: 5', () => {
    const arr = [
    6, 10, 6, 15, 10, 15,
    6, 3, 7, 3, 5, 0, 3, 15,
    3, 6, 10, 6, 11, 5, 3, 0,
    7, 2, 5, 7, 4, 12, 3, 15,
    4, 13
    ];
    const linkLen = 11;
    const result = getLink(arr, linkLen);
    const expectedResult = 'csP3jkSrWL4';
    expect(result).toEqual(expectedResult);
  });

  test('Fails when link length is wrong', () => {
    const arr = [
    6, 10, 6, 15, 10, 15,
    6, 3, 7, 3, 5, 0, 3, 15,
    3, 6, 10, 6, 11, 5, 3, 0,
    7, 2, 5, 7, 4, 12, 3, 15,
    4, 13
    ];
    const linkLen = 12;
    expect(() => {
      getLink(arr, linkLen);
    }).toThrowError('Checksums CRC did not match');
  });

  test('Fails when array length is not divisable by 4', () => {
    const arr = [
    6, 10, 6, 15, 10, 15,
    6, 3, 7, 3, 5, 0, 3, 15,
    3, 6, 10, 6, 11, 5, 3, 0,
    7, 2, 5, 7, 4, 12, 3, 15,
    4, 13, 14
    ];
    const linkLen = 12;
    expect(() => {
      getLink(arr, linkLen);
    }).toThrowError('Wrong array length');
  });

  test('Fails when pass an empty array', () => {
    const arr = [];
    const linkLen = 11;
    expect(() => {
      getLink(arr, linkLen);
    }).toThrowError('Array is empty or it is not an array');
  });

  test('Fails when pass not an array', () => {
    const arr = { key1: 'value1'};
    const linkLen = 11;
    expect(() => {
      getLink(arr, linkLen);
    }).toThrowError('Array is empty or it is not an array');
  });

  test('Fails when pass wrong link length', () => {
    const arr = [
        6, 10, 6, 15, 10, 15,
        6, 3, 7, 3, 5, 0, 3, 15,
        3, 6, 10, 6, 11, 5, 3, 0,
        7, 2, 5, 7, 4, 12, 3, 15,
        4, 13
        ];
    const linkLen = { key1: 'value1' };
    expect(() => {
      getLink(arr, linkLen);
    }).toThrowError('Link length is invalid');
  });

});
