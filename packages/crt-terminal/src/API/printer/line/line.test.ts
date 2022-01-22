import 'jest';
import { printLine } from './line';
import { textWord, textLine } from '../../sentence/sentence';

describe('Print line', () => {
  const HELLO = textWord({ characters: 'hello' });
  const HE = textWord({ characters: 'he' });
  const LLO = textWord({ characters: 'llo' });
  const WORLD = textWord({ characters: 'world' });

  const EMPTY_LINE = textLine({ words: [] });
  const HELLO_LINE = textLine({ words: [HELLO] });
  const HE_LINE = textLine({ words: [HE] });
  const LLO_LINE = textLine({ words: [LLO] });
  const WORLD_LINE = textLine({ words: [WORLD] });

  it('should print if no remaining lines', async () => {
    expect(
      printLine({
        remainingLine: EMPTY_LINE,
        printedLine: HELLO_LINE,
        charactersToPrint: 2,
        wordFullyPrinted: true,
      }),
    ).toEqual({
      remainingLine: null,
      printedLine: HELLO_LINE,
      wordFullyPrinted: true,
    });

    expect(
      printLine({
        remainingLine: EMPTY_LINE,
        printedLine: HELLO_LINE,
        charactersToPrint: 2,
        wordFullyPrinted: false,
      }),
    ).toEqual({
      remainingLine: null,
      printedLine: EMPTY_LINE,
      wordFullyPrinted: true,
    });
  });
  it('should return hello line if no printed lines', async () => {
    expect(
      printLine({
        remainingLine: HELLO_LINE,
        printedLine: EMPTY_LINE,
        charactersToPrint: 5,
        wordFullyPrinted: true,
      }),
    ).toEqual({
      remainingLine: null,
      printedLine: HELLO_LINE,
      wordFullyPrinted: true,
    });
  });
  it('should return empty line if no printed and remaining lines', async () => {
    expect(
      printLine({
        remainingLine: EMPTY_LINE,
        printedLine: EMPTY_LINE,
        charactersToPrint: 5,
        wordFullyPrinted: true,
      }),
    ).toEqual({
      remainingLine: null,
      printedLine: EMPTY_LINE,
      wordFullyPrinted: true,
    });
  });

  it('should chunkify', async () => {
    expect(
      printLine({
        remainingLine: HELLO_LINE,
        printedLine: EMPTY_LINE,
        charactersToPrint: 2,
        wordFullyPrinted: true,
      }),
    ).toEqual({
      remainingLine: LLO_LINE,
      printedLine: HE_LINE,
      wordFullyPrinted: false,
    });
  });
  it('should merge chunks', async () => {
    expect(
      printLine({
        remainingLine: HELLO_LINE,
        printedLine: HELLO_LINE,
        charactersToPrint: 2,
        wordFullyPrinted: false,
      }),
    ).toEqual({
      remainingLine: LLO_LINE,
      printedLine: textLine({ words: [textWord({ characters: 'hellohe' })] }),
      wordFullyPrinted: false,
    });
  });

  it('should add whole word to printed', async () => {
    expect(
      printLine({
        remainingLine: textLine({ words: [HELLO, WORLD] }),
        printedLine: HELLO_LINE,
        charactersToPrint: 5,
        wordFullyPrinted: true,
      }),
    ).toEqual({
      remainingLine: WORLD_LINE,
      printedLine: textLine({ words: [HELLO, HELLO] }),
      wordFullyPrinted: true,
    });
  });
});
