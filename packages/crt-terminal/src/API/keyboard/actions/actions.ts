import type { RenderList } from '../../../hooks/terminal/useCommandLine';

enum Keyboard {
  ARROW_DOWN = 'ArrowDown',
  ARROW_LEFT = 'ArrowLeft',
  ARROW_RIGHT = 'ArrowRight',
  ARROW_UP = 'ArrowUp',
  END = 'End',
  HOME = 'Home',
  PAGE_DOWN = 'PageDown',
  PAGE_UP = 'PageUp',
  DELETE = 'Delete',
  BACKSPACE = 'Backspace',
  ENTER = 'Enter',
}

type KeyboardKeys = keyof typeof Keyboard;

interface KeyboardRequest {
  renderValue: RenderList;
  inputValue: string;
  cursorPosition: number;
  newInput?: string;
}

interface KeyboardResponse {
  renderValue: RenderList;
  inputValue: string;
  cursorPosition: number;
}

export type { KeyboardKeys, KeyboardRequest, KeyboardResponse, RenderList };
export { Keyboard };
