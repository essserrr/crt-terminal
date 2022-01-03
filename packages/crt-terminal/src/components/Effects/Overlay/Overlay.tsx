import React from 'react';
import classes from './overlay.module.scss';

interface OverlayProps {
  scanner: boolean;
  pixels: boolean;
}

const Overlay = function Overlay({ scanner, pixels }: OverlayProps) {
  return (
    <div className={[classes.overlay, 'crt-overlay'].join(' ')}>
      {scanner && <div className={[classes.scanner, 'crt-scanner'].join(' ')} />}
      {pixels && <div className={[classes.pixels, 'crt-pixels'].join(' ')} />}
    </div>
  );
};

export type { OverlayProps };
export default Overlay;
