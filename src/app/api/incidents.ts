import { URL_LAYER_INCIDENTS, URL_INCIDENT_FEATURE } from 'app/api/constants';

import { axiosDashboard } from 'app/api/axios';
import { RestResult, PrimaryFilter, FeatureIncidentPrimaryFilter } from 'app/types';
import { WidgetFilter } from 'app/swagger/model/widgetFilter';
import { LayerIncidentResult } from 'app/api/types';
import { LayerSingleObjectDTO } from 'app/swagger/model/layerSingleObjectDTO';

const CITY = { regions: [], districts: [] };
const REGION = { districts: [] };

//base method
export const getIncidents = (bodyParams: Partial<WidgetFilter>, params: PrimaryFilter) => 
  axiosDashboard.post<any, RestResult<LayerIncidentResult>>(`${URL_LAYER_INCIDENTS}`, bodyParams, { params });

export const getIncidentFeature = (bodyParams: Partial<WidgetFilter>, params: FeatureIncidentPrimaryFilter) => 
  axiosDashboard.post<any, RestResult<LayerSingleObjectDTO>>(`${URL_INCIDENT_FEATURE}`, bodyParams, { params });
  
export const getCityIncidents = (bodyParams: Partial<WidgetFilter>, params: PrimaryFilter) => 
  getIncidents({ ...bodyParams, ...CITY }, params);

export const getRegionIncidents = (bodyParams: Partial<WidgetFilter>, params: PrimaryFilter) => 
  getIncidents({ ...bodyParams, ...REGION }, params);

export const getDistrictIncidents = (bodyParams: Partial<WidgetFilter>, params: PrimaryFilter) => 
  getIncidents(bodyParams, params);