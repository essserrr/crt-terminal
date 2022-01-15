import 'jest';
import { remove } from './remove';
import { Keyboard } from '../actions/actions';

describe('Remove', () => {
  describe('remove', () => {
    it('should backspace from the end', async () => {
      ['123', '12', '1', ''].forEach((inputValue) => {
        const renderValue = inputValue.split('');
        const renderValueOutput = renderValue.slice(0, renderValue.length - 1);

        expect(
          remove(
            { renderValue, inputValue, cursorPosition: renderValue.length },
            Keyboard.BACKSPACE,
          ),
        ).toEqual({
          renderValue: renderValueOutput,
          inputValue: renderValueOutput.join(''),
          cursorPosition: renderValueOutput.length,
        });
      });
    });
    it('should backspace in the middle', async () => {
      ['1234', '123', '12', '1', ''].forEach((inputValue) => {
        const renderValue = inputValue.split('');

        const cursorPosition = renderValue.length - 1 > 0 ? renderValue.length - 1 : 0;
        const newCursorPosition = renderValue.length - 2 > 0 ? renderValue.length - 2 : 0;

        const renderValueOutput = cursorPosition
          ? [...renderValue.slice(0, cursorPosition - 1), ...renderValue.slice(cursorPosition)]
          : renderValue;

        expect(remove({ renderValue, inputValue, cursorPosition }, Keyboard.BACKSPACE)).toEqual({
          renderValue: renderValueOutput,
          inputValue: renderValueOutput.join(''),
          cursorPosition: newCursorPosition,
        });
      });
    });
    it("shouldn't backspace from start", async () => {
      const inputValue = '123';
      const renderValue = inputValue.split('');
      const cursorPosition = 0;

      expect(remove({ renderValue, inputValue, cursorPosition }, Keyboard.BACKSPACE)).toEqual({
        renderValue,
        inputValue,
        cursorPosition,
      });
    });
    it('should delete from the start', async () => {
      ['123', '12', '1', ''].forEach((inputValue) => {
        const renderValue = inputValue.split('');
        const renderValueOutput = renderValue.slice(1);

        expect(remove({ renderValue, inputValue, cursorPosition: 0 }, Keyboard.DELETE)).toEqual({
          renderValue: renderValueOutput,
          inputValue: renderValueOutput.join(''),
          cursorPosition: 0,
        });
      });
    });
    it('should delete in the middle', async () => {
      ['1234', '123', '12', '1', ''].forEach((inputValue) => {
        const renderValue = inputValue.split('');

        const cursorPosition = renderValue[1] ? 1 : 0;
        const newCursorPosition = cursorPosition;

        const renderValueOutput = [
          ...renderValue.slice(0, cursorPosition),
          ...renderValue.slice(cursorPosition + 1),
        ];

        expect(remove({ renderValue, inputValue, cursorPosition }, Keyboard.DELETE)).toEqual({
          renderValue: renderValueOutput,
          inputValue: renderValueOutput.join(''),
          cursorPosition: newCursorPosition,
        });
      });
    });
    it("shouldn't delete from end", async () => {
      const inputValue = '123';
      const renderValue = inputValue.split('');
      const cursorPosition = renderValue.length;

      expect(remove({ renderValue, inputValue, cursorPosition }, Keyboard.DELETE)).toEqual({
        renderValue,
        inputValue,
        cursorPosition,
      });
    });
  });
});
