// всякие различные константы
export const WIDGET_PAGE_CIRCLE = 'WIDGET_PAGE_CIRCLE' as const;
export const WIDGET_PAGE_LINES = 'WIDGET_PAGE_LINES' as const;
export const WIDGET_PAGE_CHARTS = 'WIDGET_PAGE_CHARTS' as const;

export type AvailableAnalyticsDataType = (
  typeof WIDGET_PAGE_CIRCLE
  | typeof WIDGET_PAGE_LINES
  | typeof WIDGET_PAGE_CHARTS
);

export enum SYSTEMS {
  CAFAP = 'CAFAP',
  OATI = 'OATI',
  MGI = 'MGI',
  CODD = 'CODD',
  EDC = 'EDC',
  NG = 'NG',
  ALL = 'ALL'
}

export const SYSTEMS_ALL = [
  SYSTEMS.CAFAP, SYSTEMS.OATI, SYSTEMS.MGI, SYSTEMS.CODD, SYSTEMS.EDC, SYSTEMS.NG
];