
import { Season, AnalyticsViolationTypes } from 'app/store/modules/@types';
import { SYSTEMS } from 'app/store/modules/analytics/constants';
import { Centroid, TotalViolation, ViolationObject, ViolationData, Camera, UrlMap } from 'app/store/modules/semantics/types';

import { LayerType } from 'containers/layers/types';
import { AVAILABLE_CONTROL } from 'app/store/modules/semantics/constants';
import { ROLES } from 'app/permissions/constants';
import { ReportDataColorSchema, PageTwoData, PageThreeData, PageFourData, PageFiveData, PageSixData, PageSevenData } from 'app/store/modules/report/types';
import { SECOND_PAGE, THIRD_PAGE, FOURTH_PAGE, SIXTH_PAGE, FIFTH_PAGE, SEVENTH_PAGE } from 'app/store/modules/report/constants';
import { ObjectForTableDTO } from 'app/swagger/model/objectForTableDTO';
import { PageResultObjectForTableDTO } from 'app/swagger/model/pageResultObjectForTableDTO';
import { WidgetElement } from 'app/swagger/model/widgetElement';
import { LayerObjectDTO } from 'app/swagger/model/layerObjectDTO';
import { WidgetDataType } from 'app/types';
import { AdvancedWidgetFilter } from 'app/store/modules/dashboard/types';

export enum FeatureAliases {
  CITY = 'moscow.russia',
  REGION = 'regions.moscow.russia',
  DISTRICT = 'districts.regions.moscow.russia'
}

export enum AvailableViolationSource {
  GOVERNMENT = 'GOVERNMENT',
  CITIZEN = 'CITIZEN',
  SYS = 'SYS',
  ASUPR = 'ASUPR',
  ALL = 'ALL',
}

//features

export type FeatureJSON = {
  attributes: {
    object_id_type: string;
    object_name: string;
    object_name_type: string;
    object_id: string;

    object_abbr?: string;
    object_abbr_type?: string;
    object_alias?: string;
    object_alias_type?: string;
    object_code?: string;
    object_code_type?: string;
    parent_abbr?: string;
  };
  layer_id: number;
  properties: {
    feature_id: string;
    centroid: Centroid;
    object_name: string;
    object_code: string;
    object_id: string;

    parent_code?: string;
    object?: string;
    object_abbreviation?: string;
  };
  revision_id: number;
};

//camera

export type CameraPositionsToMove = {
  data: {
    presets: {
      id: string;
      title: string;
      system: true;
      objectId: 47;
    }[];
  };
};

export type EchdNearCameraResponse = {
  lng: string;
  lat: string;
  eventId?: string;
  cameras: Camera[];
  mappingUrl: UrlMap[];
};

export type AnsGetCamerasAzimuths = {
  azimuths: [
    {
      azimuth: number;
      cameraId: string;
      x: number;
      y: number;
      z: number;
    }
  ];
};

//vioaltions

export type ObjectFilter = {
  filterField: string;
  filterValue: string;
};

export type AnsLoadSystemType = {
  value: string;
  name: string;
  description: string;
  type: AVAILABLE_CONTROL;
}[];

export type GetViolationCardParams = {
  system: SYSTEMS;
  ticket: string;
};

export type GetViolationsParams = {
  startDate?: string;
  endDate?: string;
  role?: ROLES;
  season?: Season;
  violationSource?: string; // AvailableViolationSource
  violationSourceSystem?: string;
};

export type GetViolationsResponse = {
  total: TotalViolation;
  objects: ViolationObject[];
};

export type ViolationTotalType = Pick<
  GetViolationsResponse['total'],
  'violations_all'
  | 'violations_gov'
  | 'objects_with_violations'
  | 'violations_sys'
  | 'objects_violations_asupr'
  | 'amount_objects_asupr'
  | 'amount_objects'
  >;

export type GetViolationsByDimensionAndFilterResponse = {
  objects: ViolationData[];
};

//weather

export enum WeatherPartsType {
  DAY = 'day',
  EVENING = 'evening',
  MORNING = 'morning',
  NIGHT = 'night',
}

export type WeatherPart = {
  condition: string;
  precMm: number;
  tempAvg: number;
  windDir: string;
  windGust: number;
};

export type GetWeatherDataResponse = {
  date: string;
  featureId: number;
  parts: Record<WeatherPartsType, WeatherPart>;
};

//layers

export type GetLayersParams = {
  startDate?: string;
  endDate?: string;
};

//report

export type ReportInfoResponse = {
    id: number;
    season: 'winter' | string;
    type: string;

    colorSchema: ReportDataColorSchema;

    semantic: {
      date: string;
      pages: [
        PageTwoData,
        PageThreeData,
        PageFourData,
        PageFiveData,
        PageSixData,
        PageSevenData,
      ];
      pagesIndex: {
        [SECOND_PAGE]: PageTwoData;
        [THIRD_PAGE]: PageThreeData;
        [FOURTH_PAGE]: PageFourData;
        [FIFTH_PAGE]: PageFiveData;
        [SIXTH_PAGE]: PageSixData;
        [SEVENTH_PAGE]: PageSevenData;
      };
    };
};

export type ObjectForTable = ObjectForTableDTO & {
  objectTypeCode?: LayerType;
};

export type PageResultObjectForTable = PageResultObjectForTableDTO & {
  objects?: ObjectForTable[];
};

export type LayerIncidentResult = {
  objectViolations: LayerObjectDTO[];
  objects: WidgetElement[];
};

export type GetDashboardDashletDataParams = {
  date: string;
  regionId?: string;
  districtId?: string;
};

export type WidgetAllFilterDTO = {
  uuid: string;
  responseDataTypes: WidgetDataType[];
  startDate: string;
  endDate: string;
  violationTypes: AnalyticsViolationTypes[];
  season: Season[];
  theme: string;
  usePeriod: boolean;
} & AdvancedWidgetFilter;
