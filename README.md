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
import { Terminal, useEventQueue, textLine, textWord } from 'crt-terminal';

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

1. `queue: QueueInterface` - `state` and `api` of `useEventQueue`
2. `(command: string) => void` - function to be called every time new command is submitted

## Optional props

1.  `prompt?: string` - prompt symbol before command input
2.  `cursorSymbol?: string` - function to be called every time new command is submitted
3.  `maxHistoryCommands?: number` - max number of commands to be memorized in commands history
4.  `banner?: PrintableItem` - message to be printed after `Terminal` is mounted
5.  `loader?: Partial<LoaderConfig>` - loader config, consist of:

    - `slides: string[]` - array of consecutive loader states
    - `loaderSpeed: number` - interval between state changes

6.  `printer?: Partial<PrinterConfig>` - printer config, consist of:

    - `printerSpeed: number` - interval between state changes
    - `charactersPerTick: number` - characters to print on each tick

7.  `effects?` enabling or disabling following effects:

    - `scanner?: boolean` - scanner line
    - `pixels?: boolean` - "pixels" effect
    - `screenEffects?: boolean` - screen shaking
    - `textEffects?: boolean` - text glow pulsing

## Event Queue

The main part of public interface through which component communicates with outer world. `useEventQueue` exports event creators in `handlers` field of return object, namely:

1. `print: (payload: PrintableItem) => void` - prints a message on terminal "screen". **Important!** Print is async operation, so your next message will be printed as soon as the previous one is finished
2. `clear: () => void` - clears terminal "screen" with respect to printing queue
3. `focus: () => void` - focuses terminal input
4. `lock: (payload: boolean) => void` - locks/unlocks terminal input preventing any user attempt to enter a command
5. `loading: (payload: boolean) => void` - starts/ends loader. **Important!** Loading start locks input automatically, if it is not locked yet. Loading end unlocks input automatically, if it was locked **by loader**

You can use these handlers everywhere to fully control behavior of tour terminal.

If you don't like event creators, you can use `enqueue` from `api` field of return object. In this case you also need to import enums `PrinterEvents` and `TerminalEvents`. **Important!** To avoid possible bugs, you should pass newly created object into `enqueue` method

## Sentence, Sentence Helpers

As one can notice `print` handler prints a `PrintableItem`. `PrintableItem` or sentence is an array of `Lines`. Line is essentially a new `div` on the screen, each line has field `words` with array of `Words`. There are two types of lines:

1. `TextLine` (larger x-padding, no y-padding)
2. `CommandLine` (smaller x-padding, y-padding).

**Important!** Each `Lines` and `Words` have common optional fields:

1. `dataAttribute` - `data-crt-terminal` attribute
2. `className`
3. `id`

Word is essentially a new `span` inside line. Word can be multilined, but aware of span intereactions whe one of them is multilined. Each word has `characters` filed with content of a word. There are quite few types of words:

1. `AnchorWord` - `<a>` element with optional `href` and `onClick` fields
2. `TextWord` - `<span>` element
3. `ButtonWord` - `<button>` element with optional `onClick` field
4. `CommandWord` - `<span>` element with required `prompt` field

There are two ways of creating `Lines` and `Words`:

1. Using helper functions `textWord`, `buttonWord`, `commandWord`, `anchorWord`, `commandLine`, `textLine`
2. Using object literals, in this cases you need to import `WordTypes`, `LineTypes` enums

## Styling

Every element inside terminal has special fixed style you can safely refer to. You can also add your own `className` for lines and words.

## Command history

Command history saves entered commands, but no more then `maxHistoryCommands`. You can get previous/next saved command by pressing `Arrow Up` / `Arrow Down`

# Repo

It is a [turborepo](https://turborepo.org/)-based monorepo set up for testing and developing. Library itself is inside packages/crt-terminal, demo app is inside apps/web; to start locally just `yarn dev` in root folder.

# License

MIT Licensed. Copyright (c) Dmitriy Lipin 2022.
