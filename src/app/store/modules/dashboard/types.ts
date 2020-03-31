import { WidgetFilter } from 'app/swagger/model/widgetFilter';
import { WidgetElement } from 'app/swagger/model/widgetElement';
import { DashletInfoDTO } from 'app/swagger/model/dashletInfoDTO';
import { AllSearchStringField, AllSearchButtonField } from 'app/types';

export enum States {
  INITIAL,
  FETCHING,
  SUCCESS,
  FAIL
}

export type AdvancedWidgetElement = WidgetElement & {
  violationObjectCount?: number;
  checkedObjectCount?: number;
  checkedObjectCountTrue?: number;
  objectCount?: number;
  violationToCheckedPercent?: string;
  checkedToObjectPercent?: string;
};

export type SearchFilter<FKeys = AllSearchStringField | AllSearchButtonField> = {
  field: FKeys;
  value: string | boolean;
  isButtonSearch: boolean;
  isStringSearch: boolean;
  isActive: boolean;
};

export type AdvancedWidgetFilter = Omit<WidgetFilter, 'regions' | 'districts' | 'search' > &
  { regions: AdvancedWidgetElement[] } &
  { districts: AdvancedWidgetElement[] } &
  { search: SearchFilter[] }
;

export type StateMachine <T> = {
  [Key in keyof T]: States;
};

export type DashboardState = {
  data: AdvancedWidgetFilter;
  dashleatData: DashletInfoDTO[];
  stateMachine: Partial<StateMachine<WidgetFilter &
    { dashleatData?: null;
      initialFilters?: null;
    }
    >> | null;

  lastTouchedFilter: keyof WidgetFilter | null;
};
