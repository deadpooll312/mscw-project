
import APP_TYPES from 'app/store/modules/app/action_types';
import createAction from 'app/store/promise_middleware/create_action';
import { AppState } from './types';
import { initialStateApp } from './initialState';
import { CredentialsData } from 'app/api/rest';
import themes from 'styles/themes';
import CONSTANTS from '@next/constants';

export const setStateKey = <K extends keyof AppState>(key: K, payload: AppState[K]) => {
  return ({
    type: APP_TYPES.set,
    key,
    payload,
  });
};

export const updateState = (payload: AppState[keyof AppState]) => {
  return ({
    type: APP_TYPES.update,
    payload,
  });
};

export const fetchBasemaps = () => {
  return createAction({
    type: APP_TYPES.fetchBasemaps,
    payload: {},
  });
};

/** AUTH */

export const loginUser = (payload: { login: string; password: string }) => {
  return createAction({
    type: APP_TYPES.login,
    payload,
  });
};

export const logout = () => {
  return createAction({
    type: APP_TYPES.logout,
    payload: {},
  });
};

export const logoutBySessionExpired = () => {
  return updateState({
    loggedIn: initialStateApp.loggedIn,
    login: initialStateApp.login,
    error: initialStateApp.error,
    user: initialStateApp.user,
    permissions: initialStateApp.permissions,
    xAuthToken: initialStateApp.xAuthToken,
  });
};

export const checkAuth = () => {
  return createAction({
    type: APP_TYPES.checkAuth,
    payload: {},
  });
};

export const updateCredentials = (payload: CredentialsData) => {
  return createAction({
    type: APP_TYPES.updateCredentials,
    payload,
  });
};

export const fetchPasswordSettings = () => {
  return createAction({
    type: APP_TYPES.fetchPasswordSettings,
    payload: {},
  });
};

/** STATE */

export const applySettings = () => {
  return createAction({
    type: APP_TYPES.applySettings,
    payload: {},
  });
};

export function setBreakpoint(payload: any) {
  return setStateKey('breakpoint', payload);
}

// auth proxy
export const loginSaga = (payload: { login: string; password: string }) => {
  return createAction({
    type: APP_TYPES.loginSaga,
    payload,
  });
};

export const logoutSaga = () => {
  return createAction({
    type: APP_TYPES.logoutSaga,
    payload: {},
  });
};

export const logoutBySessionExpiredSaga = () => {
  return createAction({
    type: APP_TYPES.logoutBySessionExpiredSaga,
    payload: {},
  });
};

export const refreshStateOnLogout = () => {
  return createAction({
    type: APP_TYPES.refreshStateOnLogout,
    payload: {},
  });
};

export const updateCredentialsSaga = (payload: CredentialsData) => {
  return createAction({
    type: APP_TYPES.updateCredentialsSaga,
    payload,
  });
};

export const downloadInstruction = () => {
  return createAction({
    type: APP_TYPES.downloadInstruction,
    payload: {},
  });
};

export const loadCityData = () => {
  return createAction({
    type: APP_TYPES.loadCityData,
    payload: {},
  });
};

export const changeThemeName = (themeName: keyof typeof themes) => {
  return setStateKey('themeName', themeName);
};

export const incAppGlobalLoadingCount = (incCount: number = CONSTANTS.COUNT.ONE) => {
  return {
    type: APP_TYPES.incAppGlobalLoadingCount,
    payload: {
      incCount,
    },
  };
};

export const decAppGlobalLoadingCount = () => {
  return incAppGlobalLoadingCount(-CONSTANTS.COUNT.ONE);
};

export const changeShowCars = (showCars: boolean) => (
  setStateKey('showCars', showCars)
);
