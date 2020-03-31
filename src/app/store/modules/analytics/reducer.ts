import ANALITYCS_TYPES from 'app/store/modules/analytics/action_types';
import { initialStateAnalytics } from 'app/store/modules/analytics/initialState';
import createReducer from 'app/store/createReducer';
import {
  changeCurrentTypes,
  changeCurrentSystems,
  changeDate,
  setOneAnalyticsData,
  changeSeason,
  changeViolationType,
  resetSelectedFilters,
} from 'app/store/modules/analytics/actions';

export const analyticsReducer = createReducer<'analytics'>(
  initialStateAnalytics,
  {
    [ANALITYCS_TYPES.changeCurrentTypes](state, { payload }: ReturnType<typeof changeCurrentTypes>) {
      return {
        ...state,
        selectedFilters: {
          ...state.selectedFilters,
          currentTypes: payload.newCurrentType,
        },
        date: payload.newDate,
      };
    },
    [ANALITYCS_TYPES.changeCurrentSystems](state, { payload }: ReturnType<typeof changeCurrentSystems>) {
      return {
        ...state,
        selectedFilters: {
          ...state.selectedFilters,
          currentSystems: payload.newCurrentSystem,
        },
        date: payload.newDate,
      };
    },
    [ANALITYCS_TYPES.changeDate](state, { payload }: ReturnType<typeof changeDate>) {
      return {
        ...state,
        date: payload.date,
      };
    },
    [ANALITYCS_TYPES.setOneAnalyticsData](state, { payload }: ReturnType<typeof setOneAnalyticsData>) {
      return {
        ...state,
        [payload.type]: payload.data,
      };
    },
    [ANALITYCS_TYPES.changeSeason](state, { payload }: ReturnType<typeof changeSeason>) {
      return {
        ...state,
        selectedFilters: {
          ...state.selectedFilters,
          currentSeason: payload.season,
        },

      };
    },
    [ANALITYCS_TYPES.changeViolationType](state, { payload }: ReturnType<typeof changeViolationType>) {
      return {
        ...state,
        selectedFilters: {
          ...state.selectedFilters,
          currentViolationType: payload.violationType,
        },
      };
    },
    [ANALITYCS_TYPES.resetSelectedFilters](state, { payload }: ReturnType<typeof resetSelectedFilters>) {
      return {
        ...state,
        selectedFilters: {
          ...initialStateAnalytics.selectedFilters,
        }
      };
    }
  }
);

