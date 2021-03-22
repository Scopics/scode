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
    const rays = {
      name: 'Trojan horse',
      length: 100,
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
