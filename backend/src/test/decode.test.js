const {
  stabilize,
} = require('../decode');

describe('Testing stabilize', () => {
  test('Passes when rays in right order', () => {
    const rays = [ 
      15, 6, 3, 7, 3, 5, 0, 3, 
      15, 3, 6, 10, 6, 11, 5, 3, 
      0, 7, 2, 5, 7, 4, 12, 3, 
      15, 4, 13, 6, 10, 6, 15, 10,
    ];
    const expected = [ 
      15, 6, 3, 7, 3, 5, 0, 3, 
      15, 3, 6, 10, 6, 11, 5, 3, 
      0, 7, 2, 5, 7, 4, 12, 3, 
      15, 4, 13, 6, 10, 6, 15, 10,
    ];
    expect(stabilize(rays)).toEqual(expect.arrayContaining(expected));
  });
  
  test('Passes when rays offset is 2', () => {
    const rays = [ 
      15, 10, 15, 6, 3, 7, 3, 5, 
      0, 3, 15, 3, 6, 10, 6, 11, 
      5, 3, 0, 7, 2, 5, 7, 4, 
      12, 3, 15, 4, 13, 6, 10, 6,
    ];
    const expected = [ 
      15, 6, 3, 7, 3, 5, 0, 3, 
      15, 3, 6, 10, 6, 11, 5, 3, 
      0, 7, 2, 5, 7, 4, 12, 3, 
      15, 4, 13, 6, 10, 6, 15, 10, 
    ];
    expect(stabilize(rays)).toEqual(expect.arrayContaining(expected));
  });
  
  test('Passes when rays offset is 10', () => {
    const rays = [ 
      12, 3, 15, 4, 13, 6, 10, 6, 
      15, 10, 15, 6, 3, 7, 3, 5, 
      0, 3, 15, 3, 6, 10, 6, 11, 
      5, 3, 0, 7, 2, 5, 7, 4, 
    ];
    const expected = [ 
      15, 6, 3, 7, 3, 5, 0, 3, 
      15, 3, 6, 10, 6, 11, 5, 3, 
      0, 7, 2, 5, 7, 4, 12, 3, 
      15, 4, 13, 6, 10, 6, 15, 10,
    ];
    expect(stabilize(rays)).toEqual(expect.arrayContaining(expected));
  });
  test('Passes when rays offset is 18', () => {
    const rays = [ 
      5, 3, 0, 7, 2, 5, 7, 4, 
      12, 3, 15, 4, 13, 6, 10, 6, 
      15, 10, 15, 6, 3, 7, 3, 5, 
      0, 3, 15, 3, 6, 10, 6, 11, 
    ];
    const expected = [ 
      15, 6, 3, 7, 3, 5, 0, 3, 
      15, 3, 6, 10, 6, 11, 5, 3, 
      0, 7, 2, 5, 7, 4, 12, 3, 
      15, 4, 13, 6, 10, 6, 15, 10,
    ];
    expect(stabilize(rays)).toEqual(expect.arrayContaining(expected));
  });
  
  test('Passes when rays offset is 31', () => {
    const rays = [
      6, 3, 7, 3, 5, 0, 3, 15, 
      3, 6, 10, 6, 11, 5, 3, 0, 
      7, 2, 5, 7, 4, 12, 3, 15, 
      4, 13, 6, 10, 6, 15, 10, 15,
    ];
    const expected = [ 
      15, 6, 3, 7, 3, 5, 0, 3, 
      15, 3, 6, 10, 6, 11, 5, 3, 
      0, 7, 2, 5, 7, 4, 12, 3, 
      15, 4, 13, 6, 10, 6, 15, 10,
    ];
    expect(stabilize(rays)).toEqual(expect.arrayContaining(expected));
  });
  
  test('Fails when empty array of rays', () => {
    const rays = [];
    const expected = new Error('Something is wrong...')
    expect(() => stabilize(rays)).toThrowError(expected);
  });
  
  test('Fails when rays filled with items of same length', () => {
    const rays = [
      15, 15, 15, 15, 15, 15, 15, 15, 
      15, 15, 15, 15, 15, 15, 15, 15, 
      15, 15, 15, 15, 15, 15, 15, 15, 
      15, 15, 15, 15, 15, 15, 15, 15
    ];
    const expected = new Error('Something is wrong...')
    expect(() => stabilize(rays)).toThrowError(expected);
  });
  
  test('Fails when rays are not devided by 4', () => {
    const rays = [
      15, 10, 15, 6, 3, 7, 3, 5, 
      0, 3, 15, 3, 6, 10, 6, 11, 
      5, 3, 0, 7, 2, 5, 7, 4, 
      12, 3, 15, 4, 13, 6, 10,
    ];
    const expected = new Error('Something is wrong...')
    expect(() => stabilize(rays)).toThrowError(expected);
  });
  
  test('Fails when rays are not devided by 4', () => {
    const rays = [
      15, 10, 15, 6, 3, 7, 3, 5, 
      0, 3, 15, 3, 6, 10, 6, 11, 
      5, 3, 0, 7, 2, 5, 7, 4, 
      12, 3, 15, 4, 13, 6, 10,
    ];
    const expected = new Error('Something is wrong...')
    expect(() => stabilize(rays)).toThrowError(expected);
  });
});