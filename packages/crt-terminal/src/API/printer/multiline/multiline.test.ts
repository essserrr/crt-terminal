import 'jest';
import { printMultiline } from './multiline';
import { textWord, textLine } from '../../sentence/sentence';

describe('Print multiline', () => {
  const HELLO = textWord({ characters: 'hello' });
  const HE = textWord({ characters: 'he' });
  const LLO = textWord({ characters: 'llo' });
  const WORLD = textWord({ characters: 'world' });

  const EMPTY_LINE = textLine({ words: [] });
  const HELLO_LINE = textLine({ words: [HELLO] });
  const HE_LINE = textLine({ words: [HE] });
  const LLO_LINE = textLine({ words: [LLO] });
  const WORLD_LINE = textLine({ words: [WORLD] });

  it('should not print empty remaining lines', async () => {
    expect(
      printMultiline({
        remainingLines: [],
        printedLines: [WORLD_LINE],
        wordFullyPrinted: false,
        newLine: true,
        charactersToPrint: 5,
      }),
    ).toEqual({
      newLine: true,
      wordFullyPrinted: false,
      printedLines: [WORLD_LINE],
      remainingLines: null,
    });
  });
  it('should print empty line', async () => {
    expect(
      printMultiline({
        remainingLines: [EMPTY_LINE],
        printedLines: [WORLD_LINE],
        wordFullyPrinted: true,
        newLine: true,
        charactersToPrint: 5,
      }),
    ).toEqual({
      newLine: true,
      wordFullyPrinted: true,
      printedLines: [WORLD_LINE, EMPTY_LINE],
      remainingLines: null,
    });
  });

  it('should chunkify in newline mode', async () => {
    expect(
      printMultiline({
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
    });
  });
  it('should chunkify without newline mode', async () => {
    expect(
      printMultiline({
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
      printedLines: [textLine({ words: [WORLD, HE] })],
    });
  });

  it('should merge chunks in newline mode', async () => {
    expect(
      printMultiline({
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
    });
  });
  it('should merge chunks without newline mode', async () => {
    expect(
      printMultiline({
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
      printedLines: [textLine({ words: [textWord({ characters: 'worldhe' })] })],
    });
  });

  it('should add whole word to printed in newline mode', async () => {
    expect(
      printMultiline({
        remainingLines: [HELLO_LINE],
        printedLines: [WORLD_LINE],
        wordFullyPrinted: true,
        newLine: true,
        charactersToPrint: 5,
      }),
    ).toEqual({
      newLine: true,
      wordFullyPrinted: true,
      remainingLines: null,
      printedLines: [WORLD_LINE, HELLO_LINE],
    });
  });
  it('should add whole word to printed without newline mode', async () => {
    expect(
      printMultiline({
        remainingLines: [WORLD_LINE],
        printedLines: [HELLO_LINE],
        wordFullyPrinted: true,
        newLine: false,
        charactersToPrint: 5,
      }),
    ).toEqual({
      newLine: true,
      wordFullyPrinted: true,
      remainingLines: null,
      printedLines: [textLine({ words: [HELLO, WORLD] })],
    });
  });
});
