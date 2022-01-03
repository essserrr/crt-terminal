import React, { PropsWithChildren } from 'react';
import classes from './text-effects.module.scss';

interface TextEffectsProps {
  enabled: boolean;
}

const TextEffects = function TextEffects({
  enabled,
  children,
}: PropsWithChildren<TextEffectsProps>) {
  return (
    <>
      {enabled ? (
        <div className={[classes.textEffects, 'crt-text-effects'].join(' ')}>{children}</div>
      ) : (
        children
      )}
    </>
  );
};

export default TextEffects;
