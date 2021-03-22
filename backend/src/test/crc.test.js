'use strict';
const CRC = require('../crc');

describe('Testing CRC', () => {
  test('Passes when constructor get valid crc width', () => {
    const crc16 = new CRC(16);
    const result = {
      castMask: crc16.castMask,
      polynom: crc16.polynom,
      initialVal: crc16.initialVal,
      finalXorVal: crc16.finalXorVal
    };
    const expectedResult = {
      castMask: 0xFFFF,
      polynom: 0x8005,
      initialVal: 0x0000,
      finalXorVal: 0x0000
    };
    expect(result).toEqual(expectedResult);
  });

  test('Fail when constructor get invalid crc width', () => {
    expect(() => new CRC(-1)).toThrowError('Invalid CRC width');
    expect(() => new CRC()).toThrowError('Invalid CRC width');
    expect(() => new CRC(10)).toThrowError('Invalid CRC width');
  });

  test('Passes when constructor get valid custom arguments', () => {
    const crc8 = new CRC(8, 0x09, 0xFF, 0xFF);
    const result = {
      castMask: crc8.castMask,
      polynom: crc8.polynom,
      initialVal: crc8.initialVal,
      finalXorVal: crc8.finalXorVal
    };
    const expectedResult = {
      castMask: 0xFF,
      polynom: 0x09,
      initialVal: 0xFF,
      finalXorVal: 0xFF
    };
    expect(result).toEqual(expectedResult);
  });

  test('Fail when constructor get invalid custom arguments', () => {
    expect(() => new CRC(8, 0x07, 0x00))
      .toThrowError('Invalid arguments');
    expect(() => new CRC(8, 'bad', 'bad', 'bad'))
      .toThrowError('Invalid arguments');
  });

  test('Passes when calcCrc get valid array', () => {
    const crc16 = new CRC(16);
    const data = ['68', '65', '6c', '6c', '6f'];
    const result = crc16.calcCrc(data);
    const expectedResult = '38c5';
    expect(result.toString(16)).toBe(expectedResult);
  });

  test('Passes when calcCrc get not an array', () => {
    const crc16 = new CRC(16);
    expect(() => crc16.calcCrc(false)).toThrowError('It\'s not an array');
    expect(() => crc16.calcCrc(12345)).toThrowError('It\'s not an array');
    expect(() => crc16.calcCrc(null)).toThrowError('It\'s not an array');
    expect(() => crc16.calcCrc({ one: '68', two: '65', three: '6c' }))
      .toThrowError('It\'s not an array');
  });

  test('Fail when calcCrc get no argument or empty array', () => {
    const crc16 = new CRC(16);
    expect(() => crc16.calcCrc()).toThrowError('It\'s not an array');
    expect(() => crc16.calcCrc([])).toThrowError('It\'s not an array');
  });

  test('Passes calcCrc for crc8', () => {
    const crc16 = new CRC(8);
    const data = ['61', '56', '67', '6c', '6f', '68', '65'];
    const result = crc16.calcCrc(data);
    const expectedResult = 'fe';
    expect(result.toString(16)).toBe(expectedResult);
  });

  test('Passes when calcCrc for crc16', () => {
    const crc16 = new CRC(16);
    const data = ['61', '56', '67', '6c', '6f', '68', '65'];
    const result = crc16.calcCrc(data);
    const expectedResult = '612d';
    expect(result.toString(16)).toBe(expectedResult);
  });

  test('Passes when calcCrc for crc32', () => {
    const crc16 = new CRC(32);
    const data = ['68', '65', '6c', '6c', '6f'];
    const result = crc16.calcCrc(data);
    const expectedResult = '6b1584d5';
    expect(result.toString(16)).toBe(expectedResult);
  });

  test('Passes when calcCrc for custom params', () => {
    const polynom = 0x3d65;
    const initialVal = 0x0000;
    const finalXorVal = 0xFFFF;
    const crc16 = new CRC(16, polynom, initialVal, finalXorVal);
    const data = ['68', '65', '6c', '6c', '6f'];
    const result = crc16.calcCrc(data);
    const expectedResult = '7c3c';
    expect(result.toString(16)).toBe(expectedResult);
  });

  test('mocking createCrcTable check times called', () => {
    const width = 16;
    const crcMock = jest.spyOn(CRC.prototype, 'createCrcTable');
    const crc16 = new CRC(width);
    const data = ['68', '65', '6c', '6c', '6f'];
    const result = crc16.calcCrc(data);
    expect(crcMock).toHaveBeenCalledTimes(1);
  });

  test('mocking createCrcTable check argument', () => {
    const width = 8;
    const crcMock = jest.spyOn(CRC.prototype, 'createCrcTable');
    const crc8 = new CRC(width);
    expect(crcMock).toHaveBeenCalledWith(width);
  });

});

