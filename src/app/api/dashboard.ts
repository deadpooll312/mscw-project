import {
  URL_WIDGETS,
  URL_FOR_TABLE,
  URL_INITIAL_FILTERS,
  URL_DASHBOARD_DASHLET,
  URL_FOR_TABLE_IN_EXCEL,
} from 'app/api/constants';
import { axiosDashboard } from 'app/api/axios';
import { RestResult } from 'app/types';
import { WidgetFilter } from 'app/swagger/model/widgetFilter';
import { PageResultObjectForTable, GetDashboardDashletDataParams } from 'app/api/types';
import { DashletDTO } from 'app/swagger/model/dashletDTO';
import { AdvancedWidgetFilter } from 'app/store/modules/dashboard/types';

export const getInitialFilters = () => {
  return axiosDashboard.get<any, RestResult<WidgetFilter>>(URL_INITIAL_FILTERS);
};

export const getDashboardData = (bodyParams, params) => {
  return axiosDashboard.post<any, RestResult<AdvancedWidgetFilter>>(URL_WIDGETS, bodyParams, { params });
};

export const getDashboardTableData = (bodyParams, params) => {
  return axiosDashboard.post<any, RestResult<PageResultObjectForTable>>(URL_FOR_TABLE, bodyParams, { params });
};

export const getDashboardTableExcel = (bodyParams, params) => {
  return axiosDashboard.post<any, Promise<Blob>>(URL_FOR_TABLE_IN_EXCEL, bodyParams, { params, responseType: 'blob' });
};

export const getDashboardDashletData = (params: GetDashboardDashletDataParams) => {
  // const params = {
  //   date: getFormattedDashDate(date, false, true),
  // };

  return axiosDashboard.get<any, RestResult<DashletDTO>>(URL_DASHBOARD_DASHLET, { params });
};
