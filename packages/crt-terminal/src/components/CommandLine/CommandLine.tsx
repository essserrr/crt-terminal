import React from 'react';
import { CommandLine as CommandLineState } from '../../hooks/terminal/useCommandLine';
import { TerminalControllerReturnType } from '../../hooks/useTerminalController';
import Character from '../Character/Character';
import InputString from './components/InputString/InputString';
import classes from './command-line.module.scss';

interface CommandLineProps {
  disabled: boolean;
  prompt: string;
  cursorSymbol: string;
  state: CommandLineState;
  handleKeyboardDown: TerminalControllerReturnType['handlers']['handleKeyboardDown'];
  handleInputChange: TerminalControllerReturnType['handlers']['handleInputChange'];
}

const CommandLine = React.forwardRef<HTMLInputElement, CommandLineProps>(
  (
    {
      disabled,
      state: { cursorPosition, renderValue, inputValue },
      handleKeyboardDown,
      handleInputChange,
      prompt,
      cursorSymbol,
    },
    inputElement,
  ) => {
    const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
      const {
        currentTarget: { value },
      } = event;
      handleInputChange(value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      handleKeyboardDown(event);
    };

    const lastSelected = cursorPosition === renderValue.length;

    return (
      <div className={[classes.commandLine, 'crt-command-line'].join(' ')}>
        <span className="crt-command-line__prompt">{prompt}</span>
        <div className={[classes.inputWrap, 'crt-command-line__input-wrapper'].join(' ')}>
          <input
            className={[classes.input, 'crt-command-line__input'].join(' ')}
            id="crt-command-line-input"
            ref={inputElement}
            value={inputValue}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            type="text"
            disabled={disabled}
          />
          <div className={[classes.inputString, 'crt-command-line__input-string'].join(' ')}>
            <InputString renderValue={renderValue} cursorPosition={cursorPosition} />
            {lastSelected && !disabled && (
              <Character className="crt-cursor-symbol" selected>
                {cursorSymbol}
              </Character>
            )}
          </div>
        </div>
      </div>
    );
  },
);

export default CommandLine;
