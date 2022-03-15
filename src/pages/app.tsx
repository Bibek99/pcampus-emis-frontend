import { GreenSpinner } from '@app/components';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const AppLoading = () => (
  <div className="flex min-h-screen flex-col items-center justify-center">
    <GreenSpinner className="h-10 w-10 animate-spin text-emerald-500" />
  </div>
);

const AppComponent = dynamic<{}>(
  () => import('@app/App').then((module) => module.App),
  {
    ssr: false,
    loading: () => <AppLoading />,
  }
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>Pulchowk EMIS</title>
      </Head>
      {isLoading ? <AppLoading /> : <AppComponent />}
    </>
  );
};

export default App;
