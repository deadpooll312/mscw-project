import type { ReduxState } from 'app/store/modules/@types';

export function selectModuleDashboardTable(state: ReduxState) {
  return state.dashboardTable;
}

export function selectModuleDashboardTableData(state: ReduxState) {
  return selectModuleDashboardTable(state)?.data;
}

export function selectModuleDashboardTableDataIsLoading(state: ReduxState) {
  return selectModuleDashboardTable(state)?.isLoading;
}
