import { factoryAction } from 'app/store/createReducer';

const DASHBOARD = factoryAction('DASHBOARD');

// type для экшена
const getDashboardData = DASHBOARD('getDashboardData');
const setDashboardData = DASHBOARD('setDashboardData');
const updateDashboardData = DASHBOARD('updateDashboardData');
const getInitialFilters = DASHBOARD('getInitialFilters');

const setDashboardObjects = DASHBOARD('setDashboardObjects');

const setDashboardStateMachine = DASHBOARD('setDashboardStateMachine');
const updateDashboardStateMachine = DASHBOARD('updateDashboardStateMachine');
const changeLastTouchFilter = DASHBOARD('changeLastTouchFilter');

const getDashleatData = DASHBOARD('getDashleatData');

const setDashleatData = DASHBOARD('setDashleatData');

const DASHBOARD_TYPES = {
  getDashboardData,
  setDashboardData,
  updateDashboardData,
  getInitialFilters,
  setDashboardStateMachine,
  updateDashboardStateMachine,
  setDashboardObjects,
  changeLastTouchFilter,
  getDashleatData,
  setDashleatData
};

export default DASHBOARD_TYPES;
