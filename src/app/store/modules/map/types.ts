import { AnyAction } from 'redux';
import { Geometry } from 'geojson';
import { Centroid } from 'app/store/modules/semantics/types';
import { PointMode } from 'app/store/modules/@types';
import { KeyPropertyDTO } from 'app/swagger/model/keyPropertyDTO';
import { LayerType } from 'containers/layers/types';

export type DashboardFeature = {
  geometry: Geometry;
  geometry_name: string;
  id: string;
  properties: {
    [key: string]: any;
    centroid: Centroid;
    feature_id: string;
  };
  type: string;
};

export type MapStateSetKeyAction = {
  key: keyof MapState;
  payload: any;
} & AnyAction;

export type MapLayerType = 'districts' | 'regions' | 'violations';

export type ViolationsGeometry = {
  [key in LayerType]?: DashboardFeature[];
};

export type MapState = {
  geometry_districts: DashboardFeature[];
  geometry_regions: DashboardFeature[];
  geometry_violations: ViolationsGeometry;
  pointMode: PointMode.OFF | PointMode.SEARCH | PointMode.SELECTED;
  cameraSettings: Partial<KeyPropertyDTO>;
};
