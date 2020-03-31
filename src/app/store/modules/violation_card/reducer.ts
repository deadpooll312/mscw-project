import createReducer from 'app/store/createReducer';

import { initialStateViolationCard } from 'app/store/modules/violation_card/initialState';
import { setViolationCardData, setViolationCardActiveDefectIndex, setViolationCardIsLoadingStatus } from 'app/store/modules/violation_card/actions';
import VIOLATION_CARD_TYPES from 'app/store/modules/violation_card/action_types';

export const violationCardsReducer = createReducer<'violationCard'>(
  initialStateViolationCard,
  {
    [VIOLATION_CARD_TYPES.setViolationCardData](state, { payload }: ReturnType<typeof setViolationCardData>) {
      return {
        ...state,
        data: payload.violatioCardData,
      };
    },
    [VIOLATION_CARD_TYPES.setViolationCardIsLoadingStatus](state, { payload }: ReturnType<typeof setViolationCardIsLoadingStatus>) {
      return {
        ...state,
        isLoading: payload.isLoading,
      };
    },
    [VIOLATION_CARD_TYPES.setViolationCardActiveDefectIndex](state, { payload }: ReturnType<typeof setViolationCardActiveDefectIndex>) {
      return {
        ...state,
        activeDefectIndex: payload.activeDefectIndex,
      };
    },
  }
);

