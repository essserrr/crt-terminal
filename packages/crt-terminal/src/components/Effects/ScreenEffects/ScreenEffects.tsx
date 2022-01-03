import React, { PropsWithChildren } from 'react';
import classes from './screen-effects.module.scss';

interface ScreenEffectsProps {
  enabled: boolean;
}

const ScreenEffects = function ScreenEffects({
  enabled,
  children,
}: PropsWithChildren<ScreenEffectsProps>) {
  return (
    <>
      {enabled ? (
        <div className={[classes.screenEffects, 'crt-screen-effects'].join(' ')}>{children}</div>
      ) : (
        children
      )}
    </>
  );
};

export type { ScreenEffectsProps };
export default ScreenEffects;
