import TABLE_TYPES from './action_types';
import type { GetDashboardTableDataPayload } from 'app/store/modules/table/types';
import type { PageResultObjectForTable } from 'app/api/types';

export const getDashboardTableData = (payload: GetDashboardTableDataPayload) => {
  return ({
    type: TABLE_TYPES.getDashboardTableData,
    payload,
  });
};

export const setDashboardTableData = (payload: PageResultObjectForTable) => {
  return ({
    type: TABLE_TYPES.setDashboardTableData,
    payload,
  });
};

export const setDashboardTableDataLoading = (payload: boolean) => {
  return ({
    type: TABLE_TYPES.setDashboardTableDataLoading,
    payload,
  });
};
