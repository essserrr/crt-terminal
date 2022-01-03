import { exhaustiveCheck } from '../../../utils/helpers';
import { Keyboard, KeyboardRequest, KeyboardResponse, RenderList } from '../actions/actions';

const removeActions = [Keyboard.BACKSPACE, Keyboard.DELETE] as const;

type RemoveActions = typeof removeActions[number];

const setOfActions = new Set<String>(removeActions);

const isRemoveActions = (str: string): str is RemoveActions => setOfActions.has(str);

const checkRemoveActions = exhaustiveCheck('Invalid remove action: ');

const newPosition = (newCursorPosition: number, lastPosition: number) => {
  if (newCursorPosition < 0) return 0;
  if (newCursorPosition > lastPosition) return lastPosition;
  return newCursorPosition;
};

const newRender = (renderValue: RenderList, removePosition: number): RenderList => [
  ...renderValue.slice(0, removePosition),
  ...renderValue.slice(removePosition + 1),
];

const newValue = (inputValue: string, removePosition: number): string =>
  `${inputValue.substring(0, removePosition)}${inputValue.substring(removePosition + 1)}`;

const handleBackspace = (props: KeyboardRequest): KeyboardResponse => {
  const { renderValue, inputValue, cursorPosition } = props;

  const prevPosition = cursorPosition - 1;
  if (prevPosition < 0) return props;

  return {
    renderValue: newRender(renderValue, prevPosition),
    inputValue: newValue(inputValue, prevPosition),
    cursorPosition: newPosition(prevPosition, renderValue.length),
  };
};

const handleDelete = (props: KeyboardRequest): KeyboardResponse => {
  const { renderValue, inputValue, cursorPosition } = props;

  if (cursorPosition === renderValue.length) return props;

  return {
    renderValue: newRender(renderValue, cursorPosition),
    inputValue: newValue(inputValue, cursorPosition),
    cursorPosition: newPosition(cursorPosition, renderValue.length - 1),
  };
};

const remove = (props: KeyboardRequest, key: RemoveActions): KeyboardResponse => {
  switch (key) {
    case Keyboard.BACKSPACE:
      return handleBackspace(props);
    case Keyboard.DELETE:
      return handleDelete(props);
    default:
      checkRemoveActions(key);
  }
  return props;
};

export type { RemoveActions };
export { removeActions, remove, isRemoveActions };
