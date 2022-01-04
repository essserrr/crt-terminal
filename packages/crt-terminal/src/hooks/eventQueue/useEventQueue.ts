import { useState, useRef } from 'react';
import { PrintableItem } from '../../API/printer';
import { PrinterEvents, ClearEvent, PrintEvent } from './printerQueue/usePrinterQueue';
import {
  TerminalEvents,
  FocusEvent,
  LockEvent,
  LoadingEvent,
} from './terminalQueue/useTerminalQueue';

type InterfaceEvent = FocusEvent | ClearEvent | PrintEvent | LockEvent | LoadingEvent;

type EventQueue = InterfaceEvent[];

type EventQueueReturnType = ReturnType<typeof useEventQueue>;

const defaultQueue: EventQueue = [];

function useEventQueue() {
  const { current: queue } = useRef(defaultQueue);
  const [queueState, setQueueState] = useState<EventQueue>([...defaultQueue]);

  const enqueue = (event: InterfaceEvent) => {
    queue.push(event);
    setQueueState([...queue]);
  };
  const dequeue = (afterDequeue: () => void) => {
    queue.shift();
    setQueueState([...queue]);
    afterDequeue();
  };
  const nextEvent = (): InterfaceEvent | undefined => queueState[0];

  const print = (payload: PrintableItem) => {
    enqueue({
      type: PrinterEvents.PRINT,
      payload,
    });
  };

  const clear = () => {
    enqueue({
      type: PrinterEvents.CLEAR,
    });
  };

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

  return {
    state: queueState,
    api: { enqueue, dequeue, nextEvent },
    handlers: {
      print,
      clear,
      focus,
      lock,
      loading,
    },
  };
}

export type { EventQueue, InterfaceEvent, EventQueueReturnType };
export { useEventQueue, PrinterEvents, TerminalEvents };
