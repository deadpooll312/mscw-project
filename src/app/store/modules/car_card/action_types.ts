import { factoryAction } from 'app/store/createReducer';

const CAR_CARD = factoryAction('CAR_CARD');

// type для экшена
const setCarMainCardData = CAR_CARD('setCarMainCardData');

const CAR_CARD_TYPES = {
  setCarMainCardData,
};

export default CAR_CARD_TYPES;
