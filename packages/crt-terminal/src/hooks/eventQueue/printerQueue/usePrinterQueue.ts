import { useState, useRef } from 'react';
import { PrintableItem } from '../../../API/printer';

enum PrinterEvents {
  PRINT = 'PRINT',
  CLEAR = 'CLEAR',
}

interface ClearEvent {
  type: PrinterEvents.CLEAR;
}

interface PrintEvent {
  type: PrinterEvents.PRINT;
  payload: PrintableItem;
}

type PrinterQueueEvents = ClearEvent | PrintEvent;

type PrinterQueue = PrinterQueueEvents[];

type PrinterQueueReturnType = ReturnType<typeof usePrinterQueue>;

const defaultQueue: PrinterQueue = [];

function usePrinterQueue() {
  const { current: queue } = useRef(defaultQueue);
  const [queueState, setQueueState] = useState<PrinterQueue>([...defaultQueue]);

  const enqueue = (event: PrinterQueueEvents) => {
    queue.push(event);
    setQueueState([...queue]);
  };
  const dequeue = (afterDequeue: () => void) => {
    queue.shift();
    setQueueState([...queue]);
    afterDequeue();
  };

  const nextEvent = (): PrinterQueueEvents | undefined => queueState[0];

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

  return {
    state: queueState,
    handlers: {
      print,
      clear,
      dequeue,
      nextEvent,
    },
  };
}

export type { PrintEvent, ClearEvent, PrinterQueueEvents, PrinterQueueReturnType };
export { usePrinterQueue, PrinterEvents };
