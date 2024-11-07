[![NPM](https://img.shields.io/npm/v/react-select.svg)](https://www.npmjs.com/package/crt-terminal)

# CRT terminal

Simple retro styled React-hooks-based terminal shell.

[Demo page](https://crt-terminal.vercel.app/).

# Features

1. Smooth printing
2. Command history
3. Loader
4. Ability lock command input
5. Typescript and React
6. Hooks-based with event queues under the hood
7. Zero additional dependencies

# Installation and basic usage

The best way to use crt-terminal is to install it from npm and include it into your app.

```
yarn add crt-terminal

npm install crt-terminal
```

Then you need to import `Terminal`, `useEventQueue` (or implement your own EventQueue) and line/words helpers (or corresponding enum with IDs).

**Important!** For better experience `Terminal` should be wrapped into a fixed size container.

```js
import React from 'react';
import { Terminal, useEventQueue, textLine, textWord, commandWord } from 'crt-terminal';

const bannerText = `
Hello world!

And not only world
`;

export default function App() {
  const eventQueue = useEventQueue();
  const { print } = eventQueue.handlers;

  return (
    <div style={{ width: '1000px', height: '600px' }}>
      <Terminal
        queue={eventQueue}
        banner={[textLine({ words: [textWord({ characters: bannerText })] })]}
        onCommand={(command) =>
          print([
            textLine({
              words: [
                textWord({ characters: 'You entered command: ' }),
                commandWord({ characters: command, prompt: '>' }),
              ],
            }),
          ])
        }
      />
    </div>
  );
}
```

# Advanced usage and API reference

## Required Props

1. `queue: QueueInterface` - object returned by `useEventQueue`, contains `state` and `api` fields;
2. `(command: string) => void` - function to be called every time new command is submitted;

## Optional props

1.  `prompt?: string` - prompt symbol before command input; default: `>\xa0`;
2.  `cursorSymbol?: string` - cursor symbol inside command input; default: `\xa0`;
3.  `maxHistoryCommands?: number` - max number of commands to be memorized in commands history; default: `10`;
4.  `banner?: PrintableItem` - message to be printed after `Terminal` is mounted; default: `undefined`.
5.  `loader?: Partial<LoaderConfig>` - loader config, consist of:

    - `slides: string[]` - array of consecutive loader states; default: `['.', '..', '...']`;
    - `loaderSpeed: number` - interval between state changes; default: `1000`;

6.  `printer?: Partial<PrinterConfig>` - printer config, consist of:

    - `printerSpeed: number` - interval between state changes; default: `20`;
    - `charactersPerTick: number` - characters to print on each tick; default: `5`;
    - `onPrintStatusChange?: (nextPrintState: boolean) => void` - callback which reports printer status (printing / not printing);

7.  `effects?` enabling or disabling following effects:

    - `scanner?: boolean` - scanner line; default: `true`;
    - `pixels?: boolean` - "pixels" effect; default: `true`;
    - `screenEffects?: boolean` - screen shaking; default: `true`;
    - `textEffects?: boolean` - text glow, pulsing; default: `true`;

## Event Queue

Event Queue is the main part of public interface through which component communicates with outer world. `useEventQueue` exports event creators in `handlers` field of returned object, namely:

1. `print: (payload: PrintableItem) => void` - prints a message on terminal "screen". **Important!** Print is async operation, so your next message will be printed as soon as the previous ones are done printing;
2. `clear: () => void` - clears terminal "screen" with respect to printing queue;
3. `focus: () => void` - focuses terminal input;
4. `lock: (payload: boolean) => void` - locks/unlocks terminal input preventing any user attempt to enter a command;
5. `loading: (payload: boolean) => void` - starts/ends loader. **Important!** Loading start locks input automatically, if it is not locked yet. Loading end unlocks input automatically, if it was locked **by loader**.

You can use these handlers everywhere to fully control behavior of your terminal.

If you don't like event creators, you can use `enqueue` function from `api` field of the object returned by `useEventQueue`. In this case you also need to import enums `PrinterEvents` and `TerminalEvents`. **Important!** To avoid possible bugs, you should pass a newly created object every time `enqueue` method is called.

## Sentence, Sentence Helpers

As one can notice `print` handler prints a `PrintableItem`. `PrintableItem` or sentence is an array of `Lines`. Line is essentially a new `div` on the screen, each line has field `words` containing array of `Words`. There are two types of lines:

1. `TextLine` (larger x-padding, no y-padding)
2. `CommandLine` (smaller x-padding, has y-padding).

**Important!** Each `Lines` and `Words` have common optional fields:

1. `data-crt-terminal` - can be defined for customization, better search, etc.
2. `className`
3. `id`

Word is essentially a new `span` inside a line. Word can be multilined. Each word has `characters` filed containing content of a word. There are following types of words:

1. `AnchorWord` - `<a>` element with optional `href` and `onClick` fields
2. `TextWord` - `<span>` element
3. `ButtonWord` - `<button>` element with optional `onClick` field
4. `CommandWord` - `<span>` element with required `prompt` field

There are two ways of creating `Lines` and `Words`:

1. Using helper functions `textWord`, `buttonWord`, `commandWord`, `anchorWord`, `commandLine`, `textLine`
2. Using object literals, in this cases you need to import `WordTypes`, `LineTypes` enums

## Styling

Every element inside terminal has special fixed style, to which you can safely refer to. You can also add your own `className` for lines and words.

## Command history

Command history saves entered commands, but no more then `maxHistoryCommands`. You can get previous/next saved command by pressing `Arrow Up` / `Arrow Down`

# Repo

It is a [turborepo](https://turborepo.org/)-based monorepo set up for testing and developing. Library itself is inside packages/crt-terminal, demo app is inside apps/web; to start locally just `yarn dev` in root folder.

# License

MIT Licensed. Copyright (c) Dmitriy Lipin 2022.
