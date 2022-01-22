import 'jest';
import { printer, createPrinterTask } from './printer';
import { textWord, textLine } from '../../sentence/sentence';

jest.useFakeTimers();

describe('Printer', () => {
  describe('printer', () => {
    const HELLO = textWord({ characters: 'hello' });
    const HE = textWord({ characters: 'he' });
    const LLO = textWord({ characters: 'llo' });
    const WORLD = textWord({ characters: 'world' });

    const HELLO_LINE = textLine({ words: [HELLO] });
    const HE_LINE = textLine({ words: [HE] });
    const LLO_LINE = textLine({ words: [LLO] });
    const WORLD_LINE = textLine({ words: [WORLD] });

    it('should chunkify in newline mode', async () => {
      expect(
        printer({
          state: [HELLO_LINE],
          remainingLines: [HELLO_LINE],
          printedLines: [WORLD_LINE],
          wordFullyPrinted: true,
          newLine: true,
          charactersToPrint: 2,
        }),
      ).toEqual({
        newLine: false,
        wordFullyPrinted: false,
        remainingLines: [LLO_LINE],
        printedLines: [WORLD_LINE, HE_LINE],
        state: [HELLO_LINE, WORLD_LINE, HE_LINE],
      });
    });
    it('should chunkify without newline mode', async () => {
      const result = [textLine({ words: [WORLD, HE] })];

      expect(
        printer({
          state: [HELLO_LINE],
          remainingLines: [HELLO_LINE],
          printedLines: [WORLD_LINE],
          wordFullyPrinted: true,
          newLine: false,
          charactersToPrint: 2,
        }),
      ).toEqual({
        newLine: false,
        wordFullyPrinted: false,
        remainingLines: [LLO_LINE],
        printedLines: result,
        state: result,
      });
    });

    it('should merge chunks in newline mode', async () => {
      expect(
        printer({
          state: [HELLO_LINE],
          remainingLines: [HELLO_LINE],
          printedLines: [WORLD_LINE],
          wordFullyPrinted: false,
          newLine: true,
          charactersToPrint: 2,
        }),
      ).toEqual({
        newLine: false,
        wordFullyPrinted: false,
        remainingLines: [LLO_LINE],
        printedLines: [WORLD_LINE, HE_LINE],
        state: [HELLO_LINE, WORLD_LINE, HE_LINE],
      });
    });
    it('should merge chunks without newline mode', async () => {
      const result = [textLine({ words: [textWord({ characters: 'worldhe' })] })];

      expect(
        printer({
          state: [HELLO_LINE],
          remainingLines: [HELLO_LINE],
          printedLines: [WORLD_LINE],
          wordFullyPrinted: false,
          newLine: false,
          charactersToPrint: 2,
        }),
      ).toEqual({
        newLine: false,
        wordFullyPrinted: false,
        remainingLines: [LLO_LINE],
        printedLines: result,
        state: result,
      });
    });
  });

  describe('createPrinterTask', () => {
    it("printer task should call it's callback after given interval", async () => {
      const callback = jest.fn();

      createPrinterTask(callback, 10);

      jest.advanceTimersByTime(10);
      expect(callback).toBeCalled();
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
