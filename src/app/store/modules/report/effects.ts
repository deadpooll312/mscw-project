
import { put, takeLatest, fork, call, select } from 'redux-saga/effects';
import keyBy from 'lodash-es/keyBy';

import REPORT_TYPES from 'app/store/modules/report/action_types';
import { ReportStore } from 'app/store/modules/report/types';
import createEffect from 'app/store/promise_middleware/create_effect';
import { getFormattedDashDate } from '@next/utils/dates';
import { getReports, setReports } from 'app/store/modules/report/actions';
import { selectDate } from 'app/store/modules/report/selectors';
import { getEveryDayReportInfo } from 'app/api/reports';

// эффект по загрузке данных для 1 виджета и записи в этих данных в стор
function* onGetReportsEffect({ payload }: ReturnType<typeof getReports>) {
  const dateStore: ReturnType<typeof selectDate> = yield select(selectDate);
  const date = payload.date || dateStore;

  if (date) {
    yield put(setReports(null, true));

    const response: ThenArg<ReturnType<typeof getEveryDayReportInfo>> = yield call(getEveryDayReportInfo, getFormattedDashDate(date));
    const data = response?.data;

    if (data) {
      const pages = data?.semantic?.pages;
      data.semantic.pagesIndex = keyBy(
        pages,
        (item) => item.pageNumber
      ) as ReportStore['data']['semantic']['pagesIndex'];
    }

    yield put(setReports(data, false));
  }
}

function* onGetReportsWatcher() {
  yield fork(
    createEffect(
      REPORT_TYPES.getReports,
      takeLatest,
      onGetReportsEffect
    ),
  );
  yield fork(
    createEffect(
      REPORT_TYPES.changeDate,
      takeLatest,
      onGetReportsEffect
    ),
  );
}

// список на прослушивание
const ReportEffects = [
  fork(onGetReportsWatcher),
];

export default ReportEffects;
