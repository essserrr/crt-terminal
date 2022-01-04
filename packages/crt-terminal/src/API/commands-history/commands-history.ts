type Command = string;
type CommandsHistory = Command[];
type CommandsHistoryKey = number;

const DEFAULT_ITEM: Command = '';

interface HistoryActionBaseProps {
  commandsHistory: CommandsHistory;
  cursorPosition: CommandsHistoryKey;
}

interface HistoryActionBaseReturnType {
  commandsHistory: CommandsHistory;
  cursorPosition: CommandsHistoryKey;
}

interface HistoryCursorMoveReturnType extends HistoryActionBaseReturnType {
  command: Command;
}

const next = ({
  commandsHistory,
  cursorPosition: oldCursorPosition,
}: HistoryActionBaseProps): HistoryCursorMoveReturnType => {
  const lastIndex = commandsHistory.length - 1;
  const nextIndex = oldCursorPosition + 1;

  const cursorPosition = lastIndex < nextIndex ? commandsHistory.length : nextIndex;
  const command = commandsHistory[nextIndex] || DEFAULT_ITEM;

  return { commandsHistory, cursorPosition, command };
};

const prev = ({
  commandsHistory,
  cursorPosition: oldCursorPosition,
}: HistoryActionBaseProps): HistoryCursorMoveReturnType => {
  const prevIndex = oldCursorPosition - 1;

  const cursorPosition = prevIndex < 0 ? -1 : prevIndex;
  const command = commandsHistory[prevIndex] || DEFAULT_ITEM;

  return { commandsHistory, cursorPosition, command };
};

interface HistoryAddProps {
  commandsHistory: CommandsHistory;
  command: Command;
  maxHistoryCommands: number;
}

const add = ({
  commandsHistory,
  command,
  maxHistoryCommands,
}: HistoryAddProps): HistoryActionBaseReturnType => {
  const commandsLength = commandsHistory.length;
  const lastIndex = commandsLength - 1;

  const sameCommand = commandsHistory[lastIndex] === command;
  if (sameCommand) return { commandsHistory, cursorPosition: commandsLength };

  const canAppend = commandsLength < maxHistoryCommands;
  if (canAppend)
    return {
      commandsHistory: [...commandsHistory, command],
      cursorPosition: commandsLength + 1,
    };

  const canReplace = Boolean(commandsLength);
  if (canReplace) {
    return {
      commandsHistory: [...commandsHistory.slice(1), command],
      cursorPosition: commandsLength,
    };
  }

  return { commandsHistory, cursorPosition: commandsLength };
};

export type { CommandsHistory, Command, CommandsHistoryKey };
export { next, prev, add };
