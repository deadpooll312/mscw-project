import createReducer from 'app/store/createReducer';

import { setCarMainCardData } from 'app/store/modules/car_card/actions';
import CAR_CARD_TYPES from 'app/store/modules/car_card/action_types';
import { initialStateCarCard } from 'app/store/modules/car_card/initialState';

export const carCardsReducer = createReducer<'carCard'>(
  initialStateCarCard,
  {
    [CAR_CARD_TYPES.setCarMainCardData](state, { payload }: ReturnType<typeof setCarMainCardData>) {
      return {
        ...state,
        mainCarData: payload.mainCarData,
      };
    },
  }
);

