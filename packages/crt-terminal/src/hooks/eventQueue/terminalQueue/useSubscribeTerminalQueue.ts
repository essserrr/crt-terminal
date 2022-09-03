import { useEffect, useState } from 'react';
import { Nullable } from '../../../utils/helpers';
import { TerminalControllerReturnType } from '../../useTerminalController';
import { TerminalEvents, TerminalQueueEvents, TerminalQueueReturnType } from './useTerminalQueue';

type ControllerTerminalHandlers = Pick<
  TerminalControllerReturnType['handlers'],
  'focus' | 'loading' | 'lock' | 'type'
>;

interface SubscribeQueueProps {
  controller: ControllerTerminalHandlers;
  queue: TerminalQueueReturnType;
}

type SubscribeQueueReturnType = ReturnType<typeof useSubscribeTerminalQueue>;

function useSubscribeTerminalQueue({
  controller: { focus, loading, lock, type },
  queue: {
    state: queueState,
    handlers: { dequeue, nextEvent },
  },
}: SubscribeQueueProps) {
  const [activeEvent, setActiveEvent] = useState<Nullable<TerminalQueueEvents>>(null);
  const nullifyActiveEvent = () => setActiveEvent(null);

  const interpretEvent = (event: TerminalQueueEvents) => {
    switch (event.type) {
      case TerminalEvents.FOCUS:
        focus();
        dequeue(nullifyActiveEvent);
        break;
      case TerminalEvents.LOADING:
        loading(event.payload);
        dequeue(nullifyActiveEvent);
        break;
      case TerminalEvents.LOCK:
        lock(event.payload);
        dequeue(nullifyActiveEvent);
        break;
      case TerminalEvents.TYPE:
        type(event.payload);
        dequeue(nullifyActiveEvent);
        break;
      default:
    }
  };

  useEffect(() => {
    const event = nextEvent();
    const isNew = activeEvent !== event;

    if (event && isNew) {
      setActiveEvent(event);
      interpretEvent(event);
    }
    // disabled due to inner structure: nextEvent and interpretEvent only matter when queue state updated, i.e. item enqueued or dequeued
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queueState, activeEvent]);
}

export type { SubscribeQueueProps, SubscribeQueueReturnType };
export { useSubscribeTerminalQueue };
