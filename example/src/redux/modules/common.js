import { handleActions, createAction } from 'redux-actions';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/partition';

import { TYSdk } from 'tuya-panel-kit';

const { putDeviceData } = TYSdk.device;

// actions
export const devInfoChange = createAction('_DEVINFOCHANGE_');
export const deviceChange = createAction('_DEVICECHANGED_');
export const responseUpdateDp = createAction('RESPONSE_UPDATE_DP');
export const updateDp = createAction('CHANGE_DP');

// reducer
const dpState = handleActions(
  {
    [devInfoChange.toString()]: (state, action) => ({
      ...state,
      ...action.payload.state,
    }),

    [responseUpdateDp.toString()]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  {}
);

const devInfo = handleActions(
  {
    [devInfoChange.toString()]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [deviceChange.toString()]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  {}
);

export const reducers = {
  dpState,
  devInfo,
};

// epics
const dpUpdateEpic$ = action$ =>
  action$.ofType(updateDp).mergeMap(action => {
    const { payload } = action;
    const [success, error] = Observable.fromPromise(putDeviceData(payload))
      .catch(err => Observable.of(responseUpdateDp({})))
      .partition(x => x.success);

    return Observable.merge(
      success.map(() => responseUpdateDp(payload)),
      error.map(() => responseUpdateDp({}))
    );
  });

export const epics = [dpUpdateEpic$];
