import { AlertDescription, AlertIcon, Box, Alert, Heading, Spinner, Center, Text, Button } from '@chakra-ui/react';
import { useGetLaunches } from 'api/launches/hooks';
import { useAppSelector } from '@redux/store';
import { format, parseISO } from 'date-fns';
import { InputDate } from '@components/inputDate';
import { getPeriodIntervalFilter } from 'api/launches/utils';
import { LaunchesList } from '@components/launches/list';
import { LaunchesFilters } from '@components/launches/filters';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

const PageLaunches = () => {
  const { ref, inView } = useInView();
  const birthdate = useAppSelector((state) => state.filters.birthdate);
  const period = useAppSelector((state) => state.filters.period);

  const { isLoading, isSuccess, isError, data, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetLaunches();

  const getFormatedInterval = () => {
    const { net__gte, net__lte } = getPeriodIntervalFilter(birthdate, period);

    return `${format(parseISO(net__gte), 'P')} - ${format(parseISO(net__lte), 'P')}`;
  };

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  return (
    <Box textAlign="center" mt={3} paddingX={5}>
      {birthdate && period ? (
        <Box>
          <Heading mb={3}>Launches {data?.pages[0]?.count > 0 && `(${data?.pages[0]?.count})`}</Heading>
          <Text>Period: {getFormatedInterval()}</Text>
        </Box>
      ) : (
        <Center mt={5} mb={3}>
          <InputDate />
        </Center>
      )}

      {isError && (
        <Box marginY={4}>
          <Alert status="error" borderRadius={4}>
            <AlertIcon />
            <AlertDescription>{error?.response?.data?.message || error.message}</AlertDescription>
          </Alert>
        </Box>
      )}

      {birthdate && <LaunchesFilters />}

      {isLoading && <Spinner />}

      {isSuccess && data && (
        <>
          <LaunchesList data={data} />

          {hasNextPage && (
            <Button ref={ref} mb={4} onClick={() => fetchNextPage()} isLoading={isFetchingNextPage}>
              Load more
            </Button>
          )}
        </>
      )}
    </Box>
  );
};

export default PageLaunches;
