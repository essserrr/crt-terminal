import { useState, useEffect } from 'react';
import {
  next,
  createLoader,
  Slides,
  DEFAULT_SLIDE_INDEX,
  DEFAULT_SLIDE,
} from '../../API/loader/loader';

type LoaderReturnType = ReturnType<typeof useLoader>;

type SetStateCallback = (newInput: string) => void;

interface LoaderConfig {
  slides: Slides;
  loaderSpeed: number;
}

interface LoaderProps extends LoaderConfig {
  onSetOuterState: SetStateCallback;
}

type IntervalID = ReturnType<typeof setTimeout>;

function useLoader({ slides, loaderSpeed, onSetOuterState }: LoaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [slideIndex, setSlide] = useState<number>(DEFAULT_SLIDE_INDEX);
  const [activeTimeout, setActiveTimeout] = useState<IntervalID | null>(null);

  const clearTimeoutState = () => {
    if (activeTimeout) {
      clearTimeout(activeTimeout);
      setActiveTimeout(null);
    }
  };

  const nextSlide = (setOuterState: SetStateCallback) => () => {
    const { slide, slideIndex: newSlideIndex } = next({ slides, slideIndex });
    setSlide(newSlideIndex);
    setOuterState(slide);
    setActiveTimeout(null);
  };

  const startLoading = () => {
    setIsLoading(true);
    nextSlide(onSetOuterState)();
  };

  const endLoading = () => {
    setIsLoading(false);
    onSetOuterState(DEFAULT_SLIDE);
    setSlide(DEFAULT_SLIDE_INDEX);
  };

  useEffect(() => {
    const shouldStopLoading = !isLoading && activeTimeout;
    const shouldLoad = isLoading && !activeTimeout;

    if (shouldLoad) {
      setActiveTimeout(createLoader(nextSlide(onSetOuterState), loaderSpeed));
    } else if (shouldStopLoading) {
      clearTimeoutState();
    }
    return () => {};
    // disabled due to inner structure: nextSlide only matters when activeTimeout or isLoading updated
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, activeTimeout]);

  useEffect(
    () => () => clearTimeoutState(),
    // disabled due to inner structure: should be equal to "onBeforeUnmount"
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    isLoading,
    handlers: {
      startLoading,
      endLoading,
    },
  };
}

export type { LoaderProps, LoaderConfig, LoaderReturnType };
export { useLoader };
