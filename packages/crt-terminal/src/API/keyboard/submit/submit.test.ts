import 'jest';
import { submit, DEFAULT_INPUT, DEFAULT_POSITION, DEFAULT_RENDER } from './submit';

describe('Submit', () => {
  it('should return default state', async () => {
    expect(submit()).toEqual({
      inputValue: DEFAULT_INPUT,
      renderValue: DEFAULT_RENDER,
      cursorPosition: DEFAULT_POSITION,
    });
  });
});
