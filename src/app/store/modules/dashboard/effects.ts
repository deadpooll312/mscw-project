import { select, call, put, fork, takeLatest, putResolve } from 'redux-saga/effects';
import { getDashboardData, getInitialFilters, getDashboardDashletData } from 'app/api/dashboard';
import { selectPrimaryFilters, selectSecondaryFiltersWithSearch, selectModuleSidebarViolationTypeIsSys } from 'app/store/modules/sidebar/selectors';
import { setDashboardData, setDashboardStateMachine, changeLastTouchFilter, getDashboardDataAction, getDashleatData, setDashleatData, updateDashboardStateMachine } from 'app/store/modules/dashboard/actions';
import createEffect from 'app/store/promise_middleware/create_effect';
import DASHBOARD_TYPES from 'app/store/modules/dashboard/action_types';
import { preparePrimaryFilters, prepareFilters } from 'app/store/modules/dashboard/utils';
import { WidgetFilter } from 'app/swagger/model/widgetFilter';
import { setInitialFilters } from 'app/store/modules/sidebar/actions';
import { StateMachine, States } from 'app/store/modules/dashboard/types';
import { selectDashboardData, selectLastTouchFilter, selectDashboardObjectWidget, selectDashboardStateMachine } from 'app/store/modules/dashboard/selectors';
import { sortNumber } from '@next/utils/common';

const excludeAlias = new Set(...[
  'objects',
]);

function* onGetDashboardDataEffect({ payload }: ReturnType<typeof getDashboardDataAction>) {
  const primaryFilters: ReturnType<typeof selectPrimaryFilters> = yield select(selectPrimaryFilters);
  const secondaryFilters: ReturnType<typeof selectSecondaryFiltersWithSearch> = yield select(selectSecondaryFiltersWithSearch);
  const lastTouchedFilter: ReturnType<typeof selectLastTouchFilter> = yield select(selectLastTouchFilter);
  const violationTypeIsSys: ReturnType<typeof selectModuleSidebarViolationTypeIsSys> = yield select(selectModuleSidebarViolationTypeIsSys);

  const getParams = preparePrimaryFilters(primaryFilters, payload.dateFormat);
  const bodyParams = prepareFilters(secondaryFilters);

  const stateMachineOne: Partial<StateMachine<WidgetFilter>>= yield select(selectDashboardStateMachine);
  const stateMachineWithFetching = { ...stateMachineOne };

  Object.keys(secondaryFilters).map((key: keyof WidgetFilter)  => {
    if (lastTouchedFilter && lastTouchedFilter === key || violationTypeIsSys) {
      stateMachineWithFetching[key] = States.SUCCESS;
    } else {
      stateMachineWithFetching[key] = States.FETCHING;
    }
  });

  yield putResolve(setDashboardStateMachine(stateMachineWithFetching));

  const response: ThenArg<ReturnType<typeof getDashboardData>> = yield call(getDashboardData, bodyParams, getParams);
  const objectsData: ReturnType<typeof selectDashboardObjectWidget> = yield select(selectDashboardObjectWidget);
  const data = response?.data;

  const stateMachineTwo: Partial<StateMachine<WidgetFilter>>= yield select(selectDashboardStateMachine);
  const stateMachineWithSuccess = { ...stateMachineTwo };

  Object.keys(secondaryFilters).map(key => {
    if (key !== 'dashleatData') {
      stateMachineWithSuccess[key] = States.SUCCESS;
    }
  });

  const currentDashboardData: ReturnType<typeof selectDashboardData> = yield select(selectDashboardData);
  if (lastTouchedFilter && !excludeAlias.has(lastTouchedFilter)) {
    data[lastTouchedFilter] = currentDashboardData[lastTouchedFilter];
  }

  if (violationTypeIsSys) {
    data.sources = currentDashboardData.sources;
  }

  yield put(setDashboardData({
    ...data,
    objects: objectsData,
  }));

  yield put(setDashboardStateMachine(stateMachineWithSuccess));
  yield put(changeLastTouchFilter(null));

}

function* onGetInitialFiltersEffect({}: ReturnType<typeof getInitialFilters>) {
  const stateMachine: Partial<StateMachine<{ initialFilters: States}>>= {initialFilters: States.FETCHING };

  yield putResolve(updateDashboardStateMachine(stateMachine));

  const response: ThenArg<ReturnType<typeof getInitialFilters>> = yield call(getInitialFilters);
  const data = response?.data;

  const resultObj = prepareFilters(data);
  yield put(setInitialFilters(resultObj));
  yield putResolve(updateDashboardStateMachine({initialFilters: States.SUCCESS }));

  // const secondaryFiltersOwn = yield select(selectSecondaryFiltersWithSearch);
  // const secondaryFilters = filterDashboardFiltersByActive(resultObj);

  // if (!isEqual(secondaryFiltersOwn, secondaryFilters)) {
  //   yield put(changeSecondaryFilters(secondaryFilters));
  // }
  // const currentDashboardData: ReturnType<typeof selectDashboardData> = yield select(selectDashboardData);

  // yield put(setDashboardData({
  //   ...currentDashboardData,
  //   sources: resultObj.sources,
  // }));

}

function* onGetDashleatDataEffect({payload}: ReturnType<typeof getDashleatData>){
  const stateMachine: Partial<StateMachine<{dashleatData?: States}>> = {dashleatData: States.FETCHING};

  yield putResolve(updateDashboardStateMachine(stateMachine));

  const response: ThenArg<ReturnType<typeof getDashboardDashletData>> = yield call(getDashboardDashletData, payload);
  const data = response.data.info.sort((a, b) => sortNumber(b.value, a.value));

  yield putResolve(setDashleatData(data));
  yield putResolve(updateDashboardStateMachine({dashleatData: States.SUCCESS}));
}

function* onGetDashboardDataWatcher() {
  yield fork(
    createEffect(
      DASHBOARD_TYPES.getDashboardData,
      takeLatest,
      onGetDashboardDataEffect
    ),
  );
}

function* onGetDashboardInitialFiltersWatcher() {
  yield fork(
    createEffect(
      DASHBOARD_TYPES.getInitialFilters,
      takeLatest,
      onGetInitialFiltersEffect
    ),
  );
}

function* onGetDashleatDataWatcher() {
  yield fork(
    createEffect(
      DASHBOARD_TYPES.getDashleatData,
      takeLatest,
      onGetDashleatDataEffect,
    ),
  );
}

// список на прослушивание
const DashboardEffects = [
  fork(onGetDashboardDataWatcher),
  fork(onGetDashboardInitialFiltersWatcher),
  fork(onGetDashleatDataWatcher),
];

export default DashboardEffects;
