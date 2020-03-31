import MAP_TYPES from 'app/store/modules/map/action_types';
import { MapState } from 'app/store/modules/map/types';
import { Layer } from 'app/store/modules/semantics/types';
import createAction from 'app/store/promise_middleware/create_action';
import { KeyPropertyDTO } from 'app/swagger/model/keyPropertyDTO';

export const setRegionGeometry = (params: MapState['geometry_regions']) => ({
  type: MAP_TYPES.setRegionGeometry,
  payload: params,
});
export const setDistrictsGeometry = (params: MapState['geometry_districts']) => ({
  type: MAP_TYPES.setDistrictsGeometry,
  payload: params,
});
export const setViolationsGeometry = (params: Partial<MapState['geometry_violations']>) => ({
  type: MAP_TYPES.setViolationsGeometry,
  payload: params,
});

export const clearViolationsGeometry = () => (
  setViolationsGeometry(null)
);

export const getRegionsGeometry = (layerId: number, revisionId: number) => createAction({
  type: MAP_TYPES.getRegionsGeometry,
  payload: {
    layerId,
    revisionId,
  },
});

export const getDistrictsGeometryByRegion = (layerId: number, revisionId: number, filterAttributeId: string, parentRegionFilterCode: string | number) => createAction({
  type: MAP_TYPES.getDistrictsGeometryByRegion,
  payload: {
    layerId,
    revisionId,
    filterAttributeId,
    parentRegionFilterCode,
  },
});

export const getViolationsGeometryByDistrict = (layer: Layer, selectedDistrictFeatureId: string) => createAction({
  type: MAP_TYPES.getViolationsGeometryByDistrict,
  payload: {
    layer,
    selectedDistrictFeatureId,
  },
});

export const setMapPointMode = (mode: MapState['pointMode']) => ({
  type: MAP_TYPES.setPointMode,
  payload: mode,
});

export const setCameraSettings = (settings: Partial<KeyPropertyDTO>) => ({
  type: MAP_TYPES.setCameraSettings,
  payload: settings,
});
