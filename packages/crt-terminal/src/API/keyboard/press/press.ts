import { KeyboardRequest, KeyboardResponse, RenderList } from '../actions/actions';

interface PositionProps {
  oldLength: number;
  newLength: number;
  cursorPosition: number;
}

const newPosition = ({ oldLength, newLength, cursorPosition }: PositionProps) => {
  const wasLast = oldLength === cursorPosition;

  if (wasLast) return newLength;
  return cursorPosition + 1;
};

interface RenderProps {
  renderValue: RenderList;
  newInput: string;
  cursorPosition: number;
}

const newRender = ({ renderValue, cursorPosition, newInput }: RenderProps) => {
  const oldLength = renderValue.length;
  const delta = newInput.length - renderValue.length;

  const addedCharacters = newInput.substring(cursorPosition, cursorPosition + delta);
  return [
    ...renderValue.slice(0, cursorPosition),
    ...addedCharacters.split(''),
    ...renderValue.slice(cursorPosition, oldLength),
  ];
};

const press = ({ newInput, renderValue, cursorPosition }: KeyboardRequest): KeyboardResponse => {
  if (!newInput) throw new Error('Cannot press without a new input');
  if (newInput.length < renderValue.length) throw new Error('New input is shorter then old one');

  return {
    inputValue: newInput,
    renderValue: newRender({ newInput, renderValue, cursorPosition }),
    cursorPosition: newPosition({
      oldLength: renderValue.length,
      newLength: newInput.length,
      cursorPosition,
    }),
  };
};

export { press };
