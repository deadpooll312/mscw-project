import { ReportType } from 'app/api/reports';
import { Season } from 'app/store/modules/@types';

export enum ROLES {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_DASHBORD_MER = 'ROLE_DASHBORD_MER',
  ROLE_DASHBORD_PREFEKT = 'ROLE_DASHBORD_PREFEKT',
  ROLE_DASHBORD_ADMINISTRATOR = 'ROLE_DASHBORD_ADMINISTRATOR',
  UNKNOWN = 'UNKNOWN'
}

export enum MAP_PERMISSION {
  YELLOW = 'yellow', // полномочие просмотра "желтых" объектов нарушений
  LINKS = 'links', // полномочие просмотра ссылок в карточке объекта
}
export enum LEGEND_PERMISSION {
  YELLOW = 'yellow', // полномочие просмотра "желтых" объектов нарушений
  NOT_CRITICAL = 'not_critical', // полномочие просмотра ссылок в карточке объекта
}

export const REPORT_PERMISSIONS = {
  [ROLES.ROLE_DASHBORD_MER]: [ReportType.dayMayor, ReportType.week, ReportType.primaryData],
  [ROLES.ROLE_DASHBORD_PREFEKT]: [ReportType.dayPrefect, ReportType.week, ReportType.primaryData],
  [ROLES.UNKNOWN]: [],
};

export const MAP_DATA_PERMISSIONS = {
  [ROLES.ROLE_DASHBORD_MER]: [MAP_PERMISSION.LINKS],
  [ROLES.ROLE_DASHBORD_PREFEKT]: [MAP_PERMISSION.YELLOW],
  [ROLES.ROLE_DASHBORD_ADMINISTRATOR]: [MAP_PERMISSION.YELLOW, MAP_PERMISSION.LINKS],
};

export const LEGEND_PERMISSIONS = {
  [ROLES.ROLE_DASHBORD_MER]: [LEGEND_PERMISSION.NOT_CRITICAL, LEGEND_PERMISSION.YELLOW] as string[],
  [ROLES.UNKNOWN]: [],
};

export const SEASONS_FOR_MER = new Set([
  Season.WINTER,
  Season.ALL,
  Season.MIXED,
]);
