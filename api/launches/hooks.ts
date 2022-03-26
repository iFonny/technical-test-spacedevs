import { useAppSelector } from '@redux/store';
import { AxiosError } from 'axios';
import { useInfiniteQuery, UseInfiniteQueryOptions, useQuery, UseQueryOptions } from 'react-query';
import { getRequestFilters } from 'api/launches/utils';
import { getLaunches, getLaunchById, Launch, Launches, LaunchesRequestFilters } from '.';

export const serverStateKeys = {
  launch: (launchId: string) => ['launch', launchId],
  launches: (filters?: LaunchesRequestFilters) => ['launches', filters],
};

// Queries
export const useGetLaunch = (launchId: string, options?: UseQueryOptions<Launch>) => {
  return useQuery<Launch, AxiosError>(serverStateKeys.launch(launchId), () => getLaunchById(launchId), options);
};

export const useGetLaunches = (options?: UseInfiniteQueryOptions<Launches>) => {
  const filters = useAppSelector((state) => state.filters);
  const reqFilters = getRequestFilters(filters);

  return useInfiniteQuery<Launches, AxiosError>(
    serverStateKeys.launches(reqFilters),
    ({ pageParam }) => getLaunches(reqFilters, pageParam),
    {
      ...options,
      getNextPageParam: (lastPage) => lastPage?.next || undefined,
    },
  );
};
