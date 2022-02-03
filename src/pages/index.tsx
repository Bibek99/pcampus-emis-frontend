import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/app');
  }, [router]);

  return (
    <>
      <Head>
        <title>Pulchowk EMIS</title>
      </Head>
      <div className="justtify-center flex flex-col items-center">
        <span>Loading App</span>
      </div>
    </>
  );
}
