import keyBy from 'lodash-es/keyBy';

import SIDEBAR_TYPES from './action_types';
import { Season, AnalyticsViolationTypes } from 'app/store/modules/@types';
import { WidgetFilter } from 'app/swagger/model/widgetFilter';
import { DashboardDataFilter } from 'app/types';
import { SearchFilter } from 'app/store/modules/dashboard/types';

export const changeStartDate = (startDate: string) => {
  return ({
    type: SIDEBAR_TYPES.changeStartDate,
    payload: startDate,
  });
};

export const changeEndDate = (endDate: string) => {
  return ({
    type: SIDEBAR_TYPES.changeEndDate,
    payload: endDate,
  });
};

export const changeSidebarDate = (startDate: string, endDate: string) => {
  return ({
    type: SIDEBAR_TYPES.changeSidebarDate,
    payload: {
      startDate,
      endDate,
    },
  });
};

export const changeSeason = (season: Season) => {
  return ({
    type: SIDEBAR_TYPES.changeSeason,
    payload: season,
  });
};

export const changeViolationType = (violationType: AnalyticsViolationTypes) => {
  return ({
    type: SIDEBAR_TYPES.changeViolationType,
    payload: violationType,
  });
};

export const changeSelectedEvents = (payload) => {
  return ({
    type: SIDEBAR_TYPES.changeSelectedEvents,
    payload,
  });
};

export const changeSelectedObjects = (payload) => {
  return ({
    type: SIDEBAR_TYPES.changeSelectedObjects,
    payload,
  });
};

export const changeSelectedSources = (payload) => {
  return ({
    type: SIDEBAR_TYPES.changeSelectedSources,
    payload,
  });
};

export const changeSelectedViolationTypes = (payload) => {
  return ({
    type: SIDEBAR_TYPES.changeSelectedViolationTypes,
    payload,
  });
};

export const changeSelectedRegions = (payload) => {
  return ({
    type: SIDEBAR_TYPES.changeSelectedRegions,
    payload,
  });
};

export const changeSelectedDistricts = (payload) => {
  return ({
    type: SIDEBAR_TYPES.changeSelectedDistricts,
    payload,
  });
};

export const changeSecondaryFilters = (payload: Partial<WidgetFilter>) => {
  return ({
    type: SIDEBAR_TYPES.changeSecondaryFilters,
    payload,
  });
};

export const setInitialFilters = (payload: Partial<DashboardDataFilter>) => {
  return ({
    type: SIDEBAR_TYPES.setInitialFilters,
    payload,
  });
};

export const resetToInitialFilters = () => {
  return ({
    type: SIDEBAR_TYPES.resetToInitialFilters,
    payload: {},
  });
};

export const resetToInitialFiltersWithSaveViolationAndSeason = () => {
  return ({
    type: SIDEBAR_TYPES.resetToInitialFiltersWithSaveViolationAndSeason,
    payload: {},
  });
};

export const changeUsePeriod = (usePeriod: boolean) => {
  return ({
    type: SIDEBAR_TYPES.changeUsePeriod,
    payload: {
      usePeriod,
    },
  });
};

export const changeSearchFilter = (searchFilter: SearchFilter[]) => {
  const searchFilterRecord = keyBy(searchFilter, 'field');

  return ({
    type: SIDEBAR_TYPES.changeSearchFilter,
    payload: {
      searchFilterRecord,
    },
  });
};
