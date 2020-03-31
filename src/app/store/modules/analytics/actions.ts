import { MomentInput } from 'moment';
import ANALITYCS_TYPES from 'app/store/modules/analytics/action_types';
import { AnalyticsState, LoadAnalyticsDataOptions } from 'app/store/modules/analytics/types';
import {
  WIDGET_PAGE_CIRCLE,
  WIDGET_PAGE_CHARTS,
  WIDGET_PAGE_LINES,
  AvailableAnalyticsDataType,
} from 'app/store/modules/analytics/constants';
import createAction from 'app/store/promise_middleware/create_action';
import { Season, AnalyticsViolationTypes } from 'app/store/modules/@types';

// Сами экшены
export const wrapChangeCurrentTypes = (newCurrentType: AnalyticsState['selectedFilters']['currentTypes']) => {
  return ({
    type: ANALITYCS_TYPES.wrapChangeCurrentTypes,
    payload: {
      newCurrentType,
    },
  });
};

export const wrapChangeCurrentSystems = (newCurrentSystem: AnalyticsState['selectedFilters']['currentSystems']) => {
  return ({
    type: ANALITYCS_TYPES.wrapChangeCurrentSystems,
    payload: {
      newCurrentSystem,
    },
  });
};

export const changeCurrentTypes = (newCurrentType: AnalyticsState['selectedFilters']['currentTypes'], newDate: AnalyticsState['date']) => {
  return ({
    type: ANALITYCS_TYPES.changeCurrentTypes,
    payload: {
      newCurrentType,
      newDate,
    },
  });
};

export const changeCurrentSystems = (newCurrentSystem: AnalyticsState['selectedFilters']['currentSystems'], newDate: AnalyticsState['date']) => {
  return ({
    type: ANALITYCS_TYPES.changeCurrentSystems,
    payload: {
      newCurrentSystem,
      newDate,
    },
  });
};

export const changeDate = (date: MomentInput) => {
  return ({
    type: ANALITYCS_TYPES.changeDate,
    payload: {
      date,
    },
  });
};

export const loadAnalyticsData = (options: LoadAnalyticsDataOptions) => {
  const { date, currentTypes, currentSystems, season, violationType } = options;
  return createAction({
    type: ANALITYCS_TYPES.loadAnalyticsData,
    payload: {
      date,
      currentTypes,
      currentSystems,
      season,
      violationType
    },
  });
};

export const loadWidgetCircle = (options: LoadAnalyticsDataOptions) => {
  const { date, currentTypes, currentSystems, season, violationType } = options;
  return createAction({
    type: ANALITYCS_TYPES.loadWidgetCircle,
    payload: {
      type: WIDGET_PAGE_CIRCLE,
      date,
      currentTypes,
      currentSystems,
      season,
      violationType
    },
  });
};
export const loadWidgetLines = (options: LoadAnalyticsDataOptions) => {
  const { date, currentTypes, currentSystems, season, violationType } = options;
  return createAction({
    type: ANALITYCS_TYPES.loadWidgetLines,
    payload: {
      type: WIDGET_PAGE_LINES,
      date,
      currentTypes,
      currentSystems,
      season,
      violationType
    },
  });
};
export const loadWidgetCharts = (options: LoadAnalyticsDataOptions) => {
  const { date, currentTypes, currentSystems, season, violationType } = options;
  return createAction({
    type: ANALITYCS_TYPES.loadWidgetCharts,
    payload: {
      type: WIDGET_PAGE_CHARTS,
      date,
      currentTypes,
      currentSystems,
      season,
      violationType
    },
  });
};

export const setOneAnalyticsData = (type: AvailableAnalyticsDataType, data: AnalyticsState[AvailableAnalyticsDataType]) => {
  return ({
    type: ANALITYCS_TYPES.setOneAnalyticsData,
    payload: {
      type,
      data,
    },
  });
};

export const changeSeason = (season: Season.ALL | Season.MIXED | Season.WINTER) => {
  return ({
    type: ANALITYCS_TYPES.changeSeason,
    payload: {
      season,
    },
  });
};

export const changeViolationType = (violationType: AnalyticsViolationTypes | null) => {
  return ({
    type: ANALITYCS_TYPES.changeViolationType,
    payload: {
      violationType,
    },
  });
};

export const resetSelectedFilters = () => {
  return ({
    type: ANALITYCS_TYPES.resetSelectedFilters,
    payload: {},
  });
};
