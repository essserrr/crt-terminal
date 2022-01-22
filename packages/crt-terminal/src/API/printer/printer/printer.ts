import { Nullable } from '../../../utils/helpers';
import { Lines } from '../../sentence/sentence';
import { printMultiline } from '../multiline/multiline';

type Printer = Lines[];
type PrintableItem = Lines[];

interface MakeNewStateProps {
  prevState: Printer;
  printedLinesNext: Lines[];
  newLine: boolean;
}

const makeNewState = ({ prevState, printedLinesNext, newLine }: MakeNewStateProps): Printer =>
  newLine
    ? [...prevState, ...printedLinesNext]
    : [...prevState.slice(0, prevState.length - 1), ...printedLinesNext];

interface PrinterRequest {
  remainingLines: PrintableItem;
  printedLines: PrintableItem;
  wordFullyPrinted: boolean;
  newLine: boolean;
  state: Printer;
  charactersToPrint: number;
}

interface PrinterResponse {
  remainingLines: Nullable<PrintableItem>;
  printedLines: PrintableItem;
  wordFullyPrinted: boolean;
  newLine: boolean;
  state: Printer;
}

const printer = ({
  remainingLines,
  printedLines,
  state: prevState,
  wordFullyPrinted,
  newLine,
  charactersToPrint,
}: PrinterRequest): PrinterResponse => {
  const {
    remainingLines: remainingLinesNext,
    printedLines: printedLinesNext,
    wordFullyPrinted: wordFullyPrintedNext,
    newLine: newLineNext,
  } = printMultiline({
    remainingLines,
    printedLines,
    wordFullyPrinted,
    newLine,
    charactersToPrint,
  });

  return {
    remainingLines: remainingLinesNext,
    printedLines: printedLinesNext,
    wordFullyPrinted: wordFullyPrintedNext,
    newLine: newLineNext,
    state: makeNewState({ prevState, printedLinesNext, newLine }),
  };
};

const createPrinterTask = (nextPrint: () => void, printerSpeed: number) =>
  setTimeout(() => nextPrint(), printerSpeed);

export type { Printer, PrintableItem, PrinterRequest, PrinterResponse };
export { printer, createPrinterTask };
