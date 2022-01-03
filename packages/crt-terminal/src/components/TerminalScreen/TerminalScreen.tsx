import React, { memo } from 'react';
import { Printer } from '../../API/printer';
import PrinterLine from '../PrinterLine/PrinterLine';
import PrinterWord from '../PrinterWord/PrinterWord';

interface TerminalScreenProps {
  state: Printer;
}

const TerminalScreen = memo(({ state }: TerminalScreenProps) => (
  <div className="crt-screen">
    {state.map((line, lineIndex) => (
      <PrinterLine line={line} key={lineIndex}>
        {line.words.map((word, wordIndex) => (
          <PrinterWord word={word} key={wordIndex}>
            {word.characters}
          </PrinterWord>
        ))}
      </PrinterLine>
    ))}
  </div>
));

export default TerminalScreen;
