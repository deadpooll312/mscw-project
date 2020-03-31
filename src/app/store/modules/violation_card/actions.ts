import VIOLATION_CARD_TYPES from 'app/store/modules/violation_card/action_types';
import { selectPrimaryFiltersWithoutTheme } from 'app/store/modules/sidebar/selectors';
import createAction from 'app/store/promise_middleware/create_action';
import type { ViolationCardState } from 'app/store/modules/violation_card/types';
import type { GetViolationsParams } from 'app/api/types';

type GetViolationCardDataParams = {
  partialViolatioCardData: Pick<
    ViolationCardState['data'],
    'featureId'
    | 'objectTypeCode'
    | 'okrugName'
    | 'districtName'
  >;
  primaryFilters: ReturnType<typeof selectPrimaryFiltersWithoutTheme>;
  violationSourceSystem?: GetViolationsParams['violationSourceSystem'];
};

export const getViolationCardData = (
  partialViolatioCardData: GetViolationCardDataParams['partialViolatioCardData'],
  params: GetViolationCardDataParams['primaryFilters'],
  violationSourceSystem?: GetViolationCardDataParams['violationSourceSystem']) => {
  return createAction({
    type: VIOLATION_CARD_TYPES.getViolationCardData,
    payload: {
      partialViolatioCardData,
      params,
      violationSourceSystem,
    }
  });
};

export const setViolationCardIsLoadingStatus = (isLoading: boolean) => {
  return ({
    type: VIOLATION_CARD_TYPES.setViolationCardIsLoadingStatus,
    payload: {
      isLoading,
    },
  });
};

export const setViolationCardData = (violatioCardData: ViolationCardState['data']) => {
  return ({
    type: VIOLATION_CARD_TYPES.setViolationCardData,
    payload: {
      violatioCardData,
    },
  });
};

export const resetViolationCardData = () => {
  return setViolationCardData(null);
};

export const setViolationCardActiveDefectIndex = (activeDefectIndex: number) => {
  return ({
    type: VIOLATION_CARD_TYPES.setViolationCardActiveDefectIndex,
    payload: {
      activeDefectIndex,
    },
  });
};

export const resetViolationCardActiveDefectIndex = () => {
  return setViolationCardActiveDefectIndex(null);
};

