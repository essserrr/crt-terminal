import React, { PropsWithChildren } from 'react';
import classes from './character.module.scss';

interface CharacterProps {
  selected?: boolean;
  className?: string;
}

const Character = function Character({
  children,
  selected = false,
  className = '',
}: PropsWithChildren<CharacterProps>) {
  const selectedStyle = selected ? classes.characterSelected : '';

  return (
    <span className={[classes.character, selectedStyle, className, 'crt-character'].join(' ')}>
      {children}
    </span>
  );
};

export default Character;
