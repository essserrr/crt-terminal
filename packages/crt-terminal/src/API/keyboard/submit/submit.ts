import { Keyboard, KeyboardResponse, RenderList } from '../actions/actions';

const submitActions = [Keyboard.ENTER] as const;

type SubmitActions = typeof submitActions[number];

const setOfActions = new Set<String>(submitActions);

const isSubmitActions = (str: string): str is SubmitActions => setOfActions.has(str);

const DEFAULT_INPUT = '';
const DEFAULT_RENDER: RenderList = [];
const DEFAULT_POSITION = 0;

const submit = (): KeyboardResponse => ({
  inputValue: DEFAULT_INPUT,
  renderValue: DEFAULT_RENDER,
  cursorPosition: DEFAULT_POSITION,
});

export type { SubmitActions };
export { submit, isSubmitActions, DEFAULT_INPUT, DEFAULT_RENDER, DEFAULT_POSITION };
