import createReducer from 'app/store/createReducer';
import { initialStateDashboardTable } from 'app/store/modules/table/initialState';
import TABLE_TYPES from 'app/store/modules/table/action_types';
import * as actions from 'app/store/modules/table/actions';

export const dashboardTableReducer = createReducer<'dashboardTable'>(
  initialStateDashboardTable,
  {
    [TABLE_TYPES.setDashboardTableData](state, { payload }: ReturnType<typeof actions.setDashboardTableData>) {
      return {
        ...state,
        data: payload
      };
    },
    [TABLE_TYPES.setDashboardTableDataLoading](state, { payload }: ReturnType<typeof actions.setDashboardTableDataLoading>) {
      return {
        ...state,
        isLoading: payload
      };
    },
  }
);
