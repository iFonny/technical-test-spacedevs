import { Box, Text } from '@chakra-ui/layout';
import { LaunchCard } from '@components/launches/launch-card';
import { useAppSelector } from '@redux/store';
import { Launches } from 'api/launches';
import { isEmpty } from 'lodash';
import { InfiniteData } from 'react-query';

interface Props {
  data: InfiniteData<Launches>;
}

export const LaunchesList = ({ data }: Props) => {
  const birthdate = useAppSelector((state) => state.filters.birthdate);

  if (!birthdate) return <Text>Please enter your birthdate</Text>;
  if (isEmpty(data.pages) || data.pages[0]?.count === 0) return <Text>No launches found</Text>;

  return (
    <>
      {data.pages.map((launchesData, i) => (
        <Box mb={4} key={i}>
          {launchesData.results.map((launch) => (
            <LaunchCard key={launch.id} launchData={launch} />
          ))}
        </Box>
      ))}
    </>
  );
};
