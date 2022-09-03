import { useEffect, useState } from 'react';
import { Nullable } from '../../utils/helpers';
import { PrinterEvents, usePrinterQueue } from './printerQueue/usePrinterQueue';
import { useSubscribePrinterQueue } from './printerQueue/useSubscribePrinterQueue';
import { TerminalEvents, useTerminalQueue } from './terminalQueue/useTerminalQueue';
import { useSubscribeTerminalQueue } from './terminalQueue/useSubscribeTerminalQueue';

import { TerminalControllerReturnType } from '../useTerminalController';
import { EventQueueReturnType, InterfaceEvent } from './useEventQueue';

type SubscribeQueue = Pick<EventQueueReturnType, 'api' | 'state'>;

interface SubscribeQueueProps {
  controller: TerminalControllerReturnType['handlers'];
  queue: SubscribeQueue;
}

type SubscribeQueueReturnType = ReturnType<typeof useSubscribeEventQueue>;

function useSubscribeEventQueue({
  controller,
  queue: {
    state: queueState,
    api: { dequeue, nextEvent },
  },
}: SubscribeQueueProps) {
  const [activeEvent, setActiveEvent] = useState<Nullable<InterfaceEvent>>(null);
  const nullifyActiveEvent = () => setActiveEvent(null);

  const printerQueue = usePrinterQueue();
  const {
    handlers: { print: printerPrint, clear: printerClear },
  } = printerQueue;
  useSubscribePrinterQueue({ queue: printerQueue, controller });

  const terminalQueue = useTerminalQueue();
  const {
    handlers: {
      focus: terminalFocus,
      loading: terminalLoading,
      lock: terminalLock,
      type: terminalType,
    },
  } = terminalQueue;
  useSubscribeTerminalQueue({ queue: terminalQueue, controller });

  const interpretEvent = (event: InterfaceEvent) => {
    switch (event.type) {
      case TerminalEvents.FOCUS:
        terminalFocus();
        dequeue(nullifyActiveEvent);
        break;
      case TerminalEvents.LOADING:
        terminalLoading(event.payload);
        dequeue(nullifyActiveEvent);
        break;
      case TerminalEvents.LOCK:
        terminalLock(event.payload);
        dequeue(nullifyActiveEvent);
        break;
      case TerminalEvents.TYPE:
        terminalType(event.payload);
        dequeue(nullifyActiveEvent);
        break;
      case PrinterEvents.CLEAR:
        printerClear();
        dequeue(nullifyActiveEvent);
        break;
      case PrinterEvents.PRINT:
        printerPrint(event.payload);
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

export type { SubscribeQueueProps, SubscribeQueueReturnType, SubscribeQueue };
export { useSubscribeEventQueue };
