import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { reducers as commonReducers, epics as commonEpics } from './modules/common';
import { reducers as uiStateReducers } from './modules/uiState';
import { reducers as themeReducer } from './modules/theme';

export const rootReducers = combineReducers({
  ...commonReducers,
  ...uiStateReducers,
  ...themeReducer,
});

const allEpics = [...commonEpics];

export const rootEpics = combineEpics(...allEpics);
