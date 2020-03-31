import {
  put,
  select,
  putResolve,
} from 'redux-saga/effects';

import { setStateKey, checkAuth, loginUser, applySettings, logoutSaga, updateCredentialsSaga, updateCredentials, logoutBySessionExpired, refreshStateOnLogout, logout, fetchBasemaps, loginSaga, loadCityData } from 'app/store/modules/app/actions';
import { selectAuth } from 'app/store/modules/app/selectors';
import { refreshSemantics } from 'app/store/modules/semantics/actions';
import { axiosDashboard } from 'app/api/axios';
import { selectXAuthToken } from 'app/store/modules/app/selectors';

export function* onLoginSagaEffect({ payload }: ReturnType<typeof loginSaga>) {
  let loginRes: any = {};
  let isActiveToken = false;
  yield putResolve(setStateKey('modalSessionExpiredError', undefined));

  if (!payload) {
    isActiveToken = yield putResolve(checkAuth());
  } else {
    loginRes = yield putResolve(loginUser(payload));
    isActiveToken = true;
  }

  const auth = yield select(selectAuth);
  const xAuthToken = yield select(selectXAuthToken);

  if (isActiveToken && (auth.login && Boolean(auth.loggedIn) || (loginRes.payload && loginRes.payload.loggedIn))) {
    axiosDashboard.defaults.headers['X-Auth-Token'] = xAuthToken;
    axiosDashboard.defaults.headers['Authorization'] = 'Basic dmVVVUJMc1FmYzUxUGxmeDVicHI6R3k1SWttNFBZSlM1eTIwc2hjZGs=';

    yield putResolve(applySettings());
  }
  const auth2 = yield select(selectAuth);

  if (!isActiveToken && auth2?.user) {
    yield putResolve(logoutSaga());
  }
}

export function* onLogoutBySessionExpiredSagaEffect() {
  yield putResolve(logoutBySessionExpired());
  yield putResolve(refreshStateOnLogout());
}

export function* onLogoutSagaEffect() {
  axiosDashboard.defaults.headers['X-Auth-Token'] = undefined;
  axiosDashboard.defaults.headers['Authorization'] = undefined;
  yield putResolve(logout());
  yield putResolve(refreshStateOnLogout());
}

export function* onRefreshStateOnLogoutEffect() {
  yield putResolve(refreshSemantics());
  yield putResolve(setStateKey('modalSessionExpiredError', undefined));
}

export function* onApplySettingsEffect() {
  yield put(loadCityData());
  yield putResolve(fetchBasemaps());
}

export function* onUpdateCredentialsSagaEffect({ payload }: ReturnType<typeof updateCredentialsSaga>) {
  let updateCredentialsRes: any = {};

  if (payload) {
    updateCredentialsRes = yield putResolve(updateCredentials(payload));
  }

  const auth = yield select(selectAuth);

  if (Boolean(auth.loggedIn) || updateCredentialsRes.payload && updateCredentialsRes.payload.loggedIn) {
    yield putResolve(applySettings());
  }
}
