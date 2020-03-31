import { AnalyticsState, AvalibleCurrentTypes } from 'app/store/modules/analytics/types';
import {
  WIDGET_PAGE_CIRCLE,
  WIDGET_PAGE_LINES,
  WIDGET_PAGE_CHARTS,
  SYSTEMS_ALL,
} from 'app/store/modules/analytics/constants';
import { getCurrentMomentDate, formateDate } from '@next/utils/dates';
import { Season, AnalyticsViolationTypes } from 'app/store/modules/@types';

// начальное состояние
export const initialStateAnalytics: AnalyticsState = {
  date: formateDate(getCurrentMomentDate()),
  selectedFilters: {
    currentTypes: new Set<AvalibleCurrentTypes>(['dt', 'tpu', 'mkd', 'odh']),
    currentSystems: new Set(SYSTEMS_ALL),
    currentSeason: Season.MIXED,
    currentViolationType: AnalyticsViolationTypes.CRT,
  },
  [WIDGET_PAGE_CIRCLE]: {
    isLoading: false,
    data: null,
  },
  [WIDGET_PAGE_LINES]: {
    isLoading: false,
    data: null,
  },
  [WIDGET_PAGE_CHARTS]: {
    isLoading: true,
    data: null,
  },
};