import { axiosDashboard } from 'app/api/axios';

import { RestResult } from 'app/types';
import { LegendDTO } from 'app/swagger/model/legendDTO';
import { FeatureAliases, AnsLoadSystemType, GetWeatherDataResponse, GetLayersParams } from './types';
import { Season } from 'app/store/modules/@types';

import { URL_LEGEND, URL_SYSTEM_TYPE, URL_WEATHER, URL_LAYERS, URL_WINTER_DATA } from './constants';
import { WinterData, Layer } from 'app/store/modules/semantics/types';

/// wfs
export function getGeometry(urlFormat, layerId, revisionId, extent, params?): Promise<any> {
  return axiosDashboard
    .get<any>(`/egip/layers/wms/map?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&FORMAT=${urlFormat}&TRANSPARENT=true&layerId=${layerId}&revisionId=${revisionId}&tiled=true&srs=EPSG_3857&WIDTH=256&HEIGHT=256&CRS=EPSG%3A3857&BBOX=${extent.join(',')}`, { params });
}

export function getFeaturesWfs(layerId, revisionId, params?, withPagination? : { page: number; size: number}): Promise<any> {
  let paginationString = '';
  if (withPagination) {
    const { page, size } = withPagination;
    paginationString = `&page=${page}&size=${size}`;
  }
  return axiosDashboard
    .get<any>(`/egip/layers/${layerId}/revisions/${revisionId}/features/wfs?srsType=EPSG_3857${paginationString}`, { params: { ...params, size: 1000 } });
}

/// legend

export const loadLegend = (alias: FeatureAliases | 'ts', season: Season | 'SYS') => {
  let partialPath = `${URL_LEGEND}/${alias}`;
  if (season) {
    partialPath = `${partialPath}/${season}`;
  }
  return axiosDashboard.get<RestResult<LegendDTO[]>>(partialPath).then(r => r.data);
};

//  TODO wrong swagger response type
export function getSnowInfo(dimension: FeatureAliases, featureId: string, params: { date: string }) {
  return axiosDashboard
    .get<WinterData>(`${URL_WINTER_DATA}/${dimension}/feature_id/${featureId}`, {params});
}

//  TODO wrong swagger response type
export const getLayersData = (params?: GetLayersParams) =>
  axiosDashboard.get<Layer[], Layer[]>(URL_LAYERS, { params });

//  TODO wrong swagger response type
export const getWeatherData = (date: string, feature_id = '51812531') => {
  return axiosDashboard
    .get<GetWeatherDataResponse, RestResult<GetWeatherDataResponse>>(URL_WEATHER, {
      params: {
        date: date,
        feature_id: feature_id,
      },
    })
    .then((r) => {
      if (r.data && r.code !== 'ERROR') {
        return r.data;
      }
      return { parts: {} };
    });
};

//  TODO wrong swagger response type
export const loadSystemTypes = () => {
  return axiosDashboard.get<AnsLoadSystemType>(URL_SYSTEM_TYPE);
};

