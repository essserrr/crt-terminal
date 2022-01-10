import 'jest';
import { next, DEFAULT_SLIDE, createLoader } from './loader';

jest.useFakeTimers();

describe('Loader', () => {
  describe('next', () => {
    it('should go to the first slide if next slide >= slides array length', async () => {
      const slides = ['1', '2', '3'];
      const fixedResult = { slideIndex: 0, slide: slides[0] };

      [2, 3, 10].forEach((slideIndex) => expect(next({ slides, slideIndex })).toEqual(fixedResult));
    });

    it('should always return first slide for slides with length <= 1', async () => {
      [['1'], []].forEach((slides) => {
        const fixedResult = { slideIndex: 0, slide: slides[0] || DEFAULT_SLIDE };

        [-2, 0, 1].forEach((slideIndex) =>
          expect(next({ slides, slideIndex })).toEqual(fixedResult),
        );
      });
    });

    it('should go to the next slide', async () => {
      const slides = ['1', '2', '3'];

      [0, 1].forEach((slideIndex) =>
        expect(next({ slides, slideIndex })).toEqual({
          slideIndex: slideIndex + 1,
          slide: slides[slideIndex + 1],
        }),
      );
    });
  });

  describe('createLoader', () => {
    it("loader should call it's callback after given interval", async () => {
      const callback = jest.fn();

      createLoader(callback, 10);
      expect(callback).not.toBeCalled();

      jest.advanceTimersByTime(10);
      expect(callback).toBeCalled();
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
