import { shallowEqual, useSelector as useSelectorBase } from 'react-redux';

import { ReduxState } from './combine';
import configureStore from './configureStore';
import { actions as CommonActions } from './modules/common';

export * from './combine';
export * from './configureStore';

const actions = {
  common: CommonActions,
};

export { actions };

export const store = configureStore();

export function useSelector<TSelected>(
  selector: (state: ReduxState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) {
  return useSelectorBase<ReduxState, TSelected>(selector, equalityFn || shallowEqual);
}
