import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Providers } from '@app/Providers';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { ToastContainer } from 'react-toastify';
import { isBrowser } from '@utils/windowType';

if (isBrowser) {
  injectStyle();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Providers>
        <Component {...pageProps} />
      </Providers>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default MyApp;
