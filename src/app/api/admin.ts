import { axiosDashboard } from 'app/api/axios';
import { PropertyType, RestResult } from 'app/types';
import type { KeyPropertyDTO } from 'app/swagger/model/keyPropertyDTO';

export function getLayers(q?): Promise<any> {
  let params = new URLSearchParams();
  if (q) {
    Object.keys(q).forEach((key) => {
      if (key === 'fields') {
        q[key].forEach((item) => {
          params.append('field', item);
        });
      } else {
        params.append(key, q[key]);
      }
    });
  }
  return axiosDashboard
    .get<any>('/api/v1/dashboard/admin/layers', {
      params,
    }).then((r) => r.data);
}

export function getLayerTypes(): Promise<any> {
  return axiosDashboard
    .get<any>('/api/v1/dashboard/admin/layers/layer_type').then((r) => r.data);
}

export function editField(params?): Promise<any> {
  return axiosDashboard
    .post<any>('api/v1/dashboard/admin/layers/edit', params)
    .then((r) => r);
}

export function editEnableField(params?): Promise<any> {
  return axiosDashboard
    .post<any>('api/v1/dashboard/admin/layers/enable', params)
    .then((r) => r);
}

export function getMapping(alias: string): Promise<any> {
  return axiosDashboard
    .get<any>(`api/v1/dashboard/admin/layers/mapping/${alias}`)
    .then((r) => r.data);
}

export function deleteMappingField(id: number): Promise<any> {
  return axiosDashboard
    .delete<any>(`api/v1/dashboard/admin/layers/mapping/${id}`)
    .then((r) => r);
}

export function editMappingField(params?): Promise<any> {
  return axiosDashboard
    .post<any>('api/v1/dashboard/admin/layers/mapping', params)
    .then((r) => r);
}

export function getAttributeValues(alias: string): Promise<any> {
  return axiosDashboard
    .get<any>(`api/v1/dashboard/admin/layers/mapping/${alias}/attributeValues`)
    .then((r) => r.data);
}

export function getLegendData(params): Promise<any> {
  return axiosDashboard
    .get<any>('/api/v1/dashboard/legends', {
      params,
    })
    .then((r) => r.data);
}

export function getLevels(): Promise<any> {
  return axiosDashboard
    .get<any>('/api/v1/dashboard/legends/level_type')
    .then((r) => r.data);
}

export function editLegend(params?): Promise<any> {
  return axiosDashboard
    .post<any>('/api/v1/dashboard/legends/save', params)
    .then((r) => r);
}

export function deleteLegend(id: number): Promise<any> {
  return axiosDashboard
    .delete<any>(`/api/v1/dashboard/legends/${id}`)
    .then((r) => r);
}

export function getSeasons(): Promise<any> {
  return axiosDashboard
    .get<any>('/api/v1/dashboard/legends/season_type')
    .then((r) => r.data);
}

export function getProperties(types: PropertyType[]){
  return axiosDashboard.get<RestResult<KeyPropertyDTO[]>>(`api/v1/dashboard/property/?types=${types.toString()}`);
}

export function getCameraSettings() {
  return getProperties([PropertyType.CAMERA]);
}

export function updateProperty(property: Partial<KeyPropertyDTO>){
  return axiosDashboard.patch(`/api/v1/dashboard/property/`, {...property});
}
