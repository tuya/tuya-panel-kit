import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { epics as commonEpics, reducers as commonReducers } from './modules/common';
import { reducers as uiStateReducers } from './modules/uiState';
import { reducers as themeReducer } from './modules/theme';

export const reducers = {
  ...commonReducers,
  ...uiStateReducers,
  ...themeReducer,
};

type Reducers = typeof reducers;

export type ReduxState = { [K in keyof Reducers]: ReturnType<Reducers[K]> };

export const rootReducers = combineReducers(reducers);

const allEpics = [...commonEpics];

export const rootEpics = combineEpics(...allEpics);
