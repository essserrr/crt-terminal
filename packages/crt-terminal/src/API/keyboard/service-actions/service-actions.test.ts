import 'jest';
import { mock } from 'jest-mock-extended';
import { provideService, KnownServices } from './service-actions';
import { Keyboard } from '../actions/actions';

describe('Service actions', () => {
  const inputValue = '123';
  const renderValue = inputValue.split('');
  const cursorPosition = renderValue.length;

  const inputValueOutput = '7890';
  const renderValueOutput = inputValueOutput.split('');
  const cursorPositionOutput = renderValueOutput.length;

  it('arrow up', async () => {
    const services = mock<KnownServices>();
    services.prevCommand.calledWith().mockReturnValue(inputValueOutput);

    expect(
      provideService(
        {
          renderValue,
          inputValue,
          cursorPosition,
          services,
        },
        Keyboard.ARROW_UP,
      ),
    ).toEqual({
      renderValue: renderValueOutput,
      inputValue: inputValueOutput,
      cursorPosition: cursorPositionOutput,
    });
  });

  it('arrow up', async () => {
    const services = mock<KnownServices>();
    services.nextCommand.calledWith().mockReturnValue(inputValueOutput);

    expect(
      provideService(
        {
          renderValue,
          inputValue,
          cursorPosition,
          services,
        },
        Keyboard.ARROW_DOWN,
      ),
    ).toEqual({
      renderValue: renderValueOutput,
      inputValue: inputValueOutput,
      cursorPosition: cursorPositionOutput,
    });
  });
});
