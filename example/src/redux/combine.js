import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import {
  reducers as commonReducers,
  epics as commonEpics,
} from './modules/common';
import { reducers as uiStateReducers } from './modules/uiState';

export const rootReducers = combineReducers({
  ...commonReducers,
  ...uiStateReducers,
});

const allEpics = [
  ...commonEpics,
];

export const rootEpics = combineEpics(...allEpics);
