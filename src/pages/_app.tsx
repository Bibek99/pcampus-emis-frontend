import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { Providers } from '@app/Providers';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { ToastContainer } from 'react-toastify';
import { isBrowser } from '@utils/windowType';
import Head from 'next/head';

if (isBrowser) {
  injectStyle();
}

const AppHead = () => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <AppHead />
      <Providers>
        <Component {...pageProps} />
      </Providers>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default MyApp;
