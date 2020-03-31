
import { put, takeLatest, fork, select, call } from 'redux-saga/effects';

import ANALITYCS_TYPES from 'app/store/modules/analytics/action_types';
import { getDateParams } from 'app/store/modules/analytics/utils';
import createEffect from 'app/store/promise_middleware/create_effect';
import { getCurrentMomentDate, getFormattedDateTimeStandart } from '@next/utils/dates';
import { wrapChangeCurrentTypes, changeCurrentTypes, wrapChangeCurrentSystems, changeCurrentSystems, loadAnalyticsData, loadWidgetCircle, loadWidgetLines, loadWidgetCharts, setOneAnalyticsData } from 'app/store/modules/analytics/actions';
import { selectDate, selecteCurrentTypes, selecteCurrentSystems, selectCurrentSeason, selectCurrentViolationType } from 'app/store/modules/analytics/selectors';
import { getOneAnalyticsData } from 'app/api/reports';

// Эффекты

// проверка на размер нового currentType
function* wrapChangeCurrentTypesEffect({ payload }: ReturnType<typeof wrapChangeCurrentTypes>) {
  const newCurrentType = payload.newCurrentType;

  if (newCurrentType?.size) {
    yield put(changeCurrentTypes(newCurrentType, getCurrentMomentDate()));
  } 
}

function* wrapChangeCurrentSystemsEffect({ payload }: ReturnType<typeof wrapChangeCurrentSystems>) {
  const newCurrentSystem = payload.newCurrentSystem;

  if (newCurrentSystem?.size) {
    yield put(changeCurrentSystems(newCurrentSystem, getCurrentMomentDate()));
  } 
}

// еффект после измнений даты и currentType
// если есть данные то вызывает экшен запроса за данными для всех виджетов
function* updateAnalyticsDataEffect() {
  const date: ReturnType<typeof selectDate> = yield select(selectDate);
  const currentTypes: ReturnType<typeof selecteCurrentTypes> = yield select(selecteCurrentTypes);
  const currentSystems: ReturnType<typeof selecteCurrentSystems> = yield select(selecteCurrentSystems);
  const season: ReturnType<typeof selectCurrentSeason> = yield select(selectCurrentSeason);
  const violationType: ReturnType<typeof selectCurrentViolationType> = yield select(selectCurrentViolationType);
  
  if (date && currentTypes && currentTypes.size) {
    yield put(loadAnalyticsData({date, currentTypes, currentSystems, season, violationType}));
  }
}

// еффект после "диспатча" экшена запроса за данными для всех виджетов 
// вызывает 3 экшена по виджетам
function* loadAnalyticsDataEffect({ payload }: ReturnType<typeof loadAnalyticsData>) {
  const {
    date,
    currentTypes,
    currentSystems,
    season,
    violationType
  } = payload;

  if (date && currentTypes && currentTypes.size) {
    yield put(loadWidgetCircle({date, currentTypes, currentSystems, season, violationType}));
    yield put(loadWidgetLines({date, currentTypes, currentSystems, season, violationType}));
    yield put(loadWidgetCharts({date, currentTypes, currentSystems, season, violationType}));
  }
}

// эффект по загрузке данных для 1 виджета и записи в этих данных в стор
function* onLoadAnalyticsDataOneTypeEffect({ payload }: ReturnType<typeof loadWidgetCircle | typeof loadWidgetLines | typeof loadWidgetCharts>) {
  const {
    type,
    date,
    currentTypes,
    currentSystems,
    season,
    violationType
  } = payload;

  if (date && currentTypes && currentTypes.size) {
    yield put(setOneAnalyticsData(type, { data: null, isLoading: true }));

    const dateParams = getDateParams(date);
    const response: ThenArg<ReturnType<typeof getOneAnalyticsData>> = yield call(
      getOneAnalyticsData,
      {
        type,
        currentTypes: [...currentTypes],
        currentSystems: [...currentSystems],
        startDate: getFormattedDateTimeStandart(dateParams.date),
        endDate: getFormattedDateTimeStandart(dateParams.endDate),
        startDateArea: getFormattedDateTimeStandart(dateParams.startDateArea),
        endDateArea: getFormattedDateTimeStandart(dateParams.endDateArea),
        season,
        violationType
      }
    );
    yield put(setOneAnalyticsData(type, { data: response?.data as any, isLoading: false }));
  }
}

// подписка на экшен ANALITYCS_TYPES.wrapChangeCurrentTypes
// нужен для проверки на размер нового сurrentTypes
const onChangeCurrentTypesWatcher = createEffect(
  ANALITYCS_TYPES.wrapChangeCurrentTypes,
  takeLatest,
  wrapChangeCurrentTypesEffect,
);

const onChangeCurrentSystemsWatcher = createEffect(
  ANALITYCS_TYPES.wrapChangeCurrentSystems,
  takeLatest,
  wrapChangeCurrentSystemsEffect,
);

// подписка на экшены ANALITYCS_TYPES.changeDate и ANALITYCS_TYPES.changeCurrentTypes
// по сути тут триггер на запрос данных по виджетам при смене даты и currentTypes
function* onChangeDateWatcher() {
  yield fork(
    createEffect(
      ANALITYCS_TYPES.changeDate,
      takeLatest,
      updateAnalyticsDataEffect
    ),
  );
  yield fork(
    createEffect(
      ANALITYCS_TYPES.changeCurrentTypes,
      takeLatest,
      updateAnalyticsDataEffect
    ),
  );
  yield fork(
    createEffect(
      ANALITYCS_TYPES.changeCurrentSystems,
      takeLatest,
      updateAnalyticsDataEffect
    ),
  );
  yield fork(
    createEffect(
      ANALITYCS_TYPES.changeSeason,
      takeLatest,
      updateAnalyticsDataEffect
    ),
  );
  yield fork(
    createEffect(
      ANALITYCS_TYPES.changeViolationType,
      takeLatest,
      updateAnalyticsDataEffect
    ),
  );
}

// подписка на экшены ANALITYCS_TYPES.loadAnalyticsData и ANALITYCS_TYPES.changeCurrentTypes
// по сути вызов запроса за данными для всех виджетов
const onLoadAnalyticsDataWatcher = createEffect(
  ANALITYCS_TYPES.loadAnalyticsData,
  takeLatest,
  loadAnalyticsDataEffect
);

// подписка на экшены загрузки данных по 1 виджету
function* onLoadAnalyticsDataOneTypeWatcher() {
  yield fork(
    createEffect(
      ANALITYCS_TYPES.loadWidgetCircle,
      takeLatest,
      onLoadAnalyticsDataOneTypeEffect
    ),
  );
  yield fork(
    createEffect(
      ANALITYCS_TYPES.loadWidgetLines,
      takeLatest,
      onLoadAnalyticsDataOneTypeEffect
    ),
  );
  yield fork(
    createEffect(
      ANALITYCS_TYPES.loadWidgetCharts,
      takeLatest,
      onLoadAnalyticsDataOneTypeEffect
    ),
  );
}

// список на прослушивание
const AnalyticsEffects = [
  fork(onChangeCurrentTypesWatcher),
  fork(onChangeCurrentSystemsWatcher),
  fork(onChangeDateWatcher),
  fork(onLoadAnalyticsDataWatcher),
  fork(onLoadAnalyticsDataOneTypeWatcher),
];

export default AnalyticsEffects;
