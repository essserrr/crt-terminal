import { useState } from 'react';
import {
  preventActions,
  PreventProps,
  moveCursor,
  MoveActions,
  submit,
  remove,
  RemoveActions,
  press,
  provideService,
  ServiceActions,
  KnownServices,
} from '../../API/keyboard';

type RenderItem = string;
type RenderList = RenderItem[];

interface CommandLine {
  renderValue: RenderList;
  inputValue: string;
  cursorPosition: number;
}

const defaultState: CommandLine = {
  renderValue: [],
  inputValue: '',
  cursorPosition: 0,
};

type CommandLineReturnType = ReturnType<typeof useCommandLine>;

function useCommandLine() {
  const [inputValue, setInputValue] = useState<string>(defaultState.inputValue);
  const [renderValue, setRenderValue] = useState<RenderList>(defaultState.renderValue);
  const [cursorPosition, setCursorPosition] = useState<number>(defaultState.cursorPosition);

  const setState = ({
    renderValue: newRenderValue,
    inputValue: newInputValue,
    cursorPosition: newCursorPosition,
  }: CommandLine) => {
    if (renderValue !== newRenderValue) setRenderValue(newRenderValue);
    if (inputValue !== newInputValue) setInputValue(newInputValue);
    if (cursorPosition !== newCursorPosition) setCursorPosition(newCursorPosition);
  };

  const preventDefault = (event: PreventProps) => preventActions(event);

  const addCharacter = (newInput: string) =>
    setState(press({ renderValue, inputValue, cursorPosition, newInput }));

  const setInput = (newInput: string) =>
    setState({
      renderValue: newInput.split(''),
      inputValue: newInput,
      cursorPosition: newInput.length,
    });

  const removeCharacter = (key: RemoveActions) =>
    setState(remove({ renderValue, inputValue, cursorPosition }, key));

  const moveCommandCursor = (key: MoveActions) =>
    setState(moveCursor({ renderValue, inputValue, cursorPosition }, key));

  const submitCommand = () => setState(submit());

  const provideCommandService = (key: ServiceActions, services: KnownServices) =>
    setState(provideService({ renderValue, inputValue, cursorPosition, services }, key));

  return {
    state: {
      inputValue,
      renderValue,
      cursorPosition,
    },
    handlers: {
      preventDefault,
      addCharacter,
      setInput,
      moveCommandCursor,
      removeCharacter,
      submitCommand,
      provideCommandService,
    },
  };
}

export type { CommandLine, RenderList, CommandLineReturnType };
export { useCommandLine };
