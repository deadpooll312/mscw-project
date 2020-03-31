import { MomentInput } from 'moment';

import {
  SECOND_PAGE,
  THIRD_PAGE,
  FOURTH_PAGE,
  FIFTH_PAGE,
  SIXTH_PAGE,
  SEVENTH_PAGE,
} from 'app/store/modules/report/constants';

type PageCommonData<Number extends number> = {
  pageNumber: Number;
};

export type PageTwoData = PageCommonData<typeof SECOND_PAGE> & {
  lastDay: {
    all: number;
    checkToTotalPercent: number;
    checkedObject: number;
    criticalViolationToViolationPercent: number;
    date: string;
    totalObject: number;
    violationCheckGov: number;
    violationCheckGovAndCitizen: number;
    violationCheckGovAndCitizenPercent: number;
    violationChecksCitizen: number;
    violationCitizenPercent: number;
    violationCritical: number;
    violationGovPercent: number;
    violationObject: number;
    violationToTotalPercent: number;
    winter: number;
    winter_and_all: number;
  };
  currentDay: PageTwoData['lastDay'];
  delta: {
    all: number;
    checkedObject: number;
    violationCheckGov: number;
    violationCheckGovAndCitizen: number;
    violationChecksCitizen: number;
    violationCritical: number;
    violationObject: number;
    winter: number;
    winter_and_all: number;
  };
};

export type PageThreeData = (
  PageCommonData<typeof THIRD_PAGE>
  & {
    lastDay: {
      date: string;
      temperature: number;
      info: {
        allCriticalViolation: number;
        allViolation: number;
        checkedObject: number;
        criticalViolation: number;
        daysAfterSnowfall: number;
        name: string;
        percent: number;
        snowDepth: number;
        totalObject: number;
        violation: number;
        winterCriticalViolation: number;
        winterViolation: number;
      }[];
    };
    currentDay: PageThreeData['lastDay'];
  }
);

export type RegionObject = { 
  name: string;
  objects: RegionObjectItem[];
  total?: number;
};
export type RegionObjectItem = {
   code: string;
   name: string;
   value?: number;
   percent?: number;
   total?: number;
   type?: string;
};
export type PageFourData = PageCommonData<typeof FOURTH_PAGE> & {
  objectCriticalToChecked: RegionObject[];
  objectSeasonAndCritical?: RegionObject[];
  objectStatuses: RegionObject[];
};
export type PageFiveData = PageCommonData<typeof FIFTH_PAGE> & {
  regions: {
    citizenControl: {
      rating: number;
      uniqueCheckedPercent: number;
      criticalToCheckedPercent: number;
      violationToCheckedPercent: number;
    };
    consolidatedControl: {
      rating: number;
      uniqueCheckedPercent: number;
      criticalToCheckedPercent: number;
      violationToCheckedPercent: number;
    };
    departmentalControl: {
      rating: number;
      uniqueCheckedPercent: number;
      criticalToCheckedPercent: number;
      violationToCheckedPercent: number;
    };
    name: string;
    totalChecked: number;
    totalObject: number;
  }[];
};
export type PageSixData = PageCommonData<typeof SIXTH_PAGE> & Pick<PageFourData, 'objectCriticalToChecked' | 'objectSeasonAndCritical' | 'objectStatuses'>;
export type PageSevenData = PageCommonData<typeof SEVENTH_PAGE> & Pick<PageFourData, 'objectCriticalToChecked' | 'objectSeasonAndCritical' | 'objectStatuses'>;

export type ReportDataColorSchema = {
  colorCode: {
    code: string;
    color: string;
  }[];
  legend: {
    color: string;
    colorValue: string;
    description: string;
    maxPercent: number;
    minPercent: number;

    emoji?: string;
  }[];
};

export type ReportStore = {
  date: MomentInput;
  isLoading: boolean;
  data: null | {
    id: number;
    season: 'winter' | string;
    type: string;

    colorSchema: ReportDataColorSchema;

    semantic: {
      date: string;
      pages: [
        PageTwoData,
        PageThreeData,
        PageFourData,
        PageFiveData,
        PageSixData,
        PageSevenData,
      ];
      pagesIndex: {
        [SECOND_PAGE]: PageTwoData;
        [THIRD_PAGE]: PageThreeData;
        [FOURTH_PAGE]: PageFourData;
        [FIFTH_PAGE]: PageFiveData;
        [SIXTH_PAGE]: PageSixData;
        [SEVENTH_PAGE]: PageSevenData;
      };
    };
  };
};
