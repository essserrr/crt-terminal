import { useState, useRef } from 'react';

interface TerminalAppState {
  inputLocked: boolean;
}

type TerminalAppReturnType = ReturnType<typeof useTerminalApp>;

const defaultState: TerminalAppState = {
  inputLocked: false,
};

function useTerminalApp() {
  const [inputLocked, setInputLocked] = useState<boolean>(defaultState.inputLocked);
  const terminalRef = useRef<HTMLInputElement>(null);

  const setState = ({ inputLocked: newInputLocked }: TerminalAppState) => {
    if (inputLocked !== newInputLocked) setInputLocked(newInputLocked);
  };

  const lock = (locked: boolean) => setState({ inputLocked: locked });

  const scrollDown = () => {
    const { current } = terminalRef;
    if (current) {
      current.scrollTop = current.scrollHeight;
    }
  };

  return {
    state: {
      terminalRef,
      inputLocked,
    },
    handlers: {
      lock,
      scrollDown,
    },
  };
}

export type { TerminalAppState, TerminalAppReturnType };
export { useTerminalApp };
