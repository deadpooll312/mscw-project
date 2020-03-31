import { isBoolean } from 'util';

import { initialStateReport } from 'app/store/modules/report/initialState';
import createReducer from 'app/store/createReducer';
import REPORT_TYPES from 'app/store/modules/report/action_types';
import { setReports, changeDate } from 'app/store/modules/report/actions';

// тут вроде всё понятно
export const reportReducer = createReducer<'report'>(
  initialStateReport,
  {
    [REPORT_TYPES.setReports](state, { payload }: ReturnType<typeof setReports>) {
      return {
        ...state,
        data: payload.data,
        isLoading: isBoolean(payload.isLoading) ? payload.isLoading : state.isLoading,
      };
    },
    [REPORT_TYPES.changeDate](state, { payload }: ReturnType<typeof changeDate>) {
      return {
        ...state,
        date: payload.date,
      };
    },
  }
);

