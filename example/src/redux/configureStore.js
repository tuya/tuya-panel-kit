import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpics, rootReducers } from './combine';

const epicMiddleware = createEpicMiddleware();


const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;
const logger = createLogger({
  // eslint-disable-next-line no-unused-vars
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

const middlewares = [
  epicMiddleware,
  thunk,
];

if (isDebuggingInChrome) {
  middlewares.push(logger);
}

export default function configureStore(initialState) {
  const applyedMiddleware = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducers,
    initialState,
    compose(
      applyedMiddleware,
      isDebuggingInChrome && window.devToolsExtension
        ? window.devToolsExtension() : f => f
    )
  );

  epicMiddleware.run(rootEpics);
  return store;
}
