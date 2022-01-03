import React, { PropsWithChildren } from 'react';
import classes from './character.module.scss';

interface CharacterProps {
  selected?: boolean;
}

const Character = function Character({
  children,
  selected = false,
}: PropsWithChildren<CharacterProps>) {
  const selectedStyle = selected ? classes.characterSelected : '';

  return (
    <span className={[classes.character, selectedStyle, 'crt-character'].join(' ')}>
      {children}
    </span>
  );
};

export default Character;
