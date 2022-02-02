import { Center } from '@chakra-ui/react';
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
      <Center>Loading</Center>
    </>
  );
}
