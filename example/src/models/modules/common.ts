import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/partition';

import { createAction, handleActions } from 'redux-actions';
import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import { DevInfo, DpValue, TYSdk } from 'tuya-panel-kit';

const { putDeviceData } = TYSdk.device;

interface DpState {
  switch: boolean;
  [dpCode: string]: DpValue;
}

interface Log {
  strCodes: string;
  strIds: string;
  time: string;
  isSend: boolean;
}

type Logs = Array<Log>;

type UpdateDevInfoPayload = DevInfo;
type UpdateDpStatePayload = Partial<DpState> & { [key: string]: DpValue }; // 保证起码有一个键值对存在

/**
 * actions
 */
const devInfoChange = createAction<UpdateDevInfoPayload>('_DEVINFOCHANGE_');
const deviceChange = createAction<UpdateDevInfoPayload>('_DEVICECHANGED_');
const responseUpdateDp = createAction<UpdateDpStatePayload>('RESPONSE_UPDATE_DP');
const updateDp = createAction<UpdateDpStatePayload>('CHANGE_DP');
const consoleChange = createAction('CONSOLECHNAGE');
const clearConsole = createAction('CLEARCONSOLE');

export const actions = {
  devInfoChange,
  deviceChange,
  responseUpdateDp,
  updateDp,
  consoleChange,
  clearConsole,
};

export type Actions = { [K in keyof typeof actions]: ReturnType<typeof actions[K]> };

/**
 * reducers
 */
const dpState = handleActions<DpState, UpdateDpStatePayload | UpdateDevInfoPayload>(
  {
    [devInfoChange.toString()]: (state, action: Actions['devInfoChange']) => {
      return {
        ...state,
        ...action.payload.state,
      };
    },

    [responseUpdateDp.toString()]: (state, action: Actions['responseUpdateDp']) => ({
      ...state,
      ...action.payload,
    }),
  },
  {} as DpState
);

const devInfo = handleActions<DevInfo<DpState>>(
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
  {} as DevInfo<DpState>
);

let isSend = false;

const formatLogs = (state: Logs, action: { payload: UpdateDpStatePayload }, send: boolean) => {
  const ret = Object.keys(action.payload).reduce((obj, p) => {
    const id = TYSdk.device.getDpIdByCode(p);
    return { ...obj, [id]: action.payload[p] };
  }, {});
  const strIds = JSON.stringify(ret, null, 2);
  const strCodes = JSON.stringify(action.payload, null, 2);
  const date = new Date();
  const time = `[${[
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds(),
  ].join(':')}]`;
  const s = [{ strCodes, strIds, time, isSend: send }, ...state];
  return s.slice(0, 30);
};

const logs = handleActions<Logs, undefined | UpdateDpStatePayload | DevInfo>(
  {
    [consoleChange.toString()]: state => {
      isSend = true;
      return state;
    },

    [updateDp.toString()]: (state, action: Actions['updateDp']) => {
      isSend = true;
      return formatLogs(state, action, isSend);
    },

    [devInfoChange.toString()]: (state, action: Actions['devInfoChange']) => {
      const formatAction = { payload: action.payload.state };
      return formatLogs(state, formatAction, isSend);
    },

    [responseUpdateDp.toString()]: (state, action: Actions['responseUpdateDp']) => {
      isSend = false;
      return formatLogs(state, action, isSend);
    },

    [clearConsole.toString()]: () => [],
  },
  []
);

export const reducers = {
  dpState,
  devInfo,
  logs,
};

/**
 * epics
 */
const dpUpdateEpic$ = (action$: ActionsObservable<Actions['updateDp']>) => {
  return action$.ofType(updateDp.toString()).mergeMap(action => {
    const { payload } = action;
    const [success, error] = Observable.fromPromise(putDeviceData(payload))
      .catch(() => Observable.of(responseUpdateDp({})))
      .partition((x: { success: boolean }) => x.success);

    return Observable.merge(
      success.map(() => responseUpdateDp(payload)), // 如果每次操作都必须等到上报以后再更新，可以注释掉本段代码
      error.map(() => responseUpdateDp({}))
    );
  });
};

export const epics = [dpUpdateEpic$];
