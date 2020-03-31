import { initialStateDashboard } from 'app/store/modules/dashboard/initialState';
import createReducer from 'app/store/createReducer';
import DASHBOARD_TYPES from 'app/store/modules/dashboard/action_types';
import * as actions from 'app/store/modules/dashboard/actions';

// тут вроде всё понятно
export const dashboardReducer = createReducer<'dashboard'>(
  initialStateDashboard,
  {
    [DASHBOARD_TYPES.setDashboardData](state, { payload }: ReturnType<typeof actions.setDashboardData>) {
      return {
        ...state,
        data: payload,
      };
    },
    [DASHBOARD_TYPES.updateDashboardData](state, { payload }: ReturnType<typeof actions.setDashboardData>) {
      return {
        ...state,
        data: {
          ...state.data,
          ...payload
        },
      };
    },
    [DASHBOARD_TYPES.setDashboardStateMachine](state, { payload }: ReturnType<typeof actions.setDashboardStateMachine>) {
      return {
        ...state,
        stateMachine: payload
      };
    },
    [DASHBOARD_TYPES.updateDashboardStateMachine](state, { payload }: ReturnType<typeof actions.updateDashboardStateMachine>) {
      return {
        ...state,
        stateMachine: {
          ...state.stateMachine,
          ...payload,
        }
      };
    },
    [DASHBOARD_TYPES.setDashboardObjects](state, { payload }: ReturnType<typeof actions.setDashboardObjects>) {
      return {
        ...state,
        data: {
          ...state.data,
          objects: payload,
        },
      };
    },
    [DASHBOARD_TYPES.changeLastTouchFilter](state, {payload}: ReturnType<typeof actions.changeLastTouchFilter>) {
      return {
        ...state,
        lastTouchedFilter: payload
      };
    },
    [DASHBOARD_TYPES.setDashleatData](state, {payload}: ReturnType<typeof actions.setDashleatData>){
      return {
        ...state,
        dashleatData: payload
      };
    }
  }
);

