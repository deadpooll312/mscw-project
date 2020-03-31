import { notification } from 'antd';
import {
  put,
  call,
  select,
} from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { historyDashboard } from 'app/store/history';
import { axiosDashboard, setDashboardApiConfig } from 'app/api/axios';
import { setStateKey } from 'app/store/modules/app/actions';
import { loadCity } from 'app/api/features';
import { selectMapData } from 'app/store/modules/app/selectors';
import { RegionDataItem } from 'app/store/modules/semantics/types';

function urlOkForNOtification(url, history) {
  return !history.location.pathname.includes('login')
    && !['egip/settings', 'egip/login', 'egip/logout', 'egip/acl/users/', '/egip/acl/types', '/wms/map', 'services/journal/display/layers'].find((x) => url.includes(x));
}
function notifyOnRestError(err) {
  try {
    const errData = err.response ? err.response.data : undefined;
    if (errData && errData.status === '403') {
      notification.error({
        message: 'Error',
        duration: 0,
        description: null,
      });
      return;
    }

    notification.error({
      message: 'Ошибка при выполнении запроса', // err.message,
      duration: 0,
      // description: 'desc'
    });
  } catch (e) {
    console.warn(e);
  }
}

function notifyOnEgipError(res: AxiosResponse<any>) {
  if (!res.data || res.data.result === 'OK') {
    return;
  }

  if (!res.data.message) {
    return;
  }
  try {
    notification.error({
      message: 'Ошибка при выполнении запроса',
      duration: 0,
      // description: 'desc'
    });
  } catch (e) {
    console.warn(e);
  }
}

export function* onInitEffect() {
  
  setDashboardApiConfig({
    removeDefaultInterceptor: true,
    apiKey: location.hostname,
  });

  axiosDashboard.interceptors.request.use((config) =>
    // Do something before request is sent
    config,
  (error) => {
    // Do something with request error
    if (error.config && urlOkForNOtification(error.config.url, historyDashboard)) {
      notifyOnRestError(error);
    }
    return Promise.resolve(error.response.data);
  });

  // Add a response interceptor
  axiosDashboard.interceptors.response.use((res) => {
    // Do something with response data

    if (res?.data && (res.data.code === 'SESSION_EXPIRED' || res.data.errorCode === 'SESSION_EXPIRED')) {
      console.warn(setStateKey('modalSessionExpiredError', res.data));
      // не работает
      // put(setStateKey('modalSessionExpiredError', res.data));
      return;
    }

    if (urlOkForNOtification(res.config.url, historyDashboard)) {
      notifyOnEgipError(res);
    }
    return res.data;
  }, (error) => {
    const res = error.response;

    if (res?.data && (res.data.code === 'SESSION_EXPIRED' || res.data.errorCode === 'SESSION_EXPIRED')) {
      put(setStateKey('modalSessionExpiredError', res.data));
      return;
    }

    if (error.config && urlOkForNOtification(error.config.url, historyDashboard)) {
      if (error.response && error.response.data && error.response.data.data) {
        notifyOnEgipError(error.response);
      } else {
        notifyOnRestError(error);
      }
    }

    // todo выпилить
    if (error.response && !error.response.data) {
      return Promise.resolve(error.response);
    }
    // todo выпилить
    return Promise.resolve(error.response && error.response.data);
  });
}

export function* loadCityDataEffect() {
  const response: ThenArg<ReturnType<typeof loadCity>> = yield call(loadCity);
  const moscow = response?.[0];

  if (moscow) {
    const mapData: RegionDataItem = {
      name: moscow.properties.object_name,
      featureId: moscow.properties.feature_id,
      filterCode: moscow.properties.object_code,
      layerId: moscow.layer_id,
      revisionId: moscow.revision_id,
      object_code: moscow.properties.object_code,
    };
    const currentMapData = yield select(selectMapData);
    if (!currentMapData || JSON.stringify(currentMapData)!== JSON.stringify(mapData)) {
      yield put(setStateKey('mapData', mapData));
    }
  }
}