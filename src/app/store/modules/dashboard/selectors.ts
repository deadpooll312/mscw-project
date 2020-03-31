import { ReduxState } from 'app/store/modules/@types';
import { States } from 'app/store/modules/dashboard/types';

export function selectModuleDashboard(state: ReduxState) {
  return state.dashboard;
}

export function selectDashboardData(state: ReduxState) {
  return selectModuleDashboard(state).data;
}

export function selectDashboardDefectWidget(state: ReduxState) {
  return selectDashboardData(state)?.defects;
}

export function selectDashboardEventWidget(state: ReduxState) {
  return selectDashboardData(state)?.events;
}

export function selectDashboardSourceWidget(state: ReduxState) {
  return selectDashboardData(state)?.sources;
}

export function selectDashboardRegionWidget(state: ReduxState) {
  return selectDashboardData(state)?.regions;
}

export function selectDashboardSourceGroupWidget(state: ReduxState) {
  return selectDashboardData(state)?.sourceGroups;
}

export function selectDashboardObjectWidget(state: ReduxState) {
  return selectDashboardData(state)?.objects;
}

export function selectDistrictsWidget(state: ReduxState) {
  return selectDashboardData(state)?.districts;
}

export function selectDashboardStateMachine(state: ReduxState) {
  return selectModuleDashboard(state).stateMachine;
}

export function selectObjectsWidgetState(state: ReduxState) {
  return selectDashboardStateMachine(state)?.objects;
}

export function selectEventsWidgetState(state: ReduxState) {
  return selectDashboardStateMachine(state)?.events;
}

export function selectSourcesWidgetState(state: ReduxState) {
  return selectDashboardStateMachine(state)?.sources;
}

export function selectDashleatWidgetState(state: ReduxState) {
  return selectDashboardStateMachine(state)?.dashleatData;
}

export function selectInitialFiltersState(state: ReduxState) {
  return selectDashboardStateMachine(state)?.initialFilters;
}

export function selectSourcesWidgetStateIsLoading(state: ReduxState) {
  return selectSourcesWidgetState(state) === States.FETCHING;
}

export function selectEventsWidgetStateIsLoading(state: ReduxState) {
  return selectEventsWidgetState(state) === States.FETCHING;
}

export function selectDashleatWidgetStateIsLoading(state: ReduxState) {
  return selectDashleatWidgetState(state) === States.FETCHING;
}

export function selectInitialFiltersStateIsLoading(state: ReduxState) {
  return selectInitialFiltersState(state) === States.FETCHING;
}

export function selectDefectsWidgetState(state: ReduxState) {
  return selectDashboardStateMachine(state)?.defects;
}

export const selectLastTouchFilter = (state: ReduxState) => {
  return selectModuleDashboard(state).lastTouchedFilter;
};

export const selectDashleatData = (state: ReduxState) => {
  return selectModuleDashboard(state).dashleatData;
};
