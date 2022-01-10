import 'jest';
import { next, DEFAULT_SLIDE, Slides } from './loader';

describe('Loader', () => {
  describe('next', () => {
    it('should go to the first slide if next slide >= slides array length', async () => {
      const slides = ['1', '2', '3'];
      const fixedResult = { slideIndex: 0, slide: slides[0] };

      [2, 3, 10].forEach((slideIndex) => expect(next({ slides, slideIndex })).toEqual(fixedResult));
    });

    it('should go to the next slide', async () => {
      const slides = ['1', '2', '3'];

      expect(next({ slides, slideIndex: 0 })).toEqual({ slideIndex: 1, slide: slides[1] });
    });

    it('should always return first slide for slides array with lenth === 1', async () => {
      const slidesShort = ['1'];
      const fixedResult = { slideIndex: 0, slide: slidesShort[0] };

      [-1, 0, 1].forEach((slideIndex) =>
        expect(next({ slides: slidesShort, slideIndex })).toEqual(fixedResult),
      );
    });

    it('should always return default slide with index 0 for empty slides array', async () => {
      const slidesShort = [] as Slides;
      const fixedResult = { slideIndex: 0, slide: DEFAULT_SLIDE };

      [-1, 0, 1].forEach((slideIndex) =>
        expect(next({ slides: slidesShort, slideIndex })).toEqual(fixedResult),
      );
    });
  });
});
