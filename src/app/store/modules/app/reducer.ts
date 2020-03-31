import storage from 'redux-persist/lib/storage';
import { persistReducer, PersistConfig } from 'redux-persist';

import { initialStateApp } from 'app/store/modules/app/initialState';
import createReducer from 'app/store/createReducer';
import APP_TYPES from 'app/store/modules/app/action_types';
import { updateState, setStateKey, incAppGlobalLoadingCount } from 'app/store/modules/app/actions';
import CONSTANTS from '@next/constants';

// тут вроде всё понятно
const appReducerRaw = createReducer<'app'>(
  initialStateApp,
  {
    [APP_TYPES.update](state, { payload }: ReturnType<typeof updateState>) {
      return {
        ...state,
        ...payload,
      };
    },
    [APP_TYPES.set](state, { payload, key }: ReturnType<typeof setStateKey>) {
      return {
        ...state,
        [key]: payload,
      };
    },
    [APP_TYPES.incAppGlobalLoadingCount](state, { payload }: ReturnType<typeof incAppGlobalLoadingCount>) {
      return {
        ...state,
        globalLoadingCount: Math.max(CONSTANTS.COUNT.ZERO, state.globalLoadingCount + payload.incCount),
      };
    },
  }
);

const authPersistConfig: PersistConfig<typeof initialStateApp, any, any, any> = {
  key: 'partialApp',
  storage,
  whitelist: [
    'xAuthToken',
    'extents77',
    'extents3857',
    'login',
    'permissions',
    'user',
    'mapData',
    'themeName',
  ],
};

export const appReducer = persistReducer(authPersistConfig, appReducerRaw);
