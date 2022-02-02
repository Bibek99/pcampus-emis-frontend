import { Flex, Progress } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const AppLoading = () => (
  <Flex flex={1} align={'flex-start'}>
    <Progress w={'full'} h={'0.4rem'} isIndeterminate />
  </Flex>
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

  return isLoading ? <AppLoading /> : <AppComponent />;
};

export default App;
