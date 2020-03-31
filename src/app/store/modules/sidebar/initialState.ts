import type { SidebarState } from 'app/store/modules/sidebar/types';
import { Season, AnalyticsViolationTypes } from 'app/store/modules/@types';
import { getCurrentMomentDate, formateDate } from '@next/utils/dates';
import { AllSearchStringField, AllSearchButtonField } from 'app/types';

const stringSearchArr = Object.values(AllSearchStringField).map((keySerach) => ({
  field: keySerach,
  value: null,
  isStringSearch: true,
  isButtonSearch: false,
  isActive: keySerach === AllSearchStringField.TICKET,
}));
export const ButtonTrashContainer = {
  field: AllSearchButtonField.TRASH_CONTAINERS,
  value: null,
  isStringSearch: false,
  isButtonSearch: true,
  isActive: false,
};
export const buttonSearchArr = [
  ButtonTrashContainer,
];

export const initialStateSidebar: SidebarState = {
  filters: {
    startDate: formateDate(getCurrentMomentDate()),
    endDate: formateDate(getCurrentMomentDate()),
    usePeriod: false,
    violationType: AnalyticsViolationTypes.ALL,
    season: Season.MIXED,

    objects: [],
    events: [],
    sources: [],
    defects: [],
    regions: [],
    sourceGroups: [],
    districts: [],
    search: [
      ...stringSearchArr,
      ...buttonSearchArr,
    ],
  },

  initialFilters: {},
};
