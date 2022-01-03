import { Nullable } from '../../../utils/helpers';
import type { Lines } from '../../sentence/sentence';
import { printLine } from '../line/line';
import type { PrintableItem } from '../printer/printer';

interface CombinePrintedLinesProps {
  printedLines: PrintableItem;
  printedLine: Lines;
  newLine: boolean;
}

const combinePrintedLines = ({ printedLines, printedLine, newLine }: CombinePrintedLinesProps) =>
  newLine
    ? [...printedLines, printedLine]
    : [...printedLines.slice(0, printedLines.length - 1), printedLine];

interface CombineRemainingLinesProps {
  remainingLines: PrintableItem;
  remainingLine: Nullable<Lines>;
}

const combineRemainingLines = ({
  remainingLines,
  remainingLine,
}: CombineRemainingLinesProps): Nullable<Lines[]> => {
  const lines = !remainingLine
    ? remainingLines.slice(1)
    : [remainingLine, ...remainingLines.slice(1)];
  return lines.length > 0 ? lines : null;
};

interface PrintMultilineRequest {
  remainingLines: PrintableItem;
  printedLines: PrintableItem;
  wordFullyPrinted: boolean;
  newLine: boolean;
  charactersToPrint: number;
}

interface PrintMultilineResponse {
  newLine: boolean;
  wordFullyPrinted: boolean;
  printedLines: Lines[];
  remainingLines: Nullable<Lines[]>;
}

const printMultiline = ({
  remainingLines,
  printedLines,
  wordFullyPrinted,
  newLine,
  charactersToPrint,
}: PrintMultilineRequest): PrintMultilineResponse => {
  const firstLine = remainingLines[0];
  if (!firstLine)
    return {
      newLine,
      wordFullyPrinted,
      printedLines,
      remainingLines: null,
    };

  const {
    remainingLine,
    printedLine,
    wordFullyPrinted: remainingLineAfterPrint,
  } = printLine({
    remainingLine: firstLine,
    printedLine: newLine ? { ...firstLine, words: [] } : printedLines[printedLines.length - 1],
    charactersToPrint,
    wordFullyPrinted,
  });

  return {
    newLine: !remainingLine,
    wordFullyPrinted: remainingLineAfterPrint,
    printedLines: combinePrintedLines({ printedLines, printedLine, newLine }),
    remainingLines: combineRemainingLines({ remainingLines, remainingLine }),
  };
};

export type { PrintMultilineRequest, PrintMultilineResponse };
export { printMultiline };
