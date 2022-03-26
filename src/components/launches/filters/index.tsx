import { Search2Icon } from '@chakra-ui/icons';
import { Box, VStack } from '@chakra-ui/layout';
import {
  ButtonGroup,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tab,
  TabList,
  Tabs,
  useMediaQuery,
  useRadioGroup,
} from '@chakra-ui/react';
import { RadioCard } from '@components-ui/radio-card';
import { setPeriodFilter, IFiltersState, setOrdering, setSearchFilter } from '@redux/slices/filters';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { debounce, findIndex } from 'lodash';
import { useState, useMemo } from 'react';

const LaunchesPeriodFilter = () => {
  const dispatch = useAppDispatch();
  const period = useAppSelector((state) => state.filters.period);

  const tabIndexes = { 0: 'day', 1: 'week', 2: 'month', 3: 'year' };

  return (
    <Tabs
      marginY={4}
      isFitted
      variant="solid-rounded"
      index={findIndex(Object.values(tabIndexes), (value) => value === period)}
      onChange={(i) => dispatch(setPeriodFilter(tabIndexes[i]))}
    >
      <TabList>
        <Tab>Day</Tab>
        <Tab>Week</Tab>
        <Tab>Month</Tab>
        <Tab>Year</Tab>
      </TabList>
    </Tabs>
  );
};

const LaunchesOrderByFilter = () => {
  const dispatch = useAppDispatch();
  const ordering = useAppSelector((state) => state.filters.ordering);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'ordering',
    value: ordering,
    onChange: (value: IFiltersState['ordering']) => dispatch(setOrdering(value)),
  });
  const group = getRootProps();

  return (
    <ButtonGroup {...group} isAttached>
      <RadioCard {...getRadioProps({ value: 'net' })} label="Date (asc)" />
      <RadioCard {...getRadioProps({ value: '-net' })} label="Date (desc)" />
      <RadioCard {...getRadioProps({ value: 'name' })} label="Name (asc)" />
      <RadioCard {...getRadioProps({ value: '-name' })} label="Name (desc)" />
    </ButtonGroup>
  );
};

const LaunchesSearchFilter = ({ hasOrderBy = false }: { hasOrderBy?: boolean }) => {
  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.filters.search);
  const [searchField, setSearchField] = useState(search);

  const debouncedSearch = useMemo(() => debounce((value: string) => dispatch(setSearchFilter(value)), 500), [dispatch]);

  const handleChangeSearch = (value: string) => {
    setSearchField(value);
    debouncedSearch(value);
  };

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <Search2Icon color="gray.300" />
      </InputLeftElement>
      <Input
        pr={hasOrderBy ? 350 : '1rem'}
        value={searchField || ''}
        onChange={(e) => handleChangeSearch(e.target.value)}
        placeholder="Search"
      />
      {hasOrderBy && (
        <InputRightElement mr="2" width="auto">
          <LaunchesOrderByFilter />
        </InputRightElement>
      )}
    </InputGroup>
  );
};

export const LaunchesFilters = () => {
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  return (
    <Box mb={4}>
      <LaunchesPeriodFilter />
      {isMobile ? (
        <VStack spacing={4}>
          <LaunchesSearchFilter />
          <LaunchesOrderByFilter />
        </VStack>
      ) : (
        <LaunchesSearchFilter hasOrderBy />
      )}
    </Box>
  );
};
