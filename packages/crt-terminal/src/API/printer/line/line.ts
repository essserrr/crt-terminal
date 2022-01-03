import { Nullable } from '../../../utils/helpers';
import type { Words, Lines } from '../../sentence/sentence';
import { printWords } from '../word/words';

interface CombineWordProps {
  prevWord?: Words;
  nextWord?: Words;
  wordFullyPrinted: boolean;
}

const combineWords = ({
  prevWord,
  nextWord,
  wordFullyPrinted,
}: CombineWordProps): Words | undefined =>
  wordFullyPrinted || !prevWord || !nextWord
    ? nextWord
    : {
        ...prevWord,
        characters: prevWord.characters + nextWord.characters,
      };

interface MakeWordChunkProps {
  firstWord?: Words;
  printedWords: Words[];
}

const makeWordChunk = ({ firstWord, printedWords }: MakeWordChunkProps): Words[] => {
  if (!firstWord) return printedWords;
  return [firstWord, ...printedWords.slice(1)];
};

interface AppendWordChunkProps {
  printedWordsPrev: Words[];
  wordChunk: Words[];
  wordFullyPrintedPrev: boolean;
}

const appendWordChunk = ({
  printedWordsPrev,
  wordChunk,
  wordFullyPrintedPrev,
}: AppendWordChunkProps): Words[] =>
  wordFullyPrintedPrev
    ? [...printedWordsPrev, ...wordChunk]
    : [...printedWordsPrev.slice(0, printedWordsPrev.length - 1), ...wordChunk];

interface GetRemainingLineProps {
  remainingLine: Lines;
  remainingWords: Nullable<Words[]>;
}

const getRemainingLine = ({
  remainingLine,
  remainingWords,
}: GetRemainingLineProps): Nullable<Lines> =>
  remainingWords ? { ...remainingLine, words: remainingWords } : null;

interface PrintLineRequest {
  remainingLine: Lines;
  printedLine: Lines;
  charactersToPrint: number;
  wordFullyPrinted: boolean;
}

interface PrintLineResponse {
  remainingLine: Nullable<Lines>;
  printedLine: Lines;
  wordFullyPrinted: boolean;
}

const printLine = ({
  remainingLine,
  printedLine,
  charactersToPrint,
  wordFullyPrinted: wordFullyPrintedPrev,
}: PrintLineRequest): PrintLineResponse => {
  const { words: printedWordsPrev } = printedLine;

  const { printedWords, remainingWords, wordFullyPrinted } = printWords({
    remainingWords: remainingLine.words,
    printedWords: [],
    charactersToPrint,
  });

  const prevWord = printedWordsPrev[printedWordsPrev.length - 1];
  const nextWord = printedWords[0];

  const firstWord = combineWords({ prevWord, nextWord, wordFullyPrinted: wordFullyPrintedPrev });
  const wordChunk = makeWordChunk({ firstWord, printedWords });

  return {
    remainingLine: getRemainingLine({ remainingLine, remainingWords }),
    printedLine: {
      ...printedLine,
      words: appendWordChunk({ printedWordsPrev, wordChunk, wordFullyPrintedPrev }),
    },
    wordFullyPrinted,
  };
};

export type { PrintLineRequest, PrintLineResponse };
export { printLine };
