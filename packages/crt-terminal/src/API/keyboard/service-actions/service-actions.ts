import { exhaustiveCheck } from '../../../utils/helpers';
import { CommandHistoryReturnType } from '../../../hooks/terminal/useCommandHistory';
import { Keyboard, KeyboardRequest, KeyboardResponse } from '../actions/actions';

const serviceActions = [Keyboard.ARROW_UP, Keyboard.ARROW_DOWN] as const;

type ServiceActions = typeof serviceActions[number];

const setOfActions = new Set<String>(serviceActions);

const isServiceActions = (str: string): str is ServiceActions => setOfActions.has(str);

const checkServiceActions = exhaustiveCheck('Invalid service action: ');

type NextCommand = CommandHistoryReturnType['handlers']['nextCommand'];
type PrevCommand = CommandHistoryReturnType['handlers']['prevCommand'];

interface KnownServices {
  nextCommand: NextCommand;
  prevCommand: PrevCommand;
}

type ProvideServiceProps = KeyboardRequest & { services: KnownServices };

const handleHistoryMove = (serviceFunction: NextCommand | PrevCommand): KeyboardResponse => {
  const inputValue = serviceFunction();
  const cursorPosition = inputValue.length;
  const renderValue = inputValue.split('');
  return { renderValue, inputValue, cursorPosition };
};

const provideService = (
  {
    renderValue,
    inputValue,
    cursorPosition,
    services: { nextCommand, prevCommand },
  }: ProvideServiceProps,
  key: ServiceActions,
): KeyboardResponse => {
  switch (key) {
    case Keyboard.ARROW_UP:
      return handleHistoryMove(prevCommand);
    case Keyboard.ARROW_DOWN:
      return handleHistoryMove(nextCommand);
    default:
      checkServiceActions(key);
  }
  return { renderValue, inputValue, cursorPosition };
};

export type { ServiceActions, KnownServices };
export { serviceActions, provideService, isServiceActions };
