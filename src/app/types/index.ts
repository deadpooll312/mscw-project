import { RestResult as SwaggerRestResult } from 'app/swagger/model/restResult';
import { AnalyticsViolationTypes, Season } from 'app/store/modules/@types';
// import { WidgetFilter } from 'app/swagger/model/widgetFilter';
import { AdvancedWidgetFilter } from 'app/store/modules/dashboard/types';

export enum TabId {
  MAP = 'MAP',
  REPORT = 'REPORT',
  ANALYTICS = 'ANALYTICS',
  DASHBOARD = 'DASHBOARD',
  TABLE = 'TABLE'
}
export type Action = {
  type: string;
  tags: string[];
  data: any;
};

export enum LayerRenderMode {
  CLUSTER = 'CLUSTER',
  DEFAULT = 'DEFAULT'
}

export enum TileType {
  TGIS = '2GIS',
  EGKO = 'ЕГКО',
  SATELLITE = 'Спутник',
  OSM = 'OSM'
}

export enum FetchMode {
  LAYER = 'LAYER',
  VIEW = 'VIEW',
  COMPOSITE = 'COMPOSITE',
  REVISIONS = 'REVISIONS',
  VIEWS = 'VIEWS',
}

export enum Breakpoints {
  LAPTOP = 'LAPTOP',
  DESKTOP = 'DESKTOP',
  WIDE = 'WIDE',
}

export enum BreakpointSizes {
  LAPTOP = 1280,
  DESKTOP = 1920,
}

export enum DataType {
  STRING = 'STRING',
  INTEGER = 'INTEGER',
  BOOLEAN = 'BOOLEAN',
  DATE = 'DATE',
  DECIMAL = 'DECIMAL',
  PHOTO = 'PHOTO',
}

export enum ViolationSource {
  ASUPR = 'ASUPR',
  SYS = 'SYS'
}

export enum FILTER_ACTION {
  DELETE,
  ADD,
}

export enum AllSearchStringField {
  DEFECT_TEXT = 'DEFECT_TEXT',
  ADDRESS = 'ADDRESS',
  OBJECT_ID = 'OBJECT_ID',
  TICKET = 'TICKET'
}
export enum AllSearchButtonField {
  TRASH_CONTAINERS = 'TRASH_CONTAINERS',
}

export enum AllSearchField {
  DEFECT_TEXT = AllSearchStringField.DEFECT_TEXT,
  ADDRESS = AllSearchStringField.ADDRESS,
  OBJECT_ID = AllSearchStringField.OBJECT_ID,
  TICKET = AllSearchStringField.TICKET,
  TRASH_CONTAINERS = AllSearchButtonField.TRASH_CONTAINERS,
}

export enum WidgetDataType {
  SOURCES = 'SOURCES',
  EVENTS = 'EVENTS',
  REGIONS = 'REGIONS',
  OBJECTS = 'OBJECTS',
  DEFECTS = 'DEFECTS',
  SOURCE_GROUPS = 'SOURCE_GROUPS',
  DISTRICTS = 'DISTRICTS'
}

// Тип авторизованный пользователь (не все поля )
export type User = {
  id: string;
  attributes: any;
  profile: string;
  organization: string;
  groups: any;
  roles: string[];
  validTo: string;
  password: null;
  username: string;
  authorities: any;
  permissions: any;
};

export type RestResult<T> = {
    code?: SwaggerRestResult.CodeEnum;
    data?: T;
    errorCode?: number;
    requestId?: string;
    responseId?: string;
    stackTrace?: string;
    synopsis?: string;
};

// Для админки
export enum PropertyType {
  CAMERA = 'CAMERA',
}

export type PrimaryFilter = {
  startDate?: string | null;
  endDate?: string | null;
  violationType?: AnalyticsViolationTypes | null;
  season?: Season | null;
  usePeriod?: boolean;
};

export type FeatureIncidentPrimaryFilter = PrimaryFilter & {
  alias?: string;
  featureId?: string;
  theme?: string;
};

export type DashboardDataFilter = PrimaryFilter & Partial<AdvancedWidgetFilter>;
