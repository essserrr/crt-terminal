import React, { memo } from 'react';
import { RenderList } from '../../../../hooks/terminal/useCommandLine';
import Character from '../../../Character/Character';

interface InputStringProps {
  cursorPosition: number;
  renderValue: RenderList;
}

const InputString = memo(({ cursorPosition, renderValue }: InputStringProps) => (
  <>
    {renderValue.map((character, key) => (
      <Character selected={cursorPosition === key} key={key}>
        {character}
      </Character>
    ))}
  </>
));

export default InputString;
