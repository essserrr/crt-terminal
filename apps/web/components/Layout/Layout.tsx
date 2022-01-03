import React, { PropsWithChildren } from 'react';
import classes from './layout.module.scss';

const Layout = function Layout({ children }: PropsWithChildren<{}>) {
  return <div className={classes.layout}>{children}</div>;
};

export default Layout;
