import type { ReduxState } from 'app/store/modules/@types';

export const selectModuleCarCard = (state: ReduxState) => {
  return state.carCard;
};

export const selectModuleCarCardMainCarData = (state: ReduxState) => {
  return selectModuleCarCard(state).mainCarData;
};

export const selectModuleCarCardHasMainCarData = (state: ReduxState) => {
  return Boolean(selectModuleCarCardMainCarData(state));
};
