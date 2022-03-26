import { SmallLaunch } from 'api/launches';
import { isNil, omitBy } from 'lodash';
import useLocalStorageState from 'use-local-storage-state';

export const useFavorites = (launchId?: string) => {
  const [values, setValue] = useLocalStorageState<{ [key in string]: SmallLaunch }>('space-favorite-launches', {
    ssr: true,
    defaultValue: {},
  });

  const toggleFavorite = (launchData: SmallLaunch) => {
    setValue({ ...values, [launchData.id]: values[launchData.id] ? null : launchData });
  };

  return { favorites: omitBy(values, isNil), toggleFavorite, isFavorite: !!values[launchId] };
};
