'use strict';

//const Decode = require('../decode');
import { DecodeModule } from '../decode/decode.module';
const {
  stabilize,
  removeGuides,
  getChunksOfString,
  decodeHexInQueryParam,
  decodeDataFromImage,
  getLink,
} = DecodeModule;

describe('Testing stabilize', () => {
  test('Passes when rays in right order', () => {
    const rays = [
      15,
      6,
      3,
      7,
      3,
      5,
      0,
      3,
      15,
      3,
      6,
      10,
      6,
      11,
      5,
      3,
      0,
      7,
      2,
      5,
      7,
      4,
      12,
      3,
      15,
      4,
      13,
      6,
      10,
      6,
      15,
      10,
    ];
    const expected = [
      15,
      6,
      3,
      7,
      3,
      5,
      0,
      3,
      15,
      3,
      6,
      10,
      6,
      11,
      5,
      3,
      0,
      7,
      2,
      5,
      7,
      4,
      12,
      3,
      15,
      4,
      13,
      6,
      10,
      6,
      15,
      10,
    ];
    expect(stabilize(rays)).toEqual(expect.arrayContaining(expected));
  });

  test('Passes when rays offset is 2', () => {
    const rays = [
      15,
      10,
      15,
      6,
      3,
      7,
      3,
      5,
      0,
      3,
      15,
      3,
      6,
      10,
      6,
      11,
      5,
      3,
      0,
      7,
      2,
      5,
      7,
      4,
      12,
      3,
      15,
      4,
      13,
      6,
      10,
      6,
    ];
    const expected = [
      15,
      6,
      3,
      7,
      3,
      5,
      0,
      3,
      15,
      3,
      6,
      10,
      6,
      11,
      5,
      3,
      0,
      7,
      2,
      5,
      7,
      4,
      12,
      3,
      15,
      4,
      13,
      6,
      10,
      6,
      15,
      10,
    ];
    expect(stabilize(rays)).toEqual(expect.arrayContaining(expected));
  });

  test('Passes when rays offset is 10', () => {
    const rays = [
      12,
      3,
      15,
      4,
      13,
      6,
      10,
      6,
      15,
      10,
      15,
      6,
      3,
      7,
      3,
      5,
      0,
      3,
      15,
      3,
      6,
      10,
      6,
      11,
      5,
      3,
      0,
      7,
      2,
      5,
      7,
      4,
    ];
    const expected = [
      15,
      6,
      3,
      7,
      3,
      5,
      0,
      3,
      15,
      3,
      6,
      10,
      6,
      11,
      5,
      3,
      0,
      7,
      2,
      5,
      7,
      4,
      12,
      3,
      15,
      4,
      13,
      6,
      10,
      6,
      15,
      10,
    ];
    expect(stabilize(rays)).toEqual(expect.arrayContaining(expected));
  });
  test('Passes when rays offset is 18', () => {
    const rays = [
      5,
      3,
      0,
      7,
      2,
      5,
      7,
      4,
      12,
      3,
      15,
      4,
      13,
      6,
      10,
      6,
      15,
      10,
      15,
      6,
      3,
      7,
      3,
      5,
      0,
      3,
      15,
      3,
      6,
      10,
      6,
      11,
    ];
    const expected = [
      15,
      6,
      3,
      7,
      3,
      5,
      0,
      3,
      15,
      3,
      6,
      10,
      6,
      11,
      5,
      3,
      0,
      7,
      2,
      5,
      7,
      4,
      12,
      3,
      15,
      4,
      13,
      6,
      10,
      6,
      15,
      10,
    ];
    expect(stabilize(rays)).toEqual(expect.arrayContaining(expected));
  });

  test('Passes when rays offset is 31', () => {
    const rays = [
      6,
      3,
      7,
      3,
      5,
      0,
      3,
      15,
      3,
      6,
      10,
      6,
      11,
      5,
      3,
      0,
      7,
      2,
      5,
      7,
      4,
      12,
      3,
      15,
      4,
      13,
      6,
      10,
      6,
      15,
      10,
      15,
    ];
    const expected = [
      15,
      6,
      3,
      7,
      3,
      5,
      0,
      3,
      15,
      3,
      6,
      10,
      6,
      11,
      5,
      3,
      0,
      7,
      2,
      5,
      7,
      4,
      12,
      3,
      15,
      4,
      13,
      6,
      10,
      6,
      15,
      10,
    ];
    expect(stabilize(rays)).toEqual(expect.arrayContaining(expected));
  });

  test('Fails when empty array of rays', () => {
    const rays = [];
    const expected = new Error('Something is wrong...');
    expect(() => stabilize(rays)).toThrowError(expected);
  });

  test('Fails when rays filled with items of same length', () => {
    const rays = [
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
      15,
    ];
    const expected = new Error('Something is wrong...');
    expect(() => stabilize(rays)).toThrowError(expected);
  });

  test('Fails when rays are not divided by 4', () => {
    const rays = [
      15,
      10,
      15,
      6,
      3,
      7,
      3,
      5,
      0,
      3,
      15,
      3,
      6,
      10,
      6,
      11,
      5,
      3,
      0,
      7,
      2,
      5,
      7,
      4,
      12,
      3,
      15,
      4,
      13,
      6,
      10,
    ];
    const expected = new Error('Invalid array length');
    expect(() => stabilize(rays)).toThrowError(expected);
  });
});

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

  // test('Fails when pass not an array', () => {
  //   const rays = { key1: 'value1' };
  //   expect(() => {
  //     removeGuides(rays);
  //   }).toThrowError('Array is empty or it is not an array');
  // });

  // test('Fails when pass a string', () => {
  //   const rays = '01230123012301230123';
  //   expect(() => {
  //     removeGuides(rays);
  //   }).toThrowError('Array is empty or it is not an array');
  // });

  //   test('Fails when pass not an array but with symbol.iterator', () => {
  //     const rays = {
  //       name: 'Trojan horse',
  //       length: 100,
  //       [Symbol.iterator]: function*(){
  //         yield 1;
  //         yield 2;
  //         yield 3;
  //       }
  //     };
  //     expect(() => {
  //       removeGuides(rays);
  //     }).toThrowError('Array is empty or it is not an array');
  //   });
});

describe('Testing getChunksOfString', () => {
  test('Passes when string is divided into two-len items', () => {
    const str = 'qwertytrewq';
    const size = 2;
    const expected = ['qw', 'er', 'ty', 'tr', 'ew', 'q'];
    expect(getChunksOfString(str, size)).toEqual(
      expect.arrayContaining(expected),
    );
  });

  test('Passes when string is divided into four-len items', () => {
    const str = 'qwertytrewq';
    const size = 4;
    const expected = ['qwer', 'tytr', 'ewq'];
    expect(getChunksOfString(str, size)).toEqual(
      expect.arrayContaining(expected),
    );
  });

  test('Passes when size is bigger than str length', () => {
    const str = 'qwertytrewq';
    const size = 100;
    const expected = ['qwertytrewq'];
    expect(getChunksOfString(str, size)).toEqual(
      expect.arrayContaining(expected),
    );
  });

  test('Fails when size is 0', () => {
    const str = 'qwertytrewq';
    const size = 0;
    const expected = new Error('Invalid size value');
    expect(() => getChunksOfString(str, size)).toThrowError(expected);
  });

  test('Fails when size is less than 0', () => {
    const str = 'qwertytrewq';
    const size = -1;
    const expected = new Error('Invalid size value');
    expect(() => getChunksOfString(str, size)).toThrowError(expected);
  });

  test('Fails when string is empty', () => {
    const str = '';
    const size = 3;
    const expected = new Error('Wrong str length');
    expect(() => getChunksOfString(str, size)).toThrowError(expected);
  });
});

describe('Testing decodeHexInQueryParam', () => {
  test('Passes when valid parameters transfer with 32 bit crc', () => {
    const codedQueryParam = '43555534396a6a486c6f4d1584d5ff';
    const lenOfcodeOfQueryParam = 22;
    const result = decodeHexInQueryParam(
      codedQueryParam,
      lenOfcodeOfQueryParam,
    );

    const expectedResult = 'CUU49jjHloM';
    expect(result).toBe(expectedResult);
  });

  test('Passes when valid parameters transfer with 16 bit crc', () => {
    const codedQueryParam = '43555534396a6a486c6f4df6c6';
    const lenOfcodeOfQueryParam = 22;
    const result = decodeHexInQueryParam(
      codedQueryParam,
      lenOfcodeOfQueryParam,
    );

    const expectedResult = 'CUU49jjHloM';
    expect(result).toBe(expectedResult);
  });

  test('Passes when valid parameters transfer with 8 bit crc', () => {
    const codedQueryParam = '43555534396a6a486c6f4d5f';
    const lenOfcodeOfQueryParam = 22;
    const result = decodeHexInQueryParam(
      codedQueryParam,
      lenOfcodeOfQueryParam,
    );

    const expectedResult = 'CUU49jjHloM';
    expect(result).toBe(expectedResult);
  });

  test('Passes when pass a string with a length less than the checksum', () => {
    const codedQueryParam = '68697170';
    const lenOfcodeOfQueryParam = 4;
    const result = decodeHexInQueryParam(
      codedQueryParam,
      lenOfcodeOfQueryParam,
    );

    const expectedResult = 'hi';
    expect(result).toBe(expectedResult);
  });

  test('Fail when pass an empty string', () => {
    const codedQueryParam = '';
    const lenOfcodeOfQueryParam = 0;

    expect(() => {
      decodeHexInQueryParam(codedQueryParam, lenOfcodeOfQueryParam);
    }).toThrowError('The code is wrong');
  });

  test('Fail when pass code length of encoded characters longer than allowed', () => {
    const codedQueryParam = '43555534396a6a486c6f4d5f';
    const lenOfcodeOfQueryParam = 100;

    expect(() => {
      decodeHexInQueryParam(codedQueryParam, lenOfcodeOfQueryParam);
    }).toThrowError('The code is wrong');
  });

  test('Fail when pass a code with a crc not a multiple of 8 bits', () => {
    const codedQueryParam = '43555534396a6a486c6f4d5f2';
    const lenOfcodeOfQueryParam = 22;

    expect(() => {
      decodeHexInQueryParam(codedQueryParam, lenOfcodeOfQueryParam);
    }).toThrowError('Length of the crc sum is invalid');
  });

  test('Fail when pass a code with a crc more than 32 bits', () => {
    const codedQueryParam = '43555534396a6a486c6f4d5f123456789';
    const lenOfcodeOfQueryParam = 22;

    expect(() => {
      decodeHexInQueryParam(codedQueryParam, lenOfcodeOfQueryParam);
    }).toThrowError('Length of the crc sum is invalid');
  });

  test('Fail when pass the code with an invalid checksum', () => {
    const codedQueryParam = '43555534396a6a486c6f1234';
    const lenOfcodeOfQueryParam = 22;

    expect(() => {
      decodeHexInQueryParam(codedQueryParam, lenOfcodeOfQueryParam);
    }).toThrowError('Checksums CRC did not match');
  });

  test('mocking getChunksOfString check times called in decodeHexInQueryParam', () => {
    const getChunksOfStringMock = jest.spyOn(DecodeModule, 'getChunksOfString');

    const codedQueryParam = '43555534396a6a486c6f4df6c6';
    const lenOfcodeOfQueryParam = 22;
    const result = decodeHexInQueryParam(
      codedQueryParam,
      lenOfcodeOfQueryParam,
    );

    expect(getChunksOfStringMock).toHaveBeenCalledTimes(1);
  });
});

describe('Testing decodeDataFromImage', () => {
  test('Passes when pass valid parameters', () => {
    const lengthOfLines = [
      7,
      4,
      5,
      2,
      3,
      9,
      7,
      9,
      5,
      15,
      3,
      3,
      3,
      1,
      6,
      10,
      3,
      9,
      3,
      1,
      7,
      7,
      12,
      5,
      3,
      0,
      15,
      10,
    ];
    const lenOfcodeOfQueryParam = 22;
    const result = decodeDataFromImage(lengthOfLines, lenOfcodeOfQueryParam);

    const expectedResult = 'tR9y_31j91w';
    expect(result).toBe(expectedResult);
  });

  test('Fail when pass empty array / anything other than an array', () => {
    const lengthOfLines1 = [];
    // const lengthOfLines2 = { key1: 'value1' };
    const lenOfcodeOfQueryParam = 22;

    expect(() => {
      decodeDataFromImage(lengthOfLines1, lenOfcodeOfQueryParam);
    }).toThrowError('Array of lengths is empty or it is not an array');
    // expect(() => {
    //   decodeDataFromImage(lengthOfLines2, lenOfcodeOfQueryParam);
    // }).toThrowError('Array of lengths is empty or it is not an array');
  });

  test("Fail when the two lengths of the last rays of the non-constant value 'fa'", () => {
    const lengthOfLines = [
      7,
      4,
      5,
      2,
      3,
      9,
      7,
      9,
      5,
      15,
      3,
      3,
      3,
      1,
      6,
      10,
      3,
      9,
      3,
      1,
      7,
      7,
      12,
      5,
      3,
      0,
      12,
      11,
    ];
    const lenOfcodeOfQueryParam = 22;

    expect(() => {
      decodeDataFromImage(lengthOfLines, lenOfcodeOfQueryParam);
    }).toThrowError('The code reading was not correct');
  });

  test('mocking decodeHexInQueryParam check times called in decodeDataFromImage', () => {
    const decodeHexInQueryParamMock = jest.spyOn(
      DecodeModule,
      'decodeHexInQueryParam',
    );
    const lengthOfLines = [
      7,
      4,
      5,
      2,
      3,
      9,
      7,
      9,
      5,
      15,
      3,
      3,
      3,
      1,
      6,
      10,
      3,
      9,
      3,
      1,
      7,
      7,
      12,
      5,
      3,
      0,
      15,
      10,
    ];
    const lenOfcodeOfQueryParam = 22;
    const result = decodeDataFromImage(lengthOfLines, lenOfcodeOfQueryParam);

    expect(decodeHexInQueryParamMock).toHaveBeenCalledTimes(1);
  });
});

describe('Testing getLink', () => {
  test('Passes when pass valid parameters', () => {
    const arr = [
      15,
      6,
      3,
      7,
      3,
      5,
      0,
      3,
      15,
      3,
      6,
      10,
      6,
      11,
      5,
      3,
      0,
      7,
      2,
      5,
      7,
      4,
      12,
      3,
      15,
      4,
      13,
      6,
      10,
      6,
      15,
      10,
    ];
    const linkLen = 11;
    const result = getLink(arr, linkLen);
    const expectedResult = 'csP3jkSrWL4';
    expect(result).toEqual(expectedResult);
  });

  test('Passes when pass valid parameters with offset: 5', () => {
    const arr = [
      6,
      10,
      6,
      15,
      10,
      15,
      6,
      3,
      7,
      3,
      5,
      0,
      3,
      15,
      3,
      6,
      10,
      6,
      11,
      5,
      3,
      0,
      7,
      2,
      5,
      7,
      4,
      12,
      3,
      15,
      4,
      13,
    ];
    const linkLen = 11;
    const result = getLink(arr, linkLen);
    const expectedResult = 'csP3jkSrWL4';
    expect(result).toEqual(expectedResult);
  });

  test('Fails when link length is wrong', () => {
    const arr = [
      6,
      10,
      6,
      15,
      10,
      15,
      6,
      3,
      7,
      3,
      5,
      0,
      3,
      15,
      3,
      6,
      10,
      6,
      11,
      5,
      3,
      0,
      7,
      2,
      5,
      7,
      4,
      12,
      3,
      15,
      4,
      13,
    ];
    const linkLen = 12;
    expect(() => {
      getLink(arr, linkLen);
    }).toThrowError('Checksums CRC did not match');
  });

  test('Fails when array length is not divisable by 4', () => {
    const arr = [
      6,
      10,
      6,
      15,
      10,
      15,
      6,
      3,
      7,
      3,
      5,
      0,
      3,
      15,
      3,
      6,
      10,
      6,
      11,
      5,
      3,
      0,
      7,
      2,
      5,
      7,
      4,
      12,
      3,
      15,
      4,
      13,
      14,
    ];
    const linkLen = 12;
    expect(() => {
      getLink(arr, linkLen);
    }).toThrowError('Invalid array length');
  });

  test('Fails when pass an empty array', () => {
    const arr = [];
    const linkLen = 11;
    expect(() => {
      getLink(arr, linkLen);
    }).toThrowError('Array is empty or it is not an array');
  });

  // test('Fails when pass not an array', () => {
  //   const arr = { key1: 'value1'};
  //   const linkLen = 11;
  //   expect(() => {
  //     getLink(arr, linkLen);
  //   }).toThrowError('Array is empty or it is not an array');
  // });

  test('Fails when pass wrong link length', () => {
    const arr = [
      6,
      10,
      6,
      15,
      10,
      15,
      6,
      3,
      7,
      3,
      5,
      0,
      3,
      15,
      3,
      6,
      10,
      6,
      11,
      5,
      3,
      0,
      7,
      2,
      5,
      7,
      4,
      12,
      3,
      15,
      4,
      13,
    ];
    const linkLen = -1;
    expect(() => {
      getLink(arr, linkLen);
    }).toThrowError('Invalid link length');
  });

  // test('Fails when pass link length that is not a number', () => {
  //   const arr = [
  //       6, 10, 6, 15, 10, 15,
  //       6, 3, 7, 3, 5, 0, 3, 15,
  //       3, 6, 10, 6, 11, 5, 3, 0,
  //       7, 2, 5, 7, 4, 12, 3, 15,
  //       4, 13
  //       ];
  //   const linkLen = { key1: 'value1' };
  //   expect(() => {
  //     getLink(arr, linkLen);
  //   }).toThrowError('Invalid link length');
  // });

  test('Mocking stabilize. Check times called in getLink', () => {
    const stabilizeMock = jest.spyOn(DecodeModule, 'stabilize');
    const arr = [
      15,
      6,
      3,
      7,
      3,
      5,
      0,
      3,
      15,
      3,
      6,
      10,
      6,
      11,
      5,
      3,
      0,
      7,
      2,
      5,
      7,
      4,
      12,
      3,
      15,
      4,
      13,
      6,
      10,
      6,
      15,
      10,
    ];
    const linkLen = 11;
    getLink(arr, linkLen);
    expect(stabilizeMock).toHaveBeenCalledTimes(1);
  });

  test('mocking removeGuides check times called in getLink', () => {
    const removeGuidesMock = jest.spyOn(DecodeModule, 'removeGuides');

    const rays = [
      15,
      6,
      3,
      7,
      3,
      5,
      0,
      3,
      15,
      3,
      6,
      10,
      6,
      11,
      5,
      3,
      0,
      7,
      2,
      5,
      7,
      4,
      12,
      3,
      15,
      4,
      13,
      6,
      10,
      6,
      15,
      10,
    ];
    const linkLen = 11;
    const result = getLink(rays, linkLen);

    expect(removeGuidesMock).toHaveBeenCalledTimes(1);
  });

  test('mocking decodeDataFromImage check times called in getLink', () => {
    const decodeDataFromImageMock = jest.spyOn(
      DecodeModule,
      'decodeDataFromImage',
    );

    const rays = [
      15,
      6,
      3,
      7,
      3,
      5,
      0,
      3,
      15,
      3,
      6,
      10,
      6,
      11,
      5,
      3,
      0,
      7,
      2,
      5,
      7,
      4,
      12,
      3,
      15,
      4,
      13,
      6,
      10,
      6,
      15,
      10,
    ];
    const linkLen = 11;
    const result = getLink(rays, linkLen);

    expect(decodeDataFromImageMock).toHaveBeenCalledTimes(1);
  });
});
