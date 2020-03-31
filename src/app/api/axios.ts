import axios from 'axios';

export const axiosDashboard = axios.create({
  baseURL: location.origin,
  withCredentials: true
});

export const defaultInterceptorId = axiosDashboard.interceptors.response.use((response) => {
  return response.data ? response.data : response;
}, (error) => {
  return Promise.reject(error);
});

function getBaseUrl() {
  const baseURL = getConfig().baseURL || '';
  return baseURL.substr(-1) === '/' ? baseURL : baseURL + '/';
}

function getEgkoBounds() {
  return [-20037508.34, -20037508.34, 20037508.34, 20037508.34];
}
function getDefaultExtent3857() {
  return [3861458.3183532483, 7345462.657468396, 4513619.043682372, 7674447.627207794];
}

function getLayerUID(id, revisionId?) {
  if (revisionId) {
    return `${id}@${revisionId}`;
  }
  return `${id}`;
}

function getWMCSTilesUrl() {
  return `${getBaseUrl()}egip/tiles/wms-c`;
}

function getUrlWmsLayerMap() {
  return `${getBaseUrl()}egip/layers/wms/map`;
}
function getUrlWmsClusterMap(clusterId: number) {
  return `${getBaseUrl()}egip/clusters/${clusterId}/wms/map`;
}
function getUrlWmsViewMap() {
  return `${getBaseUrl()}egip/views/wms/map`;
}

const config = {
  /**
   * см axios interceptors
   * установите true, если хотите полуать response от axios без изменений (по умолчанию egip.api возвращает response.data)
   */
  removeDefaultInterceptor: false,
  baseURL: location.origin,
  apiKey: '',
  withCredentials: true,
  getUrlWmsViewMap,
  getUrlWmsLayerMap,
  getUrlWmsClusterMap,
  getDefaultExtent3857,
  getEgkoBounds,
  getLayerUID,
  getWMCSTilesUrl,
};

export type EgipConfig = typeof config;

export function setDashboardApiConfig(opts: Partial<EgipConfig>) {
  Object.assign(config, opts);

  if (config.removeDefaultInterceptor) {
    axiosDashboard.interceptors.response.eject(defaultInterceptorId);
  }

  Object.assign(axiosDashboard.defaults, {
    baseURL: config.baseURL,
    withCredentials: config.withCredentials
  });
}

function getConfig() {
  return config;
}
