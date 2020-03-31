import { Season, AnalyticsViolationTypes } from 'app/store/modules/@types';
import { TabId } from 'app/types';

export const SIDEBAR_TABS_LEFT = {
  [TabId.DASHBOARD]: {
    id: TabId.DASHBOARD,
    title: 'Дашборд',
    path: '/dashboard',
  },
  [TabId.TABLE]: {
    id: TabId.TABLE,
    title: 'Таблица',
    path: '/table',
  },
} as const;

export const SIDEBAR_TABS_RIGHT = {
  [TabId.MAP]: {
    id: TabId.MAP,
    title: 'Карта',
    path: '/map',
    notVisible: false,
  },
  [TabId.REPORT]: {
    id: TabId.REPORT,
    title: 'Отчеты',
    path: '/reports',
    notVisible: true,
  },
  [TabId.ANALYTICS]: {                          // Пока не используется
    id: TabId.REPORT,
    title: 'АНАЛИТИКА',
    path: '/analytics',
    notVisible: true,
  },
} as const;

export const SIDEBAR_TABS = {
  ...SIDEBAR_TABS_LEFT,
  ...SIDEBAR_TABS_RIGHT,
} as const;

export const SIDEBAR_TABS_LEFT_ENTRIES = Object.entries(SIDEBAR_TABS_LEFT);
export const SIDEBAR_TABS_RIGHT_MAP_ENTRIES = Object.entries(SIDEBAR_TABS_RIGHT);
export const SIDEBAR_TABS_ENTRIES = Object.entries(SIDEBAR_TABS);

export const SIDEBAR_SESASONS = [
  {
    id: Season.WINTER,
    title: 'Зима',
  },
  {
    id: Season.ALL,
    title: 'Лето',
  }
];

export const SIDEBAR_VIOLATIONS = [
  {
    id: AnalyticsViolationTypes.CRT,
    title: 'Критичные',
  },
  {
    id: AnalyticsViolationTypes.CMN,
    title: 'Некритичные',
  },
  {
    id: AnalyticsViolationTypes.SYS,
    title: 'Систематические',
  },
];
