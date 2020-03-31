import createReducer from 'app/store/createReducer';
import { initialStateSidebar } from 'app/store/modules/sidebar/initialState';
import SIDEBAR_TYPES from 'app/store/modules/sidebar/action_types';
import * as actions from 'app/store/modules/sidebar/actions';
import { getCurrentMomentDate, formateDate, getLastCleaningDate, checkToday21AndSubtract, set2059IfNotToday } from '@next/utils/dates';
import { AnalyticsViolationTypes, Season } from 'app/store/modules/@types';
import { filterDashboardFiltersByActive } from 'app/store/modules/dashboard/utils';
import { isNullOrUndefined } from 'util';

export const sidebarReducer = createReducer<'sidebar'>(
  initialStateSidebar,
  {
    [SIDEBAR_TYPES.changeStartDate](state, { payload }: ReturnType<typeof actions.changeStartDate>) {
      return {
        ...state,
        filters: {
          ...state.filters,
          startDate: payload,
        }
      };
    },
    [SIDEBAR_TYPES.changeEndDate](state, { payload }: ReturnType<typeof actions.changeEndDate>) {
      return {
        ...state,
        filters: {
          ...state.filters,
          endDate: payload,
        }
      };
    },
    [SIDEBAR_TYPES.changeSidebarDate](state, { payload }: ReturnType<typeof actions.changeSidebarDate>) {
      return {
        ...state,
        filters: {
          ...state.filters,
          startDate: payload.startDate,
          endDate: payload.endDate,
        }
      };
    },
    [SIDEBAR_TYPES.changeSeason](state, { payload }: ReturnType<typeof actions.changeSeason>) {
      return {
        ...state,
        filters: {
          ...state.filters,
          season: payload,
        }
      };
    },
    [SIDEBAR_TYPES.changeViolationType](state, { payload }: ReturnType<typeof actions.changeViolationType>) {
      return {
        ...state,
        filters: {
          ...state.filters,
          violationType: payload,
        }
      };
    },

    [SIDEBAR_TYPES.changeSelectedObjects](state, { payload }: ReturnType<typeof actions.changeSelectedObjects>) {
      return {
        ...state,
        filters: {
          ...state.filters,
          objects: payload,
        }
      };
    },
    [SIDEBAR_TYPES.changeSelectedEvents](state, { payload }: ReturnType<typeof actions.changeSelectedEvents>) {
      return {
        ...state,
        filters: {
          ...state.filters,
          events: payload,
        }
      };
    },
    [SIDEBAR_TYPES.changeSelectedSources](state, { payload }: ReturnType<typeof actions.changeSelectedSources>) {
      return {
        ...state,
        filters: {
          ...state.filters,
          sources: [...payload],
        }
      };
    },
    [SIDEBAR_TYPES.changeSelectedViolationTypes](state, { payload }: ReturnType<typeof actions.changeSelectedViolationTypes>) {
      return {
        ...state,
        filters: {
          ...state.filters,
          violation_types: payload
        }
      };
    },

    [SIDEBAR_TYPES.changeUsePeriod](state, { payload }: ReturnType<typeof actions.changeUsePeriod>) {
      const newEndDate = payload.usePeriod
        ? set2059IfNotToday(state.filters.endDate)
        : formateDate(getCurrentMomentDate());

      const newStartDate = payload.usePeriod
        ? getLastCleaningDate(checkToday21AndSubtract(newEndDate))
        : newEndDate;

      return {
        ...state,
        filters: {
          ...state.filters,
          usePeriod: payload.usePeriod,
          endDate: newEndDate,
          startDate: newStartDate,
        }
      };
    },

    [SIDEBAR_TYPES.changeSelectedRegions](state, { payload }: ReturnType<typeof actions.changeSelectedRegions>) {
      return {
        ...state,
        filters: {
          ...state.filters,
          regions: payload
        }
      };
    },

    [SIDEBAR_TYPES.changeSelectedDistricts](state, { payload }: ReturnType<typeof actions.changeSelectedDistricts>) {
      return {
        ...state,
        filters: {
          ...state.filters,
          districts: payload
        }
      };
    },

    [SIDEBAR_TYPES.changeSecondaryFilters](state, {payload}: ReturnType<typeof actions.changeSecondaryFilters>) {
      return {
        ...state,
        filters: {
          ...state.filters,
          ...payload
        }
      };
    },
    [SIDEBAR_TYPES.changeSearchFilter](state, {payload}: ReturnType<typeof actions.changeSearchFilter>) {
      return {
        ...state,
        filters: {
          ...state.filters,
          search: state.filters.search.map((rowData) => {
            if (rowData.field in payload.searchFilterRecord) {
              return payload.searchFilterRecord[rowData.field];
            }

            if (rowData.isStringSearch && rowData.isActive || !isNullOrUndefined(rowData.value)) {
              return {
                ...rowData,
                value: null,
                isActive: false,
              };
            }
            return rowData;
          }),
        }
      };
    },
    [SIDEBAR_TYPES.setInitialFilters](state, {payload}: ReturnType<typeof actions.setInitialFilters>) {
      return {
        ...state,
        initialFilters: {
          ...payload,
        },
      };
    },
    [SIDEBAR_TYPES.resetToInitialFilters](state, {}) {
      return {
        ...state,
        filters: {
          ...initialStateSidebar.filters,
          startDate: formateDate(getCurrentMomentDate()),
          endDate: formateDate(getCurrentMomentDate()),
          violationType: AnalyticsViolationTypes.ALL,
          season: Season.MIXED,
          usePeriod: false,
          ...filterDashboardFiltersByActive(state.initialFilters),
          search: initialStateSidebar.filters.search,
        },
      };
    },
    [SIDEBAR_TYPES.resetToInitialFiltersWithSaveViolationAndSeason](state, {}) {
      return {
        ...state,
        filters: {
          ...initialStateSidebar.filters,
          startDate: state.filters.startDate,
          endDate: state.filters.endDate,
          violationType: state.filters.violationType,
          season: state.filters.season,
          usePeriod: state.filters.usePeriod,
          ...filterDashboardFiltersByActive(state.initialFilters),
          search: initialStateSidebar.filters.search,
        },
      };
    },
  }
);

