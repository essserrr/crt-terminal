import { Nullable } from '../../../utils/helpers';
import type { Words } from '../../sentence/sentence';

interface PrintWordsRequest {
  remainingWords: Words[];
  printedWords: Words[];
  charactersToPrint: number;
}

interface PrintWordsResponse {
  remainingWords: Nullable<Words[]>;
  printedWords: Words[];
  wordFullyPrinted: boolean;
}

const printWords = ({
  remainingWords,
  printedWords,
  charactersToPrint,
}: PrintWordsRequest): PrintWordsResponse => {
  const firstWord = remainingWords[0];
  if (!firstWord) return { printedWords, remainingWords: null, wordFullyPrinted: true };

  const printedChunk = firstWord.characters.slice(0, charactersToPrint);
  const printedLength = printedChunk.length;

  if (printedLength === charactersToPrint) {
    if (printedLength < firstWord.characters.length) {
      return {
        printedWords: [...printedWords, { ...firstWord, characters: printedChunk }],
        remainingWords: [
          { ...firstWord, characters: firstWord.characters.slice(printedLength) },
          ...remainingWords.slice(1),
        ],
        wordFullyPrinted: false,
      };
    }
    return {
      printedWords: [...printedWords, firstWord],
      remainingWords: remainingWords.slice(1),
      wordFullyPrinted: true,
    };
  }

  return printWords({
    remainingWords: remainingWords.slice(1),
    printedWords: [...printedWords, firstWord],
    charactersToPrint: charactersToPrint - printedLength,
  });
};

export type { PrintWordsRequest, PrintWordsResponse };
export { printWords };
