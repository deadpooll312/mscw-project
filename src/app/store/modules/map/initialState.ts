import { MapState } from 'app/store/modules/map/types';
import { PointMode } from 'app/store/modules/@types';

export const initialMapState: MapState = {
  geometry_districts: [],
  geometry_regions: [],
  geometry_violations: null,
  pointMode: PointMode.OFF,
  cameraSettings: {},
};
