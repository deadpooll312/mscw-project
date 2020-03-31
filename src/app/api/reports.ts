import { axiosDashboard } from 'app/api/axios';

import { GetOneAnalyticsDataOptions, WidgetDataCharts, WidgetDataCirle, WidgetDataLine } from 'app/store/modules/analytics/types';
import { Season, AnalyticsViolationTypes } from 'app/store/modules/@types';
import { RestResult } from 'app/types';
import { ReportInfoResponse } from 'app/api/types';

import {
  WIDGET_PAGE_CHARTS,
  WIDGET_PAGE_CIRCLE,
  WIDGET_PAGE_LINES,
} from 'app/store/modules/analytics/constants';

import { 
  URL_SAVE_REPORT, 
  URL_REPORT_TYPES, 
  URL_CHECK_REPORT, 
  URL_INSTRUCTION, 
  URL_REPORT_LINK, 
  URL_REPORT_INFO,
  URL_GRAPHICS 
} from 'app/api/constants';

type ReportDTO = {
  date: string;
  upload_date?: string;
  type: string;
  data: string;
  name: string;
};

type UploadFileResponse = {
  data: string;
  result: string;
};

export enum ReportType {
  'dayMayor' = 'dayMayor',
  'dayPrefect' = 'dayPrefect',
  'week' = 'week',
  'primaryData' = 'primaryData',
  'instruction' = 'instruction'
}

export type ReportTypes = {
  [key in keyof typeof ReportType]: string;
};

export const addReport = (params: ReportDTO) => axiosDashboard
  .post<any, RestResult<any>>(URL_SAVE_REPORT, params);

export const uploadFileReport = (formData: FormData): Promise<UploadFileResponse> => axiosDashboard
  .post('/egip/files', formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

// не нашел в сваггере
export const getInstructionData = () => axiosDashboard.get<any>(URL_INSTRUCTION);

//  TODO wrong swagger response type
export const getReportTypes = () => axiosDashboard.get<any, RestResult<ReportTypes>>(URL_REPORT_TYPES);

//  TODO wrong swagger response type
export const checkReportStatus = (date: string, type: string) => axiosDashboard.get(URL_CHECK_REPORT, { params: { date, type } });

export const getReportID = (date: string, type: string) => 
  axiosDashboard.get<RestResult<string>>(URL_REPORT_LINK, { params: { date, type } });

//  TODO wrong swagger response type
export const getEveryDayReportInfo = (date: string) => 
  axiosDashboard.get<RestResult<ReportInfoResponse>, RestResult<ReportInfoResponse>>(URL_REPORT_INFO, { params: { date } });

//  TODO wrong swagger response type
export const getOneAnalyticsData = (options: GetOneAnalyticsDataOptions) => {
  const { 
    startDate, 
    currentTypes, 
    currentSystems, 
    type, 
    startDateArea, 
    endDateArea,
    season,
    violationType
  } = options;
  let path = '';
  const params: Record<string, any> = {
    startDate,
    dimension: currentTypes.toString(),
    sourceSystems: currentSystems.toString(),
    ...(season !== Season.MIXED ? {season} : null),
    ...(violationType !== AnalyticsViolationTypes.ALL ? { violationType } : null)
  };
  switch (type) {
    case WIDGET_PAGE_LINES: {
      path = 'varChart';
      break;
    }
    case WIDGET_PAGE_CIRCLE: {
      path = 'circleChart';
      break;
    }
    case WIDGET_PAGE_CHARTS: {
      params.startDate = startDateArea;
      params.endDate = endDateArea;
      path = 'areaChart';
      break;
    }
  }

  return axiosDashboard.get<any, RestResult<WidgetDataCharts | WidgetDataCirle | WidgetDataLine>>(
    `${URL_GRAPHICS}/${path}`,
    {
      params,
    },
  );
};

