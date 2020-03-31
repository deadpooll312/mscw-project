import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import MAP_TYPES from 'app/store/modules/map/action_types';
import { initialMapState } from 'app/store/modules/map/initialState';
import createReducer from 'app/store/createReducer';
import { setMapPointMode, setCameraSettings, setRegionGeometry, setDistrictsGeometry, setViolationsGeometry } from 'app/store/modules/map/actions';

// тут вроде всё понятно
const mapReducerRaw = createReducer<'map'>(
  initialMapState,
  {
    [MAP_TYPES.setRegionGeometry](state, { payload }: ReturnType<typeof setRegionGeometry>) {
      return {
        ...state,
        geometry_regions: payload,
      };
    },
    [MAP_TYPES.setDistrictsGeometry](state, { payload }: ReturnType<typeof setDistrictsGeometry>) {
      return {
        ...state,
        geometry_districts: payload,
      };
    },
    [MAP_TYPES.setViolationsGeometry](state, { payload }: ReturnType<typeof setViolationsGeometry>) {
      return {
        ...state,
        geometry_violations: payload,
      };
    },
    [MAP_TYPES.setRegionGeometry](state, { payload }: ReturnType<typeof setRegionGeometry>) {
      return {
        ...state,
        geometry_regions: payload,
      };
    },
    [MAP_TYPES.setPointMode](state, { payload }: ReturnType<typeof setMapPointMode>) {
      return {
        ...state,
        pointMode: payload,
      };
    },
    [MAP_TYPES.setCameraSettings](state, { payload }: ReturnType<typeof setCameraSettings>) {
      return {
        ...state,
        cameraSettings: payload,
      };
    },
  }
);

const mapPersistConfig = {
  key: 'partialMap',
  storage,
  whitelist: [
    'geometry_regions',
    'geometry_districts',
  ],
};

export const mapReducer = persistReducer(mapPersistConfig, mapReducerRaw);
