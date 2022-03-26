import { Box, Heading, Container, Text } from '@chakra-ui/react';
import { InputDate } from '@components/inputDate';
import { LaunchCard } from '@components/launches/launch-card';
import { useFavorites } from '@hooks/useFavorites';
import { isEmpty } from 'lodash';

const Home = () => {
  const { favorites } = useFavorites();
  const arrayOfFavorites = Object.values(favorites);

  return (
    <Box textAlign="center" mt={3} paddingX={5}>
      <Container maxWidth="container.lg" centerContent mt={5}>
        <InputDate />

        <Heading size="lg" mt={6}>
          Favorites
        </Heading>
        <Box mt={2} mb={4} width="full">
          {isEmpty(arrayOfFavorites) ? (
            <Text>No favorites found</Text>
          ) : (
            arrayOfFavorites.map((launch) => <LaunchCard key={launch.id} launchData={launch} />)
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
