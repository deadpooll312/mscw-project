import type { ReduxState } from 'app/store/modules/@types';
import { createSelector } from 'reselect';

export function selectModuleViolationCard(state: ReduxState) {
  return state.violationCard;
}

export const selectModuleViolationCardIsLoading = (state: ReduxState) => {
  return selectModuleViolationCard(state).isLoading;
};

export const selectModuleViolationCardData = (state: ReduxState) => {
  return selectModuleViolationCard(state).data;
};

export const selectModuleViolationCardHasData = (state: ReduxState) => {
  return !!selectModuleViolationCardData(state);
};

export const selectModuleViolationCardActiveDefectIndex = (state: ReduxState) => {
  return selectModuleViolationCard(state).activeDefectIndex;
};

export const selectModuleViolationCardDataDefects = createSelector(
  selectModuleViolationCardData,
  (violationCardData) => {

    return violationCardData.violations.map((ticket) => ({
      text: ticket.text,
      idSystemsName: ticket.idSystemName,
      hasfotovideo: ticket.hasPhotoVideo,
      violation_type: ticket.violationType,
      critical: ticket.critical,
      systematic: ticket.systematic,
      dataToRequest: {
        ID_object: violationCardData?.objectId,
        ticket: ticket.ticket,
        data_creation: ticket.fixationDate as any as string,
        date_closed: ticket.dateClose as any as string,
        ID: ticket.id,
        system: ticket.idSystem,
      }
    }));
  },
);
