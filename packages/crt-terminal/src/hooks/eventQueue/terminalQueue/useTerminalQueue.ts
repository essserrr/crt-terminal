import { useState, useRef } from 'react';

enum TerminalEvents {
  FOCUS = 'FOCUS',
  LOCK = 'LOCK',
  LOADING = 'LOADING',
  TYPE = 'TYPE',
}

interface FocusEvent {
  type: TerminalEvents.FOCUS;
}

interface LockEvent {
  type: TerminalEvents.LOCK;
  payload: boolean;
}

interface LoadingEvent {
  type: TerminalEvents.LOADING;
  payload: boolean;
}

interface TypeEvent {
  type: TerminalEvents.TYPE;
  payload: string;
}

type TerminalQueueEvents = FocusEvent | LockEvent | LoadingEvent | TypeEvent;

type TerminalQueue = TerminalQueueEvents[];

type TerminalQueueReturnType = ReturnType<typeof useTerminalQueue>;

const defaultQueue: TerminalQueue = [];

function useTerminalQueue() {
  const { current: queue } = useRef(defaultQueue);
  const [queueState, setQueueState] = useState<TerminalQueue>([...defaultQueue]);

  const enqueue = (event: TerminalQueueEvents) => {
    queue.push(event);
    setQueueState([...queue]);
  };
  const dequeue = (afterDequeue: () => void) => {
    queue.shift();
    setQueueState([...queue]);
    afterDequeue();
  };

  const nextEvent = (): TerminalQueueEvents | undefined => queueState[0];

  const focus = () => {
    enqueue({
      type: TerminalEvents.FOCUS,
    });
  };

  const lock = (payload: boolean) => {
    enqueue({
      type: TerminalEvents.LOCK,
      payload,
    });
  };

  const loading = (payload: boolean) => {
    enqueue({
      type: TerminalEvents.LOADING,
      payload,
    });
  };

  const type = (payload: string) => {
    enqueue({
      type: TerminalEvents.TYPE,
      payload,
    });
  };

  return {
    state: queueState,
    handlers: {
      focus,
      lock,
      loading,
      type,
      dequeue,
      nextEvent,
    },
  };
}

export type {
  FocusEvent,
  LockEvent,
  LoadingEvent,
  TypeEvent,
  TerminalQueueEvents,
  TerminalQueueReturnType,
};
export { useTerminalQueue, TerminalEvents };
