// import type { ReportStore } from 'app/store/modules/report/types';
// import type { AnalyticsState } from 'app/store/modules/analytics/types';
import type { MapState } from 'app/store/modules/map/types';
import type { SemanticsState } from 'app/store/modules/semantics/types';
import type { AppState } from 'app/store/modules/app/types';
import type { SidebarState } from 'app/store/modules/sidebar/types';
import type { DashboardState } from 'app/store/modules/dashboard/types';
import type { ViolationCardState } from 'app/store/modules/violation_card/types';
import type { DashboardTableState } from 'app/store/modules/table/types';
import type { CarCardState } from 'app/store/modules/car_card/types';

export enum Season {
  ALL = 'all',
  WINTER = 'winter',
  MIXED = 'mixed'
}

export enum PointMode {
  OFF = 'off',
  SEARCH = 'search',
  SELECTED = 'selected'
}

export enum AnalyticsViolationTypes {
  CRT = 'CRT',
  ALL = 'ALL',
  CMN = 'CMN',
  SYS = 'SYS',
}

export const ViolationTypes = {
  [AnalyticsViolationTypes.CMN]:  'Некритичное',
  [AnalyticsViolationTypes.CRT]:  'Критичное',
  [AnalyticsViolationTypes.SYS]:  'Систематическое',
};

// На бэке типа ALL нет
export type AvalibleSourceSystems = 'CAFAP' | 'OATI' | 'MGI' | 'CODD' | 'EDC' | 'NG' | 'ALL';

export type AvalibleLayerTypes = 'tpu' | 'mkd' | 'odh' | 'dt';

export type ReduxState = {
  loading: any;                // @todo описать

  // not dva
  analytics: any; // AnalyticsState;
  report: any; // ReportStore;
  map: MapState;
  semantics: SemanticsState;
  app: AppState;
  sidebar: SidebarState;
  dashboard: DashboardState;
  dashboardTable: DashboardTableState;
  violationCard: ViolationCardState;
  carCard: CarCardState;
};
