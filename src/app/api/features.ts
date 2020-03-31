import { axiosDashboard } from 'app/api/axios';
import { URL_FEATURES } from './constants';
import { FeatureAliases, FeatureJSON } from './types';

//base methods
//  TODO wrong swagger response type
export const loadFeatures = (alias: FeatureAliases) => 
  axiosDashboard.get<any, FeatureJSON[]>(`${URL_FEATURES}/${alias}`);

//  TODO wrong swagger response type
export const loadFeaturesByFilter = (
  alias: FeatureAliases, 
  filter: string, 
  value: string, 
  params?: Record<string, string | number>
) => 
  axiosDashboard.get<any, FeatureJSON[]>(`${URL_FEATURES}/${alias}/${filter}/${value}`, {params});

export const loadRegions = () => loadFeatures(FeatureAliases.REGION);

export const loadDistricts = (regionName: string) =>
  loadFeaturesByFilter(FeatureAliases.DISTRICT, 'properties.parent', regionName);

export const loadCity = () => loadFeatures(FeatureAliases.CITY);