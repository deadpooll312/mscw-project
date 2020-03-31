import type { ViolationCardState } from 'app/store/modules/violation_card/types';

export const initialStateViolationCard: ViolationCardState = {
  isLoading: false,
  data: null,
  activeDefectIndex: null,
};
