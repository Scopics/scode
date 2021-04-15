import { EncodeModule } from '../encode/encode.module';
const { getRays, hexGenerator } = EncodeModule;

describe('Testing getRays', () => {
    test('Passes when pass valid param', () => {
        const link = 'https://www.youtube.com/watch?v=5rnawnfK2sQ';
        const expectedResult = [
            15,3,5,7,2,6,14,6,
            15,1,7,7,6,14,6,6,
            0,4,11,3,2,7,3,5,
            15,1,1,13,12,6,15,10
        ];
        const result = getRays(link);
        expect(result).toEqual(expectedResult);
    });

    test('Fails when pass empty string', () => {
        expect(() => {
            getRays('');
        }).toThrowError();
    });

    test('Fails when pass invalid link', () => {
        const link = 'httch?v=5rnawnK2sQ';
        expect(() => {
            getRays(link);
        }).toThrowError('Invalid link');
    });

    test('Passes when pass link from playlist', () => {
        const link = 
            'https://www.youtube.com/watch?v=5rnawnfK2sQ&list=PLbhsQE_RPwBOeD9GsvMUgOcJ-eI2FRfMq&index=12';
        const expectedResult = [
            15,3,5,7,2,6,14,6,
            15,1,7,7,6,14,6,6,
            0,4,11,3,2,7,3,5,
            15,1,1,13,12,6,15,10
        ];
        const result = getRays(link);
        expect(result).toEqual(expectedResult);
    });

    test('Passes when pass link with some symbols at the end', () => {
        const link = 'https://www.youtube.com/watch?v=5rnawnfK2sQяяяяяя';
        const expectedResult = [
            15,3,5,7,2,6,14,6,
            15,1,7,7,6,14,6,6,
            0,4,11,3,2,7,3,5,
            15,1,1,13,12,6,15,10
        ];
        const result = getRays(link);
        expect(result).toEqual(expectedResult);
    });

    test('Passes when pass link with timestamp', () => {
        const link = 'https://www.youtube.com/watch?v=5rnawnfK2sQ?t=68';
        const expectedResult = [
            15,3,5,7,2,6,14,6,
            15,1,7,7,6,14,6,6,
            0,4,11,3,2,7,3,5,
            15,1,1,13,12,6,15,10
        ];
        const result = getRays(link);
        expect(result).toEqual(expectedResult);
    });
});

describe('Testing hexGenerator', () => {
    test('Passes when pass default options', () => {
        const link = 'https://www.youtube.com/watch?v=5rnawnfK2sQ';
        const expectedResult = ["35", "72", "6e", "61", "77", "6e", "66", "4b", "32", "73", "51"];
        const result = hexGenerator(link);
        expect(result).toEqual(expectedResult);
    });

    test('Fails when pass invalid link', () => {
        const link = 'https://www.youtube.cofK2sQ';
        expect(() => {
            hexGenerator(link);
        }).toThrowError('Invalid link');
    });

    test('Passes when pass valid options', () => {
        const link = 'https://www.youtube.com/watch?v@5rnawnfK2sQ';
        const expectedResult = ["35", "72", "6e", "61", "77", "6e", "66", "4b", "32", "73", "51"];
        const options = { linkSeparator: '@'};
        const result = hexGenerator(link, options);
        expect(result).toEqual(expectedResult);
    });

    test('Fails when pass invalid options', () => {
        const link = 'https://www.youtube.com/watch?v@5rnawnfK2sQ';
        const expectedResult = ["35", "72", "6e", "61", "77", "6e", "66", "4b", "32", "73", "51"];
        const options = { linkSeparator: ''};
        expect(() => {
            hexGenerator(link, options);
        }).toThrowError('Invalid linkSeparator');
    });
});
