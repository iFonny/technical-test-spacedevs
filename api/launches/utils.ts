import { IFiltersState } from '@redux/slices/filters';
import { LaunchesRequestFilters } from 'api/launches';
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import { isEmpty } from 'lodash';

export function getPeriodIntervalFilter(birthDate: Date, period: IFiltersState['period']) {
  switch (period) {
    case 'day':
      return { net__gte: startOfDay(birthDate).toISOString(), net__lte: endOfDay(birthDate).toISOString() };
    case 'week':
      return { net__gte: startOfWeek(birthDate).toISOString(), net__lte: endOfWeek(birthDate).toISOString() };
    case 'month':
      return { net__gte: startOfMonth(birthDate).toISOString(), net__lte: endOfMonth(birthDate).toISOString() };
    case 'year':
      return { net__gte: startOfYear(birthDate).toISOString(), net__lte: endOfYear(birthDate).toISOString() };
  }
}

export function getRequestFilters(filters: IFiltersState): LaunchesRequestFilters | undefined {
  if (filters.birthdate) {
    let reqFilters: LaunchesRequestFilters = {};

    // -- Search --
    if (!isEmpty(filters.search)) reqFilters.search = filters.search;

    // -- Order by --
    reqFilters.ordering = filters.ordering;

    // --- Pediod filter ---
    switch (filters.period) {
      case 'day':
        reqFilters = { ...reqFilters, ...getPeriodIntervalFilter(filters.birthdate, 'day') };
        break;
      case 'week':
        reqFilters = { ...reqFilters, ...getPeriodIntervalFilter(filters.birthdate, 'week') };
        break;
      case 'month':
        reqFilters = { ...reqFilters, ...getPeriodIntervalFilter(filters.birthdate, 'month') };
        break;
      case 'year':
        reqFilters = { ...reqFilters, ...getPeriodIntervalFilter(filters.birthdate, 'year') };
        break;
    }

    return reqFilters;
  } else return undefined;
}

export const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'success':
      return 'green';
    case 'failure':
    case 'partial failure':
      return 'red';
    default:
      return;
  }
};
