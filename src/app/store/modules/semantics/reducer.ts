import { initialSemanticsState } from 'app/store/modules/semantics/initialState';
import createReducer from 'app/store/createReducer';
import SEMANTICS_TYPES from 'app/store/modules/semantics/action_types';
import { update, updateKey, setKey, refresh, changeCityIncidents, changeRegionIncidents, changeDistrictIncidents } from 'app/store/modules/semantics/actions';

const isObject = (testObj) => typeof testObj === 'object' && testObj !== null;

// тут вроде всё понятно
export const semanticsReducer = createReducer<'semantics'>(
  initialSemanticsState,
  {
    [SEMANTICS_TYPES.update](state, { payload }: ReturnType<typeof update>) {
      return {
        ...state,
        ...payload.data,
      };
    },
    [SEMANTICS_TYPES.updateKey](state, { payload }: ReturnType<typeof updateKey>) {
      const stateObj = state[payload.key];

      return {
        ...state,
        [payload.key]: isObject(stateObj) && isObject(payload.data) ? {
          ...(stateObj as Record<string, any>),
          ...(payload.data as Record<string, any>),
        } : payload.data,
      };
    },
    [SEMANTICS_TYPES.setKey](state, { payload }: ReturnType<typeof setKey>) {
      return {
        ...state,
        [payload.key]: payload.data,
      };
    },
    [SEMANTICS_TYPES.refresh](state, { payload }: ReturnType<typeof refresh>) {
      return {
        ...initialSemanticsState,
      };
    },

    //////

    [SEMANTICS_TYPES.changeCityIncidents](state, { payload }: ReturnType<typeof changeCityIncidents>) {
      return {
        ...state,
        incidents: {
          ...state.incidents,
          city: payload,
        }
      };
    },

    [SEMANTICS_TYPES.changeRegionIncidents](state, { payload }: ReturnType<typeof changeRegionIncidents>) {
      return {
        ...state,
        incidents: {
          ...state.incidents,
          region: payload,
        }
      };
    },

    [SEMANTICS_TYPES.changeDistrictIncidents](state, { payload }: ReturnType<typeof changeDistrictIncidents>) {
      return {
        ...state,
        incidents: {
          ...state.incidents,
          district: payload,
        }
      };
    }
    
  }
);

