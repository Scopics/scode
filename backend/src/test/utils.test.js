'use strict';
const Utils = require('../utils');
const { codeItemASCII, codeASCII } = Utils;

describe('Testing codeItemASCII', () => {
  test('Passes when pass valid parameters', () => {
    const char = 'a';
    const result = codeItemASCII(char);
    const expectedResult = '61';
    expect(result).toEqual(expectedResult);
  });

  test('Passes when pass symbol', () => {
    const char = '_';
    const result = codeItemASCII(char);
    const expectedResult = '5f';
    expect(result).toEqual(expectedResult);
  });

  test('Fails when pass a number', () => {
    const char = 1;
    expect(() => {
      codeItemASCII(char);
    }).toThrowError('Argument is not a char');
  });

  test('Fails when pass anything not a char', () => {
    const char = {};
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
  

describe('Testing codeASCII', () => {
  test('Passes when pass valid parameters', () => {
    const text = '1<T';
    const result = codeASCII(text);
    
    const expectedResult = ['31', '3c', '54'];
    expect(result).toEqual(expectedResult);
  });

  test('Passes when pass emty string', () => {
    const text = '';
    const result = codeASCII(text);
    
    const expectedResult = [];
    expect(result).toEqual(expectedResult);
  });

  test('Passes when pass number', () => {
    const text = 9101;
    const result = codeASCII(text);
    
    const expectedResult = ['39', '31', '30', '31'];
    expect(result).toEqual(expectedResult);
  });

  test('Passes when pass array of strings', () => {
    const text = ['1', '<', 'T'];
    const result = codeASCII(text);
    
    const expectedResult = ['31', '3c', '54'];
    expect(result).toEqual(expectedResult);
  });

  test('Passes when pass array of nubmers', () => {
    const text = [ 9, 1, 0, 1];
    const result = codeASCII(text);
    
    const expectedResult = ['39', '31', '30', '31'];
    expect(result).toEqual(expectedResult);
  });

  test('Mocking codeItemASCII. Check times called in codeASCII', () => {
    const codeItemASCIIMock = jest.spyOn(Utils, 'codeItemASCII');
    const text = '1<T';
    const result = codeASCII(text);
    expect(codeItemASCIIMock).toHaveBeenCalledTimes(3);
  });
});
