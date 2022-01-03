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

const msg = `
Long multiline:

22222222222222222222222222222222222222222222222
333333333333333333333333333333
44444444444444444444444444444444444444444
5555555555555555555555555555

dddddddddddddddddddddddddddddddddd
`;

export default function Web() {
  const eventQueue = useEventQueue();
  const { lock, loading, clear, print, focus } = eventQueue.handlers;
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
            textLine({ words: [textWord({ characters: msg })] }),
            commandLine({
              words: [
                commandWord({ characters: 'command word', prompt: '>' }),
                textWord({ characters: ' - command line with command' }),
              ],
            }),
            textLine({
              words: [textWord({ characters: 'text word' })],
            }),
            textLine({
              words: [anchorWord({ characters: 'anchor word', href: 'hello' })],
            }),
            textLine({
              words: [
                buttonWord({
                  characters: 'button word',
                  onClick: () => console.log('hello'),
                }),
              ],
            }),
            textLine({
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
        <button className={classes.button} onClick={() => focus()} type="button">
          Focus
        </button>
      </div>
    </Layout>
  );
}
