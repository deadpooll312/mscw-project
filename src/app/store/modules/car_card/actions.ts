import CAR_CARD_TYPES from 'app/store/modules/car_card/action_types';
import type { CarCardState } from 'app/store/modules/car_card/types';

export const setCarMainCardData = (mainCarData: CarCardState['mainCarData']) => {
  return ({
    type: CAR_CARD_TYPES.setCarMainCardData,
    payload: {
      mainCarData,
    },
  });
};

export const resetCarCardData = () => {
  return setCarMainCardData(null);
};
