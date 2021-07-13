import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { epics as commonEpics, reducers as commonReducers } from './modules/common';

export const reducers = {
  ...commonReducers,
};

type Reducers = typeof reducers;

export type ReduxState = { [K in keyof Reducers]: ReturnType<Reducers[K]> };

export const rootReducers = combineReducers(reducers);

const allEpics = [...commonEpics];

export const rootEpics = combineEpics(...allEpics);
