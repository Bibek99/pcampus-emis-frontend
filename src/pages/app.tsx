import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useEffect, useState } from 'react';

const AppLoading = () => (
  <div className="flex flex-col items-center justify-center">
    <span>Loading...</span>
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
