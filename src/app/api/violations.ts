import queryString  from 'query-string';
import { axiosDashboard } from 'app/api/axios';

import { LayerType } from 'containers/layers/types';
import { 
  FeatureAliases,
  GetViolationsParams, 
  GetViolationsResponse, 
  GetViolationsByDimensionAndFilterResponse, 
  ViolationTotalType
} from 'app/api/types';
import { sumArr } from '@next/utils/common';

import { URL_VIOLATIONS, URL_VIOLATIONS_BY_DIMENSION, URL_VIOLATIONS_MOVE_CAMERA_TO_COORDINATES } from 'app/api/constants';
import { Layer } from 'app/store/modules/semantics/types';
import { loadPromises } from 'utils';
import { isNullOrUndefined } from 'util';
import { asyncArrayMap } from 'containers/layers/ViolationsLayer/utils';
import { ViolationCardDTO } from 'app/swagger/model/violationCardDTO';

// base methods
//  TODO wrong swagger response type
export const getViolationsSimple = (alias: FeatureAliases, dimension: LayerType, parentCode?: string | number, params?: GetViolationsParams) => {
  return !isNullOrUndefined(parentCode)
    ? axiosDashboard.get<GetViolationsResponse, GetViolationsResponse>(`${URL_VIOLATIONS}/${alias}/${dimension}/parent_code/${parentCode}`, {params})
    : axiosDashboard.get<GetViolationsResponse, GetViolationsResponse>(`${URL_VIOLATIONS}/${alias}/${dimension}`, {params});
};

//  TODO wrong swagger response type
export const getViolationsByDimensionAndFilter = (
  alias: FeatureAliases,
  dimension: LayerType,
  filter: string,
  value: string,
  params?: GetViolationsParams
) => (
  axiosDashboard.get<GetViolationsByDimensionAndFilterResponse, GetViolationsByDimensionAndFilterResponse>(`${URL_VIOLATIONS_BY_DIMENSION}/${dimension}/${alias}/${filter}/${value}`, { params })
);

export const getAllViolationsSimple = async (layersAliases: Layer['alias'][], alias: FeatureAliases, parentCode: string | number, params: GetViolationsParams) => {
  const allViolationByLayerAlias = await asyncArrayMap(
    layersAliases,
    (layerAlias) => getViolationsSimple(alias, layerAlias, parentCode, params),
  );

  return allViolationByLayerAlias.reduce<Partial<Record<LayerType, typeof allViolationByLayerAlias[0]>>>(
    (newRecord, resp, index) => {
      return {
        ...newRecord,
        [layersAliases[index]]: resp,
      };
    },
    {},
  );
};

export const getAllViolationsByDimensionAndFilter = async (
  layersAliases: Layer['alias'][], 
  alias: FeatureAliases,
  filter: string,
  value: string,
  params: GetViolationsParams,
) => {
  const allViolationByLayerAlias = await loadPromises(
    layersAliases.map((layerAlias) => {
      return getViolationsByDimensionAndFilter(alias, layerAlias, filter, value, params);
    })
  );

  return allViolationByLayerAlias.reduce<Record<LayerType, { total: ViolationTotalType; objects: GetViolationsByDimensionAndFilterResponse['objects']  }>>(
    (newRecord, resp, index) => {
      const countWithGovDeffect = resp.objects.filter(
        (rowData) => rowData?.defect?.violation_gov,
      ).length;
      const countWithCitizenDeffect = resp.objects.filter(
        (rowData) => rowData?.defect?.violation_citizen,
      ).length;
      const countWithDeffect = resp.objects.filter(
        (rowData) => rowData?.defect?.id,
      ).length;
      const countASUPRWithDeffect = resp.objects.filter(
        (rowData) => rowData?.defect?.id_systems_all?.includes('ASUPR'),
      ).length;

      const totalCount = resp.objects.length;

      return {
        ...newRecord,
        [layersAliases[index]]: {
          total: {
            violations_all: countWithDeffect,
            violations_gov: countWithGovDeffect,
            objects_with_violations: countWithDeffect,
            objects_citizen: countWithCitizenDeffect,
            objects_gov: countWithGovDeffect,
            violations_sys: countWithDeffect,
            
            objects_violations_asupr: countASUPRWithDeffect,
            amount_objects_asupr: totalCount,

            amount_objects: totalCount,
          },
          ...resp,
          objects: resp.objects.map((rowData) => ({
            ...rowData,
            total: {
              objects_violations_asupr: sumArr(rowData?.defect?.violation_citizen, rowData?.defect?.violation_gov) > 1 ? 1 : 0,
              violations: sumArr(rowData?.defect?.violation_citizen, rowData?.defect?.violation_gov) > 1 ? 1 : 0,
              objects_vioviolations_govlations_asupr: sumArr(rowData?.defect?.violation_citizen, rowData?.defect?.violation_gov) > 1 ? 1 : 0,
              objects_with_violations: sumArr(rowData?.defect?.violation_citizen, rowData?.defect?.violation_gov) > 1 ? 1 : 0,
              violations_sys: sumArr(rowData?.defect?.violation_citizen, rowData?.defect?.violation_gov) > 1 ? 1 : 0,
  
              amount_objects_asupr: 1,
              amount_objects: 1,
            }
          })),
        },
      };
    },
    null,
  );
};

type ParamsTO = {
  ID_object: string;
  ticket: string;
  data_creation: string;
  ID: string;
  system: string;
};

export const loadViolationCardData = async (params: ParamsTO) => {
  try {
    const { data } = await axiosDashboard.get<ViolationCardDTO>(`/api/v1/dashboard/violations/card?${queryString.stringify(params)}`);
    return data;
  } catch {
    return null;
  }
};

export const violationMoveCameraToCoordinates = (cameraIds: string[], lat: number, lng: number) => {
  if (cameraIds.length && lat > 30 && lng > 30) {
    return axiosDashboard.post(URL_VIOLATIONS_MOVE_CAMERA_TO_COORDINATES, { cameraIds, lat, lng });
  }
};
