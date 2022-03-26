import { combineReducers } from 'redux';

import filters from '@redux/slices/filters';

const rootReducer = combineReducers({ filters });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
