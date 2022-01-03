import { Keyboard } from '../actions/actions';

const preventedActions = [
  Keyboard.ARROW_DOWN,
  Keyboard.ARROW_LEFT,
  Keyboard.ARROW_RIGHT,
  Keyboard.ARROW_UP,
  Keyboard.END,
  Keyboard.HOME,
  Keyboard.PAGE_DOWN,
  Keyboard.PAGE_UP,
  Keyboard.DELETE,
  Keyboard.BACKSPACE,
  Keyboard.ENTER,
] as const;

type PreventedActions = typeof preventedActions[number];

const setOfActions = new Set<String>(preventedActions);

const isPreventedActions = (str: string): str is PreventedActions => setOfActions.has(str);

type PreventProps = Pick<React.KeyboardEvent, 'preventDefault'>;

const preventActions = (event: PreventProps) => {
  event.preventDefault();
};

export type { PreventedActions, PreventProps };
export { preventedActions, preventActions, isPreventedActions };
