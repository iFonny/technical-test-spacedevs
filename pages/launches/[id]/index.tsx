import { Alert, AlertDescription, AlertIcon, Box, Heading, Spinner } from '@chakra-ui/react';
import { useGetLaunch } from 'api/launches/hooks';
import { GetServerSideProps } from 'next';
import { LaunchDetails } from '@components/launches/launch-details';

interface PageProps {
  id: string;
}

function PageLaunch({ id }: PageProps) {
  const { isLoading, isSuccess, isError, data, error } = useGetLaunch(id, { retry: false });

  return (
    <Box textAlign="center" mt={3}>
      <Heading mb={4}>Launch Details</Heading>

      {isError && (
        <Box marginY={4}>
          <Alert status="error" borderRadius={4}>
            <AlertIcon />
            <AlertDescription>{error?.response?.data?.message || error.message}</AlertDescription>
          </Alert>
        </Box>
      )}

      {isLoading && <Spinner />}

      {isSuccess && <LaunchDetails launchData={data} />}
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async ({ params }) => {
  const { id } = params;

  return { props: { id: id as string } };
};

export default PageLaunch;
