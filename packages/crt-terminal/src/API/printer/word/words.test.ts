import 'jest';
import { printWords } from './words';
import { textWord } from '../../sentence/sentence';

describe('Print word', () => {
  const HELLO = textWord({ characters: 'hello' });
  const WORLD = textWord({ characters: 'world' });

  it('should return if no word remains', async () => {
    expect(
      printWords({
        remainingWords: [],
        printedWords: [HELLO],
        charactersToPrint: 10,
      }),
    ).toEqual({
      remainingWords: null,
      printedWords: [HELLO],
      wordFullyPrinted: true,
    });
  });

  it('should chunkify word', async () => {
    expect(
      printWords({
        remainingWords: [HELLO],
        printedWords: [],
        charactersToPrint: 2,
      }),
    ).toEqual({
      remainingWords: [textWord({ characters: 'llo' })],
      printedWords: [textWord({ characters: 'he' })],
      wordFullyPrinted: false,
    });
  });

  it('should print several word', async () => {
    const word = [HELLO, WORLD];
    expect(
      printWords({
        remainingWords: word,
        printedWords: [],
        charactersToPrint: 10,
      }),
    ).toEqual({
      remainingWords: [],
      printedWords: word,
      wordFullyPrinted: true,
    });
  });
});
