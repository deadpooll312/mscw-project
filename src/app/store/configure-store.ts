import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';

import rootReducer from './reducer';
import rootSaga from './sagas';
import { onError } from 'app/store/modules/app/setup/on-error';

import { setupAction } from 'app/store/setup_action';
import promiseMiddleware from 'app/store/promise_middleware/middleware';

const loggerReduxMiddleware = createLogger({
  collapsed: true,
});

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware({
    onError,
  });

  const middleware = [promiseMiddleware, sagaMiddleware];

  if (NODE_ENV !== 'production') {
    middleware.push(loggerReduxMiddleware);
  }

  const store = createStore(
    rootReducer,
    {},
    compose(
      applyMiddleware(...middleware),
    ),
  );

  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  store.dispatch(setupAction());

  return {
    store,
    persistor,
  };
}
