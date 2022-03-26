import { Box, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { LaunchCard } from '@components/launches/launch-card';
import { useAppSelector } from '@redux/store';
import { Launches } from 'src/api/launches';
import { isEmpty } from 'lodash';

interface Props {
  launchesData: Launches;
  isLoading: boolean;
}

export const LaunchesList = ({ launchesData, isLoading }: Props) => {
  const birthDate = useAppSelector((state) => state.filters.birthdate);

  if (!birthDate) return <Text>Please enter your birthdate</Text>;
  if (isEmpty(launchesData.results)) return <Text>No launches found</Text>;

  const cards = launchesData.results.map((launch) => <LaunchCard key={launch.id} launchData={launch} />);
  return (
    <Box>
      {cards}
      {launchesData.next && <Button m={4}>Show more</Button>}
    </Box>
  );
};
