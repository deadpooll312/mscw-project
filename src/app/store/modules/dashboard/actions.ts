import type { MomentInput } from 'moment';
import DASHBOARD_TYPES from 'app/store/modules/dashboard/action_types';
import type { WidgetFilter } from 'app/swagger/model/widgetFilter';
import type { StateMachine, AdvancedWidgetFilter } from 'app/store/modules/dashboard/types';
import type { GetDashboardDashletDataParams } from 'app/api/types';
import type { DashletInfoDTO } from 'app/swagger/model/dashletInfoDTO';

export const getDashboardInitialFilters = () => {
  return {
    type: DASHBOARD_TYPES.getInitialFilters,
    payload: null
  };
};

export const  getDashboardDataAction = (dateFormat?: MomentInput) => {
  return ({
    type: DASHBOARD_TYPES.getDashboardData,
    payload: {
      dateFormat,
    }
  });
};

export const setDashboardData = (data: AdvancedWidgetFilter) => {
  return ({
    type: DASHBOARD_TYPES.setDashboardData,
    payload: data,
  });
};

export const updateDashboardData = (data: Partial<AdvancedWidgetFilter>) => {
  return ({
    type: DASHBOARD_TYPES.updateDashboardData,
    payload: data,
  });
};

export const setDashboardStateMachine = <T>(stateMachine: StateMachine<T>) => {
  return ({
    type: DASHBOARD_TYPES.setDashboardStateMachine,
    payload: stateMachine
  });
};

export const updateDashboardStateMachine = <T>(stateMachine: StateMachine<T>) => {
  return ({
    type: DASHBOARD_TYPES.updateDashboardStateMachine,
    payload: stateMachine
  });
};

export const setDashboardObjects = (data: WidgetFilter['objects']) => {
  return ({
    type: DASHBOARD_TYPES.setDashboardObjects,
    payload: data
  });
};

export const changeLastTouchFilter = (payload: keyof WidgetFilter) => {
  return ({
    type: DASHBOARD_TYPES.changeLastTouchFilter,
    payload,
  });
};

export const getDashleatData = (params: GetDashboardDashletDataParams) => {
  return ({
    type: DASHBOARD_TYPES.getDashleatData,
    payload: params,
  });
};

export const setDashleatData = (data: DashletInfoDTO[] ) => {
  return ({
    type: DASHBOARD_TYPES.setDashleatData,
    payload: data,
  });
};

