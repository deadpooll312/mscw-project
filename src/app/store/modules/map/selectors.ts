import keyBy from 'lodash-es/keyBy';
import { ReduxState } from 'app/store/modules/@types';
import { createSelector } from 'reselect';

export const selectMapModule = (state: ReduxState) => state.map;

export const selectRegionsGeometry = (state: ReduxState) => selectMapModule(state).geometry_regions;
export const selectRegionsGeometryIndex = createSelector(
  selectRegionsGeometry,
  (geometryRegion) => {
    return keyBy(geometryRegion, (rowData) => rowData.properties.feature_id);
  },
);
export const selectDistrictsGeometry = (state: ReduxState) => selectMapModule(state).geometry_districts;
export const selectDistrictsGeometryIndex = createSelector(
  selectDistrictsGeometry,
  (geometryDistrict) => {
    return keyBy(geometryDistrict, (rowData) => rowData.properties.feature_id);
  },
);
export const selectViolationsGeometry = (state: ReduxState) => selectMapModule(state).geometry_violations;

export const selectPointMode = (state: ReduxState) => selectMapModule(state).pointMode;

export const selectCameraSettings = (state: ReduxState) => selectMapModule(state).cameraSettings;
export const selectSelectCameraEnabled = (state: ReduxState) => selectCameraSettings(state)?.enabled;
export const selectCameraRadius = (state: ReduxState) => selectCameraSettings(state)?.value;
