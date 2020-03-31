import { MomentInput } from 'moment';

import { selectPrimaryFilters } from 'app/store/modules/sidebar/selectors';
import { Season, AnalyticsViolationTypes } from 'app/store/modules/@types';
import { WidgetFilter } from 'app/swagger/model/widgetFilter';
import { getFormattedDateTimeStandart } from '@next/utils/dates';
import { SearchFilter } from 'app/store/modules/dashboard/types';
import omit from 'lodash-es/omit';
import { isNullOrUndefined } from 'util';
import { AllSearchButtonField } from 'app/types';

export const preparePrimaryFilters = (primaryFilters: Partial<ReturnType<typeof selectPrimaryFilters>>, dateFormat?: MomentInput): Partial<ReturnType<typeof selectPrimaryFilters>> => {
  return {
    ...primaryFilters,
    violationType: primaryFilters.violationType === AnalyticsViolationTypes.ALL ? null : primaryFilters.violationType,
    season: primaryFilters.season === Season.MIXED ? null : primaryFilters.season,
    startDate: getFormattedDateTimeStandart(primaryFilters.startDate),
    endDate: getFormattedDateTimeStandart(primaryFilters.endDate)
  };
};

export const preparePrimaryFiltersForSocket = (primaryFilters: Partial<ReturnType<typeof selectPrimaryFilters>>, dateFormat?: MomentInput) => {
  const primaryFiltersForSocket = {
    ...primaryFilters,
    violationTypes: primaryFilters.violationType === AnalyticsViolationTypes.ALL ? [ AnalyticsViolationTypes.CMN, AnalyticsViolationTypes.CRT ] : [ primaryFilters.violationType ],
    season: primaryFilters.season === Season.MIXED ? [ Season.WINTER, Season.ALL ] : [ primaryFilters.season ],
    startDate: getFormattedDateTimeStandart(primaryFilters.startDate),
    endDate: getFormattedDateTimeStandart(primaryFilters.endDate)
  };
  return omit(primaryFiltersForSocket, 'violationType');
};

export const prepareFilters = (object: WidgetFilter & {search?: SearchFilter[]}): Partial<WidgetFilter & {search?: SearchFilter[]}> => {
  let result: Partial<WidgetFilter & {search?: SearchFilter[]}> = {};

  result = filterObjectByNullAndUndefined(object);

  result.search = result.search
    .filter(({ value, field }) => {
      if (field === AllSearchButtonField.TRASH_CONTAINERS) {
        return value;
      }

      return !isNullOrUndefined(value);
    })
    .map(({ field, value }) => ({ field, value })) as any;

  return result;
};

export const filterObjectByNullAndUndefined = <T extends {}>(object: T ): T => {
  let result = {}  as T;
  Object.keys(object).map(key => {
    if (typeof object[key] !== 'undefined' && object[key] !== null) {
      result[key] = object[key];
    }
  });
  return result;
};

export const filterDashboardFiltersByActive = (object: WidgetFilter): Partial<WidgetFilter> => {

  return Object.entries(object).reduce<Partial<WidgetFilter>>(
    (newObj, [filterKey, filterValues]) => {
      newObj[filterKey] = filterValues?.filter(({ active }) => active) ?? [];

      return newObj;
    },
    {},
  );
};
