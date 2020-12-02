import { createAction, handleActions } from 'redux-actions';

// ActionTypes
const START_GESTURE = 'START_GESTURE';
const STOP_GESTURE = 'STOP_GESTURE';

// Actions
export const startGesture = createAction(START_GESTURE);
export const stopGesture = createAction(STOP_GESTURE);

// Reducers
const uiState = handleActions(
  {
    [START_GESTURE]: () => ({
      gesturing: true,
    }),

    [STOP_GESTURE]: () => ({
      gesturing: false,
    }),
  },
  {
    gesturing: false,
  }
);

export const reducers = {
  uiState,
};
