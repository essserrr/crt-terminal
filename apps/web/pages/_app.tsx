import React from 'react';
import { AppProps } from 'next/app';
import './_app.css';

const App = function App({ Component: AppChildComponent, pageProps }: AppProps) {
  return <AppChildComponent {...pageProps} />;
};

export default App;
