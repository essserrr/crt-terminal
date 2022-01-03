import { useState } from 'react';
import {
  add,
  next,
  prev,
  CommandsHistory,
  CommandsHistoryKey,
  Command,
} from '../../API/commands-history/commands-history';

type CommandHistoryState = {
  commandsHistory: CommandsHistory;
  cursorPosition: CommandsHistoryKey;
};

type CommandHistoryProps = {
  maxHistoryCommands: number;
};

type CommandHistoryReturnType = ReturnType<typeof useCommandHistory>;

const defaultState: CommandHistoryState = {
  commandsHistory: [],
  cursorPosition: 0,
};

function useCommandHistory({ maxHistoryCommands }: CommandHistoryProps) {
  const [commandsHistory, setCommandsHistory] = useState<CommandsHistory>(
    defaultState.commandsHistory,
  );
  const [cursorPosition, setCursorPosition] = useState<CommandsHistoryKey>(
    defaultState.cursorPosition,
  );

  const setState = ({
    commandsHistory: newCommandsHistory,
    cursorPosition: newCursorPosition,
  }: CommandHistoryState) => {
    if (commandsHistory !== newCommandsHistory) setCommandsHistory(newCommandsHistory);
    if (cursorPosition !== newCursorPosition) setCursorPosition(newCursorPosition);
  };

  const addCommand = (command: Command) => {
    setState(add({ maxHistoryCommands, commandsHistory, command }));
  };

  const nextCommand = () => {
    const { command, ...rest } = next({
      commandsHistory,
      cursorPosition,
    });

    setState(rest);
    return command;
  };

  const prevCommand = () => {
    const { command, ...rest } = prev({
      commandsHistory,
      cursorPosition,
    });

    setState(rest);
    return command;
  };

  return {
    state: {
      commandsHistory,
    },
    handlers: {
      addCommand,
      nextCommand,
      prevCommand,
    },
  };
}

export type { CommandHistoryState, CommandHistoryProps, CommandHistoryReturnType };
export { useCommandHistory };
