import { select, call, put, fork, takeLatest } from 'redux-saga/effects';

import createEffect from 'app/store/promise_middleware/create_effect';
import VIOLATION_CARD_TYPES from 'app/store/modules/violation_card/action_types';
import { getViolationCardData, setViolationCardData, setViolationCardIsLoadingStatus } from 'app/store/modules/violation_card/actions';
import { preparePrimaryFilters, prepareFilters } from 'app/store/modules/dashboard/utils';
import { getIncidentFeature } from 'app/api/incidents';
import { selectPrimaryFilters, selectSecondaryFiltersWithSearch } from 'app/store/modules/sidebar/selectors';
import type { FeatureIncidentPrimaryFilter } from 'app/types';

function* onGetViolationCardDataEffect({ payload }: ReturnType<typeof getViolationCardData>) {
  const primaryFilters: ReturnType<typeof selectPrimaryFilters> = yield select(selectPrimaryFilters);
  const secondaryFilters: ReturnType<typeof selectSecondaryFiltersWithSearch> = yield select(selectSecondaryFiltersWithSearch);
  const params: FeatureIncidentPrimaryFilter = {
    ...preparePrimaryFilters(primaryFilters),
  };

  params.alias = payload.partialViolatioCardData.objectTypeCode;
  params.featureId = payload.partialViolatioCardData.featureId;

  yield put(
    setViolationCardIsLoadingStatus(true),
  );

  const response: ThenArg<ReturnType<typeof getIncidentFeature>> = yield call(
    getIncidentFeature,
    prepareFilters(secondaryFilters),
    params,
  );

  const newViolationData = response.data;

  let isGood = false;

  if (newViolationData) {
    yield put(
      setViolationCardData({
        ...payload.partialViolatioCardData,
        ...newViolationData,
      }),
    );

    isGood = true;
  }

  yield put(
    setViolationCardIsLoadingStatus(false),
  );
  return isGood;
}

function* onGetViolationCardDataWatcher() {
  yield fork(
    createEffect(
      VIOLATION_CARD_TYPES.getViolationCardData,
      takeLatest,
      onGetViolationCardDataEffect,
    ),
  );
}

const ViolationCardEffects = [
  fork(onGetViolationCardDataWatcher),
];

export default ViolationCardEffects;
