import { useRef } from 'react';

interface CommandLineInputProps {}

type CommandLineInputReturnType = ReturnType<typeof useCommandLineInput>;

function useCommandLineInput() {
  const inputElementRef = useRef<HTMLInputElement>(null);

  const setInputCursor = (cursorPosition: number) => {
    if (inputElementRef.current) {
      inputElementRef.current.selectionStart = cursorPosition;
      inputElementRef.current.selectionEnd = cursorPosition;
    }
  };

  const focus = () => inputElementRef.current?.focus();

  return { state: { inputElementRef }, handlers: { focus, setInputCursor } };
}

export type { CommandLineInputProps, CommandLineInputReturnType };
export { useCommandLineInput };
