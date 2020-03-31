import pick from 'lodash-es/pick';
import type { ReduxState } from 'app/store/modules/@types';

import CONSTANTS from '@next/constants';
import { checkIsMer } from '@next/utils/checkOnPermission';

export function selectAppModule(state: ReduxState) {
  return state.app;
}

export const selectXAuthToken = (state: ReduxState) => {
  return selectAppModule(state).xAuthToken;
};
export const selectModalSessionExpired = (state: ReduxState) => selectAppModule(state).modalSessionExpiredError;

export function selectErrors(state: ReduxState) {
  return selectAppModule(state).errors;
}

export function selectSettings(state: ReduxState) {
  const settings = selectAppModule(state).serverSettings.data;
  return settings || [];
}

export function selectSettingsByKey(state: ReduxState, key: 'url_2gis_api' | 'user_key_2gis_api') {
  const settings = selectSettings(state);
  return settings.find((x) => x.key === key);
}

export function selectUrl2gisApi(state: ReduxState) {
  return selectSettingsByKey(state, 'url_2gis_api');
}

export function selectUserKey2gisApi(state: ReduxState) {
  return selectSettingsByKey(state, 'user_key_2gis_api');
}

export function selectBasemaps(state: ReduxState) {
  const { basemaps } = selectAppModule(state);
  return basemaps?.data ? basemaps.data : [];
}

export function selectEGKOBasemapUrl(state: ReduxState) {
  const xs = selectBasemaps(state);
  const default2gis = xs.find((x) => x.urlTemplate.includes('2gis') && x.defaultForSrs);
  const tgis = xs.find((x) => x.urlTemplate.includes('2gis'));
  return default2gis || tgis;
}

export function selectEGKOBasemapUrlUrlTemplate(state: ReduxState) {
  return selectEGKOBasemapUrl(state)?.urlTemplate;
}

/** AUTH */

export function selectedLoggedIn(state: ReduxState) {
  return selectAppModule(state).loggedIn;
}

export function selectLogin(state: ReduxState) {
  return selectAppModule(state).login;
}
export function selectAuth(state: ReduxState) {
  const vals = selectAppModule(state);
  const r = pick(vals, Object.keys({
    loggedIn: false,
    checked: false,
    login: '',
    error: '',
    user: undefined,
    permissions: [],
    serviceMode: false,
    passwordSettings: undefined,
  }));
  return r;
}
export function selectError(state: ReduxState) {
  return selectAppModule(state).error;
}

export function selectPermissions(state: ReduxState) {
  return selectAppModule(state).permissions;
}

export function loginLoading(state: ReduxState) {
  return false; // state.loading.effects['app/loginSaga'];
}
export function selectUser(state: ReduxState) {
  return selectAppModule(state).user;
}

export const selectUserIsMer = (state: ReduxState) => {
  return checkIsMer(selectUser(state));
};

export function selectPasswordPolicy(state: ReduxState) {
  return selectAppModule(state).passwordSettings
    ? {
      ...(selectAppModule(state).passwordSettings?.passwordPolicy ?? {}),
      minChangedPasswordChars: selectAppModule(state).passwordSettings?.minChangedPasswordChars,
    }
    : null;
}

// /** STATE */

export function selectNearbyCameraEnabled(state: ReduxState) {
  return selectAppModule(state).isNearbyCameraEnabled;
}

export const selectMapData = (state: ReduxState) => {
  return selectAppModule(state).mapData;
};

export const selectAppThemeName = (state: ReduxState)  => {
  return selectAppModule(state).themeName || 'light';
};

export const selectAppGlobalLoadingCount = (state: ReduxState) => {
  return selectAppModule(state).globalLoadingCount;
};

export const selectAppGlobalIsLoading = (state: ReduxState) => {
  return selectAppGlobalLoadingCount(state) > CONSTANTS.COUNT.ZERO;
};

export const selectShowCars = (state: ReduxState) => {
  return selectAppModule(state).showCars;
};
