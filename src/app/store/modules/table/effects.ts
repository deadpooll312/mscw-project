
// Эффекты
import { select, call, put, putResolve, fork, takeLatest } from 'redux-saga/effects';
import createEffect from 'app/store/promise_middleware/create_effect';
import { getDashboardTableData as getDashboardTableDataAction, setDashboardTableData, setDashboardTableDataLoading } from 'app/store/modules/table/actions';
import { selectPrimaryFiltersWithoutTheme, selectSecondaryFiltersWithSearch } from 'app/store/modules/sidebar/selectors';
import { prepareFilters, preparePrimaryFilters } from 'app/store/modules/dashboard/utils';
import { getDashboardTableData } from 'app/api/dashboard';
import DASHBOARD_TABLE_TYPES from 'app/store/modules/table/action_types';

function* onGetDashboardTableDataEffect({ payload }: ReturnType<typeof getDashboardTableDataAction>) {
  yield putResolve(setDashboardTableDataLoading(true));

  const { paginationData, sortData } = payload;
  const primaryFiltersWithoutTheme: ReturnType<typeof selectPrimaryFiltersWithoutTheme> = yield select(selectPrimaryFiltersWithoutTheme);
  const secondaryFilters: ReturnType<typeof selectSecondaryFiltersWithSearch> = yield select(selectSecondaryFiltersWithSearch);

  const getParams = {
    ...preparePrimaryFilters(primaryFiltersWithoutTheme),
    page: paginationData.page,
    size: paginationData.size,
    sortBy: sortData.field,
    sortingOrder: !sortData.isReverse ? 'ASC' : 'DESC',
  };

  if (!getParams.sortBy) {
    delete getParams.sortBy;
    delete getParams.sortingOrder;
  }

  const bodyParams = prepareFilters(secondaryFilters);

  const response: ThenArg<ReturnType<typeof getDashboardTableData>> = yield call(getDashboardTableData, bodyParams, getParams);

  yield put(setDashboardTableData(response?.data));
  yield put(setDashboardTableDataLoading(false));
}

function* onGetDashboardTableDataWatcher() {
  yield fork(
    createEffect(
      DASHBOARD_TABLE_TYPES.getDashboardTableData,
      takeLatest,
      onGetDashboardTableDataEffect
    ),
  );
}

// список на прослушивание
const TableEffects = [
  fork(onGetDashboardTableDataWatcher),
];

export default TableEffects;
