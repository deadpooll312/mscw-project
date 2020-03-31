import { MomentInput } from 'moment';
import REPORT_TYPES from 'app/store/modules/report/action_types';
import { ReportStore } from 'app/store/modules/report/types';
import createAction from 'app/store/promise_middleware/create_action';
import { formateDate } from '@next/utils/dates';

export const changeDate = (date: MomentInput) => {
  return ({
    type: REPORT_TYPES.changeDate,
    payload: {
      date: formateDate(date),
    },
  });
};

export const getReports = (date: ReportStore['date']) => {
  return createAction({
    type: REPORT_TYPES.getReports,
    payload: {
      date,
    }
  });
};

export const setReports = (data: ReportStore['data'], isLoading?: boolean) => {
  return ({
    type: REPORT_TYPES.setReports,
    payload: {
      data,
      isLoading,
    }
  });
};
