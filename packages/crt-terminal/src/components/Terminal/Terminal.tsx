import React from 'react';

import { PrintableItem } from '../../API/printer';

import { PrinterConfig } from '../../hooks/terminal/usePrinter';
import { useCommandLine } from '../../hooks/terminal/useCommandLine';
import { useCommandLineInput } from '../../hooks/terminal/useCommandLineInput';
import { useCommandHistory } from '../../hooks/terminal/useCommandHistory';
import { useCommandScreen } from '../../hooks/terminal/useCommandScreen';
import {
  useTerminalController,
  OnCommandCallback,
  ControllerQueue,
} from '../../hooks/useTerminalController';
import { useTerminalApp } from '../../hooks/terminal/useTerminalApp';
import {
  useSubscribeEventQueue,
  SubscribeQueue,
} from '../../hooks/eventQueue/useSubscribeEventQueue';
import { useLoader, LoaderConfig } from '../../hooks/terminal/useLoader';

import TerminalScreen from '../TerminalScreen/TerminalScreen';
import Overlay from '../Effects/Overlay/Overlay';
import TextEffects from '../Effects/TextEffects/TextEffects';
import ScreenEffects from '../Effects/ScreenEffects/ScreenEffects';
import CommandLine from '../CommandLine/CommandLine';

import classes from './terminal.module.scss';

type QueueInterface = ControllerQueue & SubscribeQueue;

interface TerminalProps {
  onCommand: OnCommandCallback;
  queue: QueueInterface;

  prompt?: string;
  cursorSymbol?: string;
  maxHistoryCommands?: number;
  banner?: PrintableItem;

  loader?: Partial<LoaderConfig>;
  printer?: Partial<PrinterConfig>;

  effects?: {
    scanner?: boolean;
    pixels?: boolean;
    screenEffects?: boolean;
    textEffects?: boolean;
  };
  focusOnMount?: boolean;
}

const Terminal = function Terminal({
  onCommand,
  queue,
  banner,
  prompt = '>\xa0',
  cursorSymbol = '\xa0',
  maxHistoryCommands = 10,

  loader: { slides = ['.', '..', '...'], loaderSpeed = 1000 } = {},
  printer: { printerSpeed = 20, charactersPerTick = 5, onPrintStatusChange } = {},

  effects: { scanner = true, pixels = true, screenEffects = true, textEffects = true } = {},
  focusOnMount = true
}: TerminalProps) {
  const terminalApp = useTerminalApp();
  const {
    state: { terminalRef },
    handlers: { scrollDown },
  } = terminalApp;

  const { state, handlers: screenHandlers } = useCommandScreen({
    printerConfig: { printerSpeed, charactersPerTick, afterPrintCallback: scrollDown, onPrintStatusChange },
  });

  const commandLine = useCommandLine();

  const {
    state: { inputElementRef },
    handlers: inputHandlers,
  } = useCommandLineInput();

  const commandHistory = useCommandHistory({ maxHistoryCommands });

  const loaderComponent = useLoader({
    slides,
    loaderSpeed,
    onSetOuterState: commandLine.handlers.setInput,
  });

  const { handlers: controllerHandlers } = useTerminalController({
    input: {
      handlers: inputHandlers,
    },
    terminalApp,
    commandHistory,
    commandLine,
    commandScreen: { handlers: screenHandlers },
    loaderComponent,
    interface: { banner, prompt, onCommand, queue },
    focusOnMount,
  });
  const { handleKeyboardDown, handleInputChange } = controllerHandlers;

  useSubscribeEventQueue({ queue, controller: controllerHandlers });

  return (
    <label
      className={[classes.terminal, 'crt-terminal'].join(' ')}
      htmlFor="crt-command-line-input"
    >
      <Overlay scanner={scanner} pixels={pixels} />
      <ScreenEffects enabled={screenEffects}>
        <div
          ref={terminalRef}
          className={[classes.overflowContainer, 'crt-terminal__overflow-container'].join(' ')}
        >
          <TextEffects enabled={textEffects}>
            <div className="crt-terminal__screen">
              <TerminalScreen state={state} />
            </div>

            <div className="crt-terminal__command-line">
              <CommandLine
                ref={inputElementRef}
                prompt={prompt}
                cursorSymbol={cursorSymbol}
                state={commandLine.state}
                handleKeyboardDown={handleKeyboardDown}
                handleInputChange={handleInputChange}
              />
            </div>
          </TextEffects>
        </div>
      </ScreenEffects>
    </label>
  );
};

export type { TerminalProps };
export default Terminal;
