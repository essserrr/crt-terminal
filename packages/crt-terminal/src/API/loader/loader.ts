type Slide = string;

type Slides = Slide[];

interface LoaderResponse {
  slideIndex: number;
  slide: Slide;
}

interface LoaderRequest {
  slideIndex: number;
  slides: Slides;
}

const DEFAULT_SLIDE = '';
const DEFAULT_SLIDE_INDEX = -1;

const next = ({ slides, slideIndex }: LoaderRequest): LoaderResponse => {
  const newIndex = slideIndex + 1;
  const slide = slides[newIndex];
  if (slide) return { slideIndex: newIndex, slide };
  return { slideIndex: 0, slide: slides[0] || DEFAULT_SLIDE };
};

const createLoader = (nextSlide: () => void, loaderSpeed: number) =>
  setTimeout(() => nextSlide(), loaderSpeed);

export type { Slide, Slides, LoaderResponse, LoaderRequest };
export { next, createLoader, DEFAULT_SLIDE, DEFAULT_SLIDE_INDEX };
