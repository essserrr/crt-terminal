import React from 'react';
import {
  Terminal,
  useEventQueue,
  textLine,
  commandLine,
  textWord,
  anchorWord,
  buttonWord,
  commandWord,
} from 'crt-terminal';
import Layout from '../components/Layout/Layout';
import classes from './index.module.scss';

const banner = `
Long multiline:

The quick brown fox jumps over the lazy dog

Very long word:
foooooooooooooooooooooooooooooooooooooooooo
`;

export default function Web() {
  const eventQueue = useEventQueue();
  const { lock, loading, clear, print, type, focus } = eventQueue.handlers;
  return (
    <Layout>
      <main className={classes.mainContainer}>
        <Terminal
          queue={eventQueue}
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
          banner={[
            textLine({ words: [textWord({ characters: banner })] }),
            commandLine({
              words: [
                commandWord({ characters: 'command word', prompt: '>' }),
                textWord({ characters: ' - command line with command' }),
              ],
            }),
            textLine({
              className: classes.customLine,
              words: [textWord({ characters: 'custom text lines:' })],
            }),
            textLine({
              className: classes.customWord,
              words: [textWord({ className: classes.customWord, characters: 'custom text word' })],
            }),
            textLine({
              className: classes.customLine,
              words: [
                anchorWord({
                  characters: 'anchor word',
                  href: 'https://github.com/essserrr/crt-terminal/',
                }),
              ],
            }),
            textLine({
              className: classes.customLine,
              words: [
                buttonWord({
                  characters: 'button word',
                  /* eslint-disable-next-line */
                  onClick: () => alert('You clicked a button'),
                }),
              ],
            }),
            textLine({
              className: classes.customLine,
              words: [commandWord({ characters: 'command word', prompt: '>' })],
            }),
          ]}
        />
      </main>
      <div className={classes.buttonsContainer}>
        <button className={classes.button} onClick={() => lock(true)} type="button">
          Lock
        </button>
        <button className={classes.button} onClick={() => lock(false)} type="button">
          Unlock
        </button>
        <button className={classes.button} onClick={() => loading(true)} type="button">
          Start loading
        </button>
        <button className={classes.button} onClick={() => loading(false)} type="button">
          End loading
        </button>
        <button className={classes.button} onClick={() => clear()} type="button">
          Clear
        </button>
        <button
          className={classes.button}
          onClick={() => {
            print([
              textLine({
                words: [
                  textWord({
                    characters: 'Hello world! Hello world! Hello world!',
                  }),
                ],
              }),
            ]);
            print([
              textLine({
                words: [
                  textWord({
                    characters: 'Hello world! Hello world! Hello world!',
                  }),
                ],
              }),
            ]);
            print([
              textLine({
                words: [
                  textWord({
                    characters: 'Hello world! Hello world! Hello world!',
                  }),
                ],
              }),
            ]);
          }}
          type="button"
        >
          Print
        </button>
        <button className={classes.button} onClick={() => type('Hello')} type="button">
          Type
        </button>
        <button className={classes.button} onClick={() => focus()} type="button">
          Focus
        </button>
      </div>
    </Layout>
  );
}
