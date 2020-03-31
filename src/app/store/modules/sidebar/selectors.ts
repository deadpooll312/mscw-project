import { createSelector } from 'reselect';

import { ReduxState, AnalyticsViolationTypes } from 'app/store/modules/@types';
import { selectAppThemeName } from 'app/store/modules/app/selectors';
import { AllSearchButtonField } from 'app/types';

export const selectModuleSidebar = (state: ReduxState) => {
  return state.sidebar;
};

export function selectModuleSidebarFilters(state: ReduxState) {
  return selectModuleSidebar(state).filters;
}

export const selectModuleSidebarViolationType = (state: ReduxState) => {
  return selectModuleSidebarFilters(state)?.violationType;
};
export const selectModuleSidebarViolationTypeIsSys = (state: ReduxState) => {
  return selectModuleSidebarViolationType(state) === AnalyticsViolationTypes.SYS;
};
export const selectModuleSidebarSeason = (state: ReduxState) => {
  return selectModuleSidebarFilters(state)?.season;
};

export const selectModuleSidebarObjects = (state: ReduxState) => {
  return selectModuleSidebarFilters(state)?.objects;
};
export const selectModuleSidebarEvents = (state: ReduxState) => {
  return selectModuleSidebarFilters(state)?.events;
};
export const selectModuleSidebarSources = (state: ReduxState) => {
  return selectModuleSidebarFilters(state)?.sources;
};
export const selectModuleSidebarDefects = (state: ReduxState) => {
  return selectModuleSidebarFilters(state)?.defects;
};
export const selectModuleSidebarRegions = (state: ReduxState) => {
  return selectModuleSidebarFilters(state)?.regions;
};

export const selectModuleSidebarDistricts = (state: ReduxState) => {
  return selectModuleSidebarFilters(state)?.districts;
};

export const selectModuleSidebarSourceGroups = (state: ReduxState) => {
  return selectModuleSidebarFilters(state)?.sourceGroups;
};

export const selectModuleSidebarUsePeriod = (state: ReduxState) => {
  return selectModuleSidebarFilters(state)?.usePeriod;
};

export const selectModuleSidebarStartDateRaw = (state: ReduxState) => {
  return selectModuleSidebarFilters(state)?.startDate;
};

export const selectModuleSidebarEndDateRaw = (state: ReduxState) => {
  return selectModuleSidebarFilters(state)?.endDate;
};

export const selectModuleSidebarSearchFilter = (state: ReduxState) => {
  return selectModuleSidebarFilters(state)?.search;
};

export const selectModuleSidebarSearchStringFilter = createSelector(
  selectModuleSidebarSearchFilter,
  (search) => {
    return search.filter((rowData) => rowData.isStringSearch);
  },
);

export const selectModuleSidebarSearchButtonFilter = createSelector(
  selectModuleSidebarSearchFilter,
  (search) => {
    return search.filter((rowData) => rowData.isButtonSearch);
  },
);

export const selectModuleSidebarSearchButtonTrashContainerFilter = createSelector(
  selectModuleSidebarSearchButtonFilter,
  (buttonString) => {
    return buttonString.find((rowData) => rowData.field === AllSearchButtonField.TRASH_CONTAINERS);
  },
);

export const selectModuleSidebarSearchActiveStringFilter = createSelector(
  selectModuleSidebarSearchStringFilter,
  (searchString) => {
    return searchString.find((rowData) => rowData.isActive) || searchString[0];
  },
);

export const selectModuleSidebarSearchFilterField = (state: ReduxState) => {
  return selectModuleSidebarSearchActiveStringFilter(state)?.field;
};

export const selectModuleSidebarSearchFilterValue = (state: ReduxState) => {
  return selectModuleSidebarSearchActiveStringFilter(state)?.value;
};

export const selectModuleSidebarStartDate = selectModuleSidebarStartDateRaw;
export const selectModuleSidebarEndDate = selectModuleSidebarEndDateRaw;

export const selectPrimaryFiltersWithoutTheme = createSelector(
  selectModuleSidebarStartDate,
  selectModuleSidebarEndDate,
  selectModuleSidebarViolationType,
  selectModuleSidebarSeason,
  selectModuleSidebarUsePeriod,
  (startDate, endDate, violationType, season, usePeriod) => {
    return {
      startDate,
      endDate,
      violationType,
      season,
      usePeriod,
    };
  },
);

export const selectPrimaryFilters = createSelector(
  selectPrimaryFiltersWithoutTheme,
  selectAppThemeName,
  (primaryFiltersWithoutTheme, themeName) => {
    return {
      ...primaryFiltersWithoutTheme,
      theme: themeName,
    };
  },
);

export const selectSecondaryFilters = createSelector(
  selectModuleSidebarObjects,
  selectModuleSidebarEvents,
  selectModuleSidebarSources,
  selectModuleSidebarDefects,
  selectModuleSidebarRegions,
  selectModuleSidebarDistricts,
  selectModuleSidebarSourceGroups,
  (objects, events, sources, defects, regions, districts, sourceGroups) => {
    return {
      objects,
      events,
      sources,
      defects,
      regions,
      districts,
      sourceGroups,
    };
  },
);

export const selectSecondaryFiltersWithSearch = createSelector(
  selectModuleSidebarObjects,
  selectModuleSidebarEvents,
  selectModuleSidebarSources,
  selectModuleSidebarDefects,
  selectModuleSidebarRegions,
  selectModuleSidebarDistricts,
  selectModuleSidebarSourceGroups,
  selectModuleSidebarSearchFilter,
  (objects, events, sources, defects, regions, districts, sourceGroups, search) => {
    return {
      objects,
      events,
      sources,
      defects,
      regions,
      districts,
      sourceGroups,
      search,
    };
  },
);

export const selectSecondaryFiltersWithoutRegionAndDistricts = createSelector(
  selectModuleSidebarObjects,
  selectModuleSidebarEvents,
  selectModuleSidebarSources,
  selectModuleSidebarDefects,
  selectModuleSidebarSourceGroups,
  (objects, events, sources, defects, sourceGroups) => {
    return {
      objects,
      events,
      sources,
      defects,
      sourceGroups,
    };
  },
);

export const selectInitialFilters = (state: ReduxState) => {
  return selectModuleSidebar(state).initialFilters;
};

export const selectInitialSources = (state: ReduxState) => {
  return selectInitialFilters(state).sources;
};
