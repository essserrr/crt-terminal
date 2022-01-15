import 'jest';
import { moveCursor } from './move-cursor';
import { Keyboard } from '../actions/actions';

describe('Move cursor', () => {
  it('should move right', async () => {
    ['123', '12', '1', ''].forEach((inputValue) => {
      const renderValue = inputValue.split('');

      expect(
        moveCursor({ renderValue, inputValue, cursorPosition: 0 }, Keyboard.ARROW_RIGHT),
      ).toEqual({
        renderValue,
        inputValue,
        cursorPosition: renderValue.length ? 1 : 0,
      });
    });
  });
  it('should move end', async () => {
    ['123', '12', '1', ''].forEach((inputValue) => {
      const renderValue = inputValue.split('');

      expect(moveCursor({ renderValue, inputValue, cursorPosition: 0 }, Keyboard.END)).toEqual({
        renderValue,
        inputValue,
        cursorPosition: renderValue.length,
      });
    });
  });
  it('should move home', async () => {
    ['123', '12', '1', ''].forEach((inputValue) => {
      const renderValue = inputValue.split('');

      expect(
        moveCursor({ renderValue, inputValue, cursorPosition: renderValue.length }, Keyboard.HOME),
      ).toEqual({
        renderValue,
        inputValue,
        cursorPosition: 0,
      });
    });
  });
  it('should move left', async () => {
    ['123', '12', '1', ''].forEach((inputValue) => {
      const renderValue = inputValue.split('');

      expect(
        moveCursor(
          { renderValue, inputValue, cursorPosition: renderValue.length },
          Keyboard.ARROW_LEFT,
        ),
      ).toEqual({
        renderValue,
        inputValue,
        cursorPosition: renderValue.length ? renderValue.length - 1 : 0,
      });
    });
  });
});
