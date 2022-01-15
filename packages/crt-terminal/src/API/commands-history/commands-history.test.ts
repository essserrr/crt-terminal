import 'jest';
import { next, DEFAULT_COMMAND, prev, add } from './commands-history';

describe('Command history', () => {
  describe('next', () => {
    it('should return default command on next if position >= commands length', async () => {
      [['1', '2', '3'], ['1', '2'], ['1'], []].forEach((commandsHistory) => {
        const commandsLength = commandsHistory.length;

        const fixedResult = {
          cursorPosition: commandsLength,
          command: DEFAULT_COMMAND,
          commandsHistory,
        };

        [commandsLength, commandsLength + 1].forEach((cursorPosition) => {
          expect(next({ commandsHistory, cursorPosition })).toEqual(fixedResult);
        });
      });
    });

    it('should return next value', async () => {
      const commandsHistory = ['1', '2', '3'];

      [-1, 0, 1].forEach((cursorPosition) => {
        expect(next({ commandsHistory, cursorPosition })).toEqual({
          cursorPosition: cursorPosition + 1,
          command: commandsHistory[cursorPosition + 1],
          commandsHistory,
        });
      });
    });
  });

  describe('prev', () => {
    it('should return default command on prev if position <= 0', async () => {
      [['1', '2', '3'], ['1', '2'], ['1'], []].forEach((commandsHistory) => {
        const fixedResult = {
          cursorPosition: -1,
          command: DEFAULT_COMMAND,
          commandsHistory,
        };

        [-1, 0].forEach((cursorPosition) => {
          expect(prev({ commandsHistory, cursorPosition })).toEqual(fixedResult);
        });
      });
    });

    it('should return prev value', async () => {
      const commandsHistory = ['1', '2', '3'];

      [1, 2, 3].forEach((cursorPosition) => {
        expect(prev({ commandsHistory, cursorPosition })).toEqual({
          cursorPosition: cursorPosition - 1,
          command: commandsHistory[cursorPosition - 1],
          commandsHistory,
        });
      });
    });
  });

  describe('add', () => {
    it("shouldn't add command", async () => {
      const command = '3';

      [['1', '2', '3'], []].forEach((commandsHistory) => {
        const commandsLength = commandsHistory.length;

        expect(add({ commandsHistory, command, maxHistoryCommands: commandsLength })).toEqual({
          cursorPosition: commandsLength,
          commandsHistory,
        });
      });
    });
    it('should add command', async () => {
      const command = '4';

      [['1', '2', '3'], ['1', '2'], ['1'], []].forEach((commandsHistory) => {
        const commandsLength = commandsHistory.length;

        expect(add({ commandsHistory, command, maxHistoryCommands: commandsLength + 1 })).toEqual({
          cursorPosition: commandsLength + 1,
          commandsHistory: [...commandsHistory, command],
        });
      });
    });
    it('should remove oldest command', async () => {
      const command = '4';

      [['1', '2', '3'], ['1', '2'], ['1']].forEach((commandsHistory) => {
        const commandsLength = commandsHistory.length;

        expect(add({ commandsHistory, command, maxHistoryCommands: commandsLength })).toEqual({
          cursorPosition: commandsLength,
          commandsHistory: [...commandsHistory.slice(1), command],
        });
      });
    });
  });
});
