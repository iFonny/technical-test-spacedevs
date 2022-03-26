import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LaunchesRequestFilters } from 'src/api/launches';

export interface IFiltersState {
  birthdate?: Date;
  period: 'day' | 'week' | 'month' | 'year';
  ordering: LaunchesRequestFilters['ordering'];
  search?: string;
}

const initialState: IFiltersState = {
  birthdate: undefined,
  period: 'year',
  ordering: 'net',
  search: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setBirthdate: (state, action: PayloadAction<Date>) => {
      state.birthdate = action.payload;
    },
    setPeriodFilter: (state, action: PayloadAction<IFiltersState['period']>) => {
      state.period = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setOrdering: (state, action: PayloadAction<IFiltersState['ordering']>) => {
      state.ordering = action.payload;
    },
  },
});

export const { setBirthdate, setPeriodFilter, setSearchFilter, setOrdering } = filtersSlice.actions;

export default filtersSlice.reducer;
