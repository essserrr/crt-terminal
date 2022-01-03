import { useEffect, useState } from 'react';
import { Nullable } from '../../../utils/helpers';
import { TerminalControllerReturnType } from '../../useTerminalController';
import { PrinterEvents, PrinterQueueEvents, PrinterQueueReturnType } from './usePrinterQueue';

type ControllerPrintHandlers = Pick<TerminalControllerReturnType['handlers'], 'clear' | 'print'>;

interface SubscribeQueueProps {
  controller: ControllerPrintHandlers;
  queue: PrinterQueueReturnType;
}

type SubscribeQueueReturnType = ReturnType<typeof useSubscribePrinterQueue>;

function useSubscribePrinterQueue({
  controller: { clear, print },
  queue: {
    state: queueState,
    handlers: { dequeue, nextEvent },
  },
}: SubscribeQueueProps) {
  const [activeEvent, setActiveEvent] = useState<Nullable<PrinterQueueEvents>>(null);
  const nullifyActiveEvent = () => setActiveEvent(null);

  const interpretEvent = async (event: PrinterQueueEvents) => {
    switch (event.type) {
      case PrinterEvents.CLEAR:
        clear();
        dequeue(nullifyActiveEvent);
        break;
      case PrinterEvents.PRINT:
        await print(event.payload);
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
export { useSubscribePrinterQueue };
