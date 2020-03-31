import {
  fork,
  takeLatest,
  call,
  put,
  putResolve,
} from 'redux-saga/effects';

import APP_TYPES from 'app/store/modules/app/action_types';
import { onInitEffect, loadCityDataEffect } from 'app/store/modules/app/services/init';
import {
  onLogoutSagaEffect,
  onLoginSagaEffect,
  onLogoutBySessionExpiredSagaEffect,
  onRefreshStateOnLogoutEffect,
  onUpdateCredentialsSagaEffect,
  onApplySettingsEffect,
} from 'app/store/modules/app/services/auth';
import { INIT } from 'app/store/setup_action';
import createEffect from 'app/store/promise_middleware/create_effect';
import { getInstructionData } from 'app/api/reports';
import { loginUser, updateState, setStateKey, logoutBySessionExpired, updateCredentials, downloadInstruction } from 'app/store/modules/app/actions';
import { loginApi, logout, verificationRequest, getBasemaps, getPasswordPolicy, postUpdateCredentials } from 'app/api/rest';

function* onLoginEffect({ payload }: ReturnType<typeof loginUser>) {
  const { login, password } = payload;
  try {
    const response: ThenArg<ReturnType<typeof loginApi>> = yield call(loginApi, { login, password });
    const { data, xAuthToken } = response;

    if (data?.username) {                /*  || !response.error || response.status != 200 */
      return yield putResolve(updateState(
        {
          xAuthToken,
          loggedIn: true,
          login: data.username,
          error: '',
          user: data,
          serviceMode: false,
          permissions: data.permissions,
        },
      ));
    }
    return yield putResolve(setStateKey('error', ' '));

  } catch (err) {
    return yield putResolve(setStateKey('error', err.response?.data?.message ?? ' '));
  }
}

function* onLogoutEffect() {
  logout();                                             // не нужно ждать завершения этого запроса
  return yield put(logoutBySessionExpired());
}

const notPermittedStatus = new Set([
  502,
  403,
]);

function* onCheckAuthEffect() {
  let isActive = false;
  try {
    const response: ThenArg<ReturnType<typeof verificationRequest>> = yield call(verificationRequest);

    if (response && !(response as any)?.error && !notPermittedStatus.has(Number(response?.status))) {
      yield putResolve(updateState(
        {
          loggedIn: true,
          serviceMode: false,
        },
      ));

      isActive = true;
    } else {
      throw new Error('error check auth');
    }
  } catch (err) {
    return yield putResolve(updateState(
      {
        loggedIn: false,
      }
    ));
  } finally {
    yield putResolve(setStateKey('checked', true));
  }

  return isActive;
}

function* onUpdateCredentialsEffect({ payload }: ReturnType<typeof updateCredentials>) {
  const { login, password, firstNewPassword, secondNewPassword } = payload;
  try {
    const response: ThenArg<ReturnType<typeof postUpdateCredentials>> = yield call(postUpdateCredentials, { login, password, firstNewPassword, secondNewPassword });
    return yield putResolve(updateState(
      {
        login,
        error: response,
      },
    ));
  } catch (err) {
    return yield putResolve(setStateKey('error', err.response?.data?.message ?? err.message));
  }
}
function* onFetchPasswordSettingsEffect() {
  try {
    const response: ThenArg<ReturnType<typeof getPasswordPolicy>> = yield call(getPasswordPolicy);
    return yield putResolve(updateState(
      {
        passwordSettings: response.data,
      },
    ));
  } catch (err) {
    return yield putResolve(setStateKey('error', err.message));
  }
}
function* onFetchBasemapsEffect() {
  const basemaps: ThenArg<ReturnType<typeof getBasemaps>> = yield call(getBasemaps);
  yield putResolve(setStateKey('basemaps', basemaps));
  return basemaps;
}
function* onDownloadInstructionEffect({ payload }: ReturnType<typeof downloadInstruction>) {
  const response: ThenArg<ReturnType<typeof getInstructionData>> = yield call(getInstructionData);
  const downloadLink = document.createElement('a');
  downloadLink.href = `/egip/files/${response.data}`;

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

/* ------------------------------------------------------------- */

const onLogoutSagaWatcher = createEffect(
  APP_TYPES.logoutSaga,
  takeLatest,
  onLogoutSagaEffect
);
const onLogoutBySessionExpiredSagaWatcher = createEffect(
  APP_TYPES.logoutBySessionExpiredSaga,
  takeLatest,
  onLogoutBySessionExpiredSagaEffect
);
const onRefreshStateOnLogoutWatcher = createEffect(
  APP_TYPES.refreshStateOnLogout,
  takeLatest,
  onRefreshStateOnLogoutEffect
);
const onUpdateCredentialsSagaWatcher = createEffect(
  APP_TYPES.updateCredentialsSaga,
  takeLatest,
  onUpdateCredentialsSagaEffect
);
const onApplySettingsWatcher = createEffect(
  APP_TYPES.applySettings,
  takeLatest,
  onApplySettingsEffect
);
const onLoginSagaWatcher = createEffect(
  APP_TYPES.loginSaga,
  takeLatest,
  onLoginSagaEffect
);

const onInitWatcher = function* () {
  yield fork(
    createEffect(
      INIT,
      takeLatest,
      onInitEffect,
    )
  );
};

const onLoadCityDataWatcher = createEffect(
  APP_TYPES.loadCityData,
  takeLatest,
  loadCityDataEffect
);

const onLoginWatcher = createEffect(
  APP_TYPES.login,
  takeLatest,
  onLoginEffect
);
const onLogoutWatcher = createEffect(
  APP_TYPES.logout,
  takeLatest,
  onLogoutEffect
);
const onCheckAuthWatcher = createEffect(
  APP_TYPES.checkAuth,
  takeLatest,
  onCheckAuthEffect
);
const onUpdateCredentialsWatcher = createEffect(
  APP_TYPES.updateCredentials,
  takeLatest,
  onUpdateCredentialsEffect
);
const onFetchPasswordSettingsWatcher = createEffect(
  APP_TYPES.fetchPasswordSettings,
  takeLatest,
  onFetchPasswordSettingsEffect
);

const onFetchBasemapsWatcher = createEffect(
  APP_TYPES.fetchBasemaps,
  takeLatest,
  onFetchBasemapsEffect
);

const onDownloadInstructionWatcher = createEffect(
  APP_TYPES.downloadInstruction,
  takeLatest,
  onDownloadInstructionEffect
);

// список на прослушивание
const AppEffects = [
  fork(onLogoutSagaWatcher),
  fork(onLoginSagaWatcher),
  fork(onInitWatcher),
  fork(onLoginWatcher),
  fork(onLogoutWatcher),
  fork(onLogoutBySessionExpiredSagaWatcher),
  fork(onRefreshStateOnLogoutWatcher),
  fork(onUpdateCredentialsSagaWatcher),
  fork(onApplySettingsWatcher),
  fork(onCheckAuthWatcher),
  fork(onUpdateCredentialsWatcher),
  fork(onFetchPasswordSettingsWatcher),
  fork(onFetchBasemapsWatcher),
  fork(onDownloadInstructionWatcher),
  fork(onLoadCityDataWatcher),
];

export default AppEffects;
