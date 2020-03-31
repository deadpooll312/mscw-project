import { factoryAction } from 'app/store/createReducer';

const VIOLATION_CARD = factoryAction('VIOLATION_CARD');

// type для экшена
const getViolationCardData = VIOLATION_CARD('getViolationCardData');
const setViolationCardIsLoadingStatus = VIOLATION_CARD('setViolationCardIsLoadingStatus');
const setViolationCardData = VIOLATION_CARD('setViolationCardData');
const setViolationCardActiveDefectIndex = VIOLATION_CARD('setViolationCardActiveDefectIndex');

const VIOLATION_CARD_TYPES = {
  setViolationCardIsLoadingStatus,
  getViolationCardData,
  setViolationCardData,
  setViolationCardActiveDefectIndex,
};

export default VIOLATION_CARD_TYPES;
