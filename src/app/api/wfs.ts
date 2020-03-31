import { axiosDashboard } from 'app/api/axios';

export function getFeaturesWfs(layerId, revisionId, params?, withPagination? : { page: number; size: number}): Promise<any> {
  let paginationString = '';
  if (withPagination) {
    const { page, size } = withPagination;
    paginationString = `&page=${page}&size=${size}`;
  }
  return axiosDashboard
    .get<any>(`/egip/layers/${layerId}/revisions/${revisionId}/features/wfs?srsType=EPSG_3857${paginationString}`, { params: { ...params, size: 1000 } });
}