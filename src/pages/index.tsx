import { GreenSpinner } from '@app/components';
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
      <div className="flex min-h-screen flex-col items-center justify-center">
        <GreenSpinner className="h-10 w-10 animate-spin text-emerald-500" />
      </div>
    </>
  );
}
