import { usePrinter, PrinterProps } from './usePrinter';

type CommandScreenReturnType = ReturnType<typeof useCommandScreen>;

interface CommandScreenProps {
  printerConfig: PrinterProps;
}

function useCommandScreen({ printerConfig }: CommandScreenProps) {
  const {
    state,
    handlers: { startPrint, clear },
  } = usePrinter(printerConfig);

  return {
    state,
    handlers: {
      print: startPrint,
      clear,
    },
  };
}

export type { CommandScreenReturnType };
export { useCommandScreen };
