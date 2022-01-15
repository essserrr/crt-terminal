import 'jest';
import { mock } from 'jest-mock-extended';
import { preventActions, PreventProps } from './prevent-actions';

describe('Prevent default actions', () => {
  describe('preventActions', () => {
    it('should prevent default action', async () => {
      const event = mock<PreventProps>();

      preventActions(event);

      expect(event.preventDefault).toBeCalled();
      expect(event.preventDefault).toHaveBeenCalledTimes(1);
    });
  });
});
