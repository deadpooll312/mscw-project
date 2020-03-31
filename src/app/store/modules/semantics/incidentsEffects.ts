import { fork, select, call, put, takeLatest } from 'redux-saga/effects';

import createEffect from 'app/store/promise_middleware/create_effect';
import SEMANTICS_TYPES from 'app/store/modules/semantics/action_types';
import { selectCurrentMapLevel } from 'app/store/modules/semantics/selectors';
import { preparePrimaryFilters, prepareFilters } from 'app/store/modules/dashboard/utils';
import { getIncidents } from 'app/api/incidents';

import { MAP_LEVEL } from 'app/store/modules/semantics/constants';
import { changeCityIncidents, changeRegionIncidents, changeDistrictIncidents, getIncidentsAction } from './actions';
// import { getFormattedDateTimeStandart } from '@next/utils/dates';

const ACTION: Record<MAP_LEVEL, typeof changeCityIncidents> = {
  [MAP_LEVEL.CITY]: changeCityIncidents,
  [MAP_LEVEL.REGION]: changeRegionIncidents,
  [MAP_LEVEL.DISTRICT]: changeDistrictIncidents,
};

function* onGetIncidentsEffect({ payload }: ReturnType<typeof getIncidentsAction>){
  const primaryFilters = payload.primaryFiltersOwn;
  const secondaryFilters = payload.secondaryFiltersOwn;

  const currentLevel: ReturnType<typeof selectCurrentMapLevel> = yield select(selectCurrentMapLevel);

  const getParams = preparePrimaryFilters(primaryFilters);
  const bodyParams = prepareFilters(secondaryFilters);
  
  const response: ThenArg<ReturnType<typeof getIncidents>> = yield call(getIncidents, bodyParams, getParams);

  const data = response?.data.objectViolations;

  yield put(ACTION[currentLevel](data));
}

function* onGetIncidentsWatcher() {
  yield fork(
    createEffect(
      SEMANTICS_TYPES.getIncidents,
      takeLatest,
      onGetIncidentsEffect
    ),
  );
}

// список на прослушивание
const IncidentsEffects = [
  fork(onGetIncidentsWatcher),
];

export default IncidentsEffects;
