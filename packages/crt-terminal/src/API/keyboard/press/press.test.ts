import 'jest';
import { press } from './press';

describe('Press', () => {
  describe('press', () => {
    it('should throw error on incorrect input', async () => {
      const renderValue = ['1', '2', '3'];
      const inputValue = '123';

      [undefined, '12'].forEach((newInput) => {
        expect(() =>
          press({ renderValue, newInput, inputValue, cursorPosition: 0 }),
        ).toThrowError();
      });
    });

    it('should add a symbol to the end', async () => {
      const symbol = 'Aa';
      [['1', '2', '3'], ['1', '2'], ['1'], []].forEach((renderValue) => {
        const inputValue = renderValue.join('');
        const newInput = `${inputValue}${symbol}`;

        expect(
          press({ renderValue, newInput, inputValue, cursorPosition: renderValue.length }),
        ).toEqual({
          inputValue: newInput,
          renderValue: newInput.split(''),
          cursorPosition: newInput.length,
        });
      });
    });

    it('should add a symbol in the beginning', async () => {
      const symbol = 'Aa';
      [['1', '2', '3'], ['1', '2'], ['1']].forEach((renderValue) => {
        const inputValue = renderValue.join('');
        const newInput = `${symbol}${inputValue}`;

        expect(press({ renderValue, newInput, inputValue, cursorPosition: 0 })).toEqual({
          inputValue: newInput,
          renderValue: newInput.split(''),
          cursorPosition: 0,
        });
      });
    });
  });
});
