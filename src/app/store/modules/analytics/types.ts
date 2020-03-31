import { MomentInput } from 'moment';
import {
  WIDGET_PAGE_CIRCLE,
  WIDGET_PAGE_LINES,
  WIDGET_PAGE_CHARTS,
  AvailableAnalyticsDataType,
} from 'app/store/modules/analytics/constants';
import { Season, AnalyticsViolationTypes } from 'app/store/modules/@types';

export type LoadAnalyticsDataOptions = {
  date: MomentInput;
  currentTypes: AnalyticsState['selectedFilters']['currentTypes']; 
  currentSystems: AnalyticsState['selectedFilters']['currentSystems'];
  season: AnalyticsState['selectedFilters']['currentSeason'];
  violationType: AnalyticsState['selectedFilters']['currentViolationType'];
};

export type GetOneAnalyticsDataOptions = {
  type: AvailableAnalyticsDataType;
  currentTypes: string[];
  currentSystems: string[];
  startDate: string;
  endDate: string;
  startDateArea: string;
  endDateArea: string;
  season: AnalyticsState['selectedFilters']['currentSeason'];
  violationType: AnalyticsState['selectedFilters']['currentViolationType'];
};

// тоже всё понятно

export type ChartObject = {
  name: string;
  type: string;
  value: number;
};

export type WidgetDataLine = {
  charts: {
    checkedObject: number;
    name: string;
    objects: ChartObject[];
    percent: string; // '0.00'
    total: number;
    totalObject: number;
  }[];
  colorSchema: {
    colorCode: {
      code: string;
      color: string;
    }[];
  };
};

export type WidgetDataCirle = {
  charts: {
    inCircleValue: number;
    lastDayDelta: number;
    name: string;
    objects: ChartObject[];
    outCircleValue: number;
    inCircleDescription: React.ReactNode | string;
    outCircleDescription: string;
  }[];
  colorSchema: {
    colorCode: {
      code: string;
      color: string;
    }[];
  };
};

export type WidgetDataCharts = {
  allStatistics: {
    lastPeriodPercent: string; // "0.00"
    amountObject: number;
    name: string;
    objects: {
      name: string;
      value: number;
    }[];
    type: string;
    violation: number;
    violationsToObjectPercent: string;
  }[];
  charts: {
    lastPeriodPercent: string; // "0.00"
    amountObject: number;
    name: string;
    objects: {
      name: string;
      value: number;
    }[];
    type: string;
    violation: number;
    violationsToObjectPercent: string;
  }[];
  colorSchema: {
    colorCode: {
      code: string;
      color: string;
    }[];
  };
};

export type AvalibleCurrentTypes = 'tpu' | 'mkd' | 'odh' | 'dt';

// На бэке типа ALL нет
export type AvalibleCurrentSystems = 'CAFAP' | 'OATI' | 'MGI' | 'CODD' | 'EDC' | 'NG' | 'ALL';

export type AnalyticsState = {
  date: MomentInput;
  selectedFilters: {
    currentSeason: Season.ALL | Season.MIXED | Season.WINTER;
    currentViolationType: AnalyticsViolationTypes;
    currentTypes: Set<AvalibleCurrentTypes>;
    currentSystems: Set<AvalibleCurrentSystems>;
  };

  [WIDGET_PAGE_CIRCLE]: {
    isLoading: boolean;
    data: WidgetDataCirle;
  };
  [WIDGET_PAGE_LINES]: {
    isLoading: boolean;
    data: WidgetDataLine;
  };
  [WIDGET_PAGE_CHARTS]: {
    isLoading: boolean;
    data: WidgetDataCharts;
  };
};

export enum CoefficientType {
  CHECKED_OBJECT = 'checked_object',
  GOVERNMENT = 'government',
  CITIZEN = 'citizen',
  GOVERNMENT_CITIZEN = 'government_citizen'
}

export type Coefficient = {
  name: string;
  percent: string;
  type: CoefficientType;
  value: number;
};
