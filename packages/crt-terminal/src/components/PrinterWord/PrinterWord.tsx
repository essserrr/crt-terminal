import React, { PropsWithChildren } from 'react';
import { exhaustiveCheck } from '../../utils/helpers';
import { WordTypes, Words } from '../../API/sentence/sentence';
import Character from '../Character/Character';
import classes from './printer-word.module.scss';

interface PrinterWordProps {
  word: Words;
}

const checkWords = exhaustiveCheck('Unknown word type: ');

const PrinterWord = function PrinterWord({ word, children }: PropsWithChildren<PrinterWordProps>) {
  const { className = '', dataAttribute, id } = word;
  return (() => {
    switch (word.type) {
      case WordTypes.TEXT:
        return (
          <span
            id={id}
            className={[classes.textWord, 'crt-text-word', className].join(' ')}
            data-crt-terminal={dataAttribute}
          >
            <Character>{children}</Character>
          </span>
        );
      case WordTypes.ANCHOR:
        return (
          <a
            id={id}
            className={[classes.anchorWord, 'crt-anchor-word', className].join(' ')}
            data-crt-terminal={dataAttribute}
            href={word.href}
            onClick={word.onClick}
          >
            <Character>{children}</Character>
          </a>
        );
      case WordTypes.BUTTON:
        return (
          <button
            type="button"
            id={id}
            className={[classes.buttonWord, 'crt-button-word', className].join(' ')}
            data-crt-terminal={dataAttribute}
            onClick={word.onClick}
          >
            <Character>{children}</Character>
          </button>
        );
      case WordTypes.COMMAND:
        return (
          <span
            id={id}
            className={[classes.commandWord, 'crt-command-word', className].join(' ')}
            data-crt-terminal={dataAttribute}
          >
            <Character>{word.prompt}</Character>
            <Character>{children}</Character>
          </span>
        );
      default:
        return checkWords(word);
    }
  })();
};

export default PrinterWord;
