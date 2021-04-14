import { Module } from '@nestjs/common';

@Module({})
export class UtilsModule {
    static codeItemASCII(item: string): string{
        if(item.length === 0 || typeof item !== 'string') throw new Error('Argument is not a char');
        return item.charCodeAt(0).toString(16);
    }
    
    static codeASCII(text: string): string[] {
        let dataToDecoding = text;
        if (Array.isArray(text)) dataToDecoding = text.join('');
        return dataToDecoding
          .toString()
          .split('')
          .map(item => this.codeItemASCII(item));
    }
}
