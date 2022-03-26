import { Box, Heading, Container } from '@chakra-ui/react';
import { InputDate } from '@components/inputDate';

const Home = () => {
  return (
    <Box textAlign="center" mt={3} paddingX={5}>
      <Container maxWidth="container.xl" centerContent mt={5}>
        <InputDate />

        <Heading size="lg" mt={4}>
          Favorites
        </Heading>
        <Box mt={4}>TODO....</Box>
      </Container>
    </Box>
  );
};

export default Home;
