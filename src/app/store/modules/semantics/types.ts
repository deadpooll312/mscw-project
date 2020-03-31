import { GeoJsonGeometryTypes } from 'geojson';
import { ViolationsTypes, ViolationColor } from '@next/ui/atoms/map/types';
import { LayerType } from 'containers/layers/types';
import { AVAILABLE_CONTROL, MAP_LEVEL } from './constants';
import { AnsLoadSystemType, GetViolationsResponse, GetViolationsByDimensionAndFilterResponse, ViolationTotalType } from 'app/api/types';
import { LayerObjectDTO } from 'app/swagger/model/layerObjectDTO';

export type Defect = {
  check_gov: number;
  color_code?: number;
  color_name: ViolationColor;
  fixation_date: string;      // '2019-11-08T17:25:40.846|2019-08-13T06:56:19.364'
  id: string;                 // 'id|id|id'
  id_systems: string;         // только фото ('id_systems|id_systems|id_systems')
  id_systems_all: string;     // и видео и фото
  id_systems_name: string;    // '{НГ,ЕДЦ}'
  latitude?: string;          // это поле есть у нарушений в парках
  longitude?: string;         // это поле есть у нарушений в парках
  text: string;
  ticket_all: string;         // 'ticket|ticket|ticket'
  ticket: string;             //  для фото и видео
  violation_citizen: number;
  violation_gov: number;
  violation_type?: string;     // {CMN,CMN,CRT}
};

export type ViolationData = {
  address: string;
  object_id: string;
  defect: Defect;
  district_id: string;
  feature_id: string;
  hasfotovideo: boolean;
  holder: string;
  region_id: string;
};

export type Violation = {
  data: ViolationData;
};

export type TotalViolation = {
  checks_gov: number;
  objects_violations_asupr?: number;
  violations_all: number;
  violations_citizen: number;
  objects_with_checks: number;
  amount_objects_asupr: number;
  violations_sys: number;
  violations_gov: number;
  objects_with_violations: number;
  objects_citizen: number;          // на текущий момент нет для зимы
  objects_gov: number;              // на текущий момент нет для зимы
  amount_objects: number;
};

export type ViolationObject = {
  feature_id: string;
  object_name: string;
  parent_code: string;
  object_code: string;
  object_short_name: string;
  total: TotalViolation;
  centroid?: Centroid;
};

export type ViolationsBySelectedLayer = {
  total: TotalViolation;
  objects: ViolationObject[];
};

export type Centroid = {
  coordinates: number[];
  type: GeoJsonGeometryTypes;
};

export type RegionDataItem = {
  name: string;
  shortName?: string;
  featureId: string;
  filterCode: string | number;
  objectId?: string;
  object_code: string;
  centroid?: Centroid;
  layerId: number;
  revisionId: number;
};

export type DistrictDataItem = {
  name: string;
  featureId: string;
  centroid: Centroid;
  objectId: string;
  objectCode: string;
};

export type DistrictInfo = {
  feature_id: string;
  object_code: string;
  object_name: string;
  object_short_name: string;
  parent_code: string;
};

export type Revision = {
  revision_id: number;
  timestamp: string;
};

export type LayerTotal = {
  objects_with_violations: number;
  objects: number;
  violations: number;
};

export type Layer = {
  alias: LayerType;
  layer_id: number;
  layer_name: string;
  revision: Revision;
  total: LayerTotal;
};

export type LayersState = {
  isLoading: boolean;
  data: Layer[];
  violations: {
    isLoading: boolean;
    selectedLayers: Layer[];
    infoRegion: Record<LayerType, GetViolationsResponse>;
    infoDistrict: Record<LayerType, GetViolationsResponse>;
    infoVioaltion: Record<LayerType, { total: ViolationTotalType; objects: GetViolationsByDimensionAndFilterResponse['objects']  }>;
  };
  violations_sys: LayersState['violations'];
  selectedTab: ViolationsTypes.violations | ViolationsTypes.violationsSys;
  ASUPR: {
    isSelected: boolean;
    data: ViolationsBySelectedLayer;
  };
};

export type LegendItem = {
  color: string;
  colorValue?: string;
  description: string;
  maxPercent: number;
  minPercent: number;
  emoji: string;
  code: string;
};

export type LegendState = {
  regionsAndDistrictsLegend: LegendItem[];
  violationsLegend: LegendItem[];
  violationsLegendSys: LegendItem[];
  regionsAndDistrictsLegendWinter: LegendItem[];
  violationsLegendWinter: LegendItem[];
  carsLegend: LegendItem[];
};

export type RegionsState = {
  isLoading: boolean;
  errors: any[];
  data: RegionDataItem[];
  layerId: number;
  revisionId: number;
  aliasId: string;
};

export type DistrictsState = {
  isLoading: boolean;
  errors: any[];
  data: DistrictDataItem[];
  layerId: number;
  revisionId: number;
  parentRegion: RegionDataItem;
  aliasId: string;
  filterAttributeId: string;
};

export type FutureSelectedObject = {
  regionId: string;
  districtId: string;
  featureId: string;
  dimension: LayerType;
};

export type UrlMap = {
  http: string;
  https: string;
};

export type Camera = {
  address: string;
  cameraTypeName: string;
  distance: number;
  districtName: string;
  fixed: boolean;
  hasArchive: number;
  id: string;
  lat: number;
  lng: number;
  name: string;
  shortName: string;
  state: number;
  fakeCoordinates?: boolean;
};

export type NearestCamerasState = {
  data: Camera[];
  mappingUrl: UrlMap[];
  lat: string;
  lng: string;
} | null;

export type WinterData = {
  daysAfterSnowfall: string;
  snowDepth: string;
};

export type DataFilters = {
  selectedSystemTypes: AnsLoadSystemType[0]['value'][];
  violationSource: AVAILABLE_CONTROL;
  kgh: boolean;
};

type IncidentsState = {
  [MAP_LEVEL.CITY]?: LayerObjectDTO[];
  [MAP_LEVEL.REGION]?: LayerObjectDTO[];
  [MAP_LEVEL.DISTRICT]?: LayerObjectDTO[];
  selectedRegion?: LayerObjectDTO;
  selectedDistrict?: LayerObjectDTO;
  selectedObject?: LayerObjectDTO;
};

export type SemanticsState = {
  errors: any[];
  systemTypes: AnsLoadSystemType;
  dataFilters: DataFilters;
  isLoading: boolean;
  legend: LegendState;
  layers: LayersState;
  regions: RegionsState;
  districts: DistrictsState;
  selectedObject: FutureSelectedObject;
  nearestCameras: NearestCamerasState;
  winterData: WinterData;

  incidents: IncidentsState;
};

export type SemanticStateKey = keyof SemanticsState;

