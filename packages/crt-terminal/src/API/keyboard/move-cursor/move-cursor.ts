import { exhaustiveCheck } from '../../../utils/helpers';
import { Keyboard, KeyboardRequest, KeyboardResponse } from '../actions/actions';

const moveActions = [
  Keyboard.ARROW_LEFT,
  Keyboard.ARROW_RIGHT,
  Keyboard.HOME,
  Keyboard.END,
] as const;

type MoveActions = typeof moveActions[number];

const setOfActions = new Set<String>(moveActions);
const isMoveActions = (str: string): str is MoveActions => setOfActions.has(str);

const moveLeft = (cursorPosition: number) => {
  const newPos = cursorPosition - 1;
  return newPos < 0 ? 0 : newPos;
};

const moveRight = (cursorPosition: number, lastPosition: number) => {
  const newPos = cursorPosition + 1;
  return newPos > lastPosition ? lastPosition : newPos;
};

const moveHome = () => 0;

const moveEnd = (lastPosition: number) => lastPosition;

const checkMoveActions = exhaustiveCheck('Invalid move action: ');

interface PositionProps {
  cursorPosition: number;
  lastPosition: number;
}

const newPosition = ({ cursorPosition, lastPosition }: PositionProps, key: MoveActions) => {
  switch (key) {
    case Keyboard.ARROW_LEFT:
      return moveLeft(cursorPosition);
    case Keyboard.ARROW_RIGHT:
      return moveRight(cursorPosition, lastPosition);
    case Keyboard.HOME:
      return moveHome();
    case Keyboard.END:
      return moveEnd(lastPosition);
    default:
      checkMoveActions(key);
  }
  return cursorPosition;
};

const moveCursor = (
  { renderValue, cursorPosition, inputValue }: KeyboardRequest,
  key: MoveActions,
): KeyboardResponse => {
  const lastPosition = renderValue.length;
  return {
    renderValue,
    cursorPosition: newPosition({ cursorPosition, lastPosition }, key),
    inputValue,
  };
};

export type { MoveActions };
export { moveCursor, isMoveActions };
