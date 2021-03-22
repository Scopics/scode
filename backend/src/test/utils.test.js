'use strict';

const { codeItemASCII } = require('./../src/utils');

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
  
