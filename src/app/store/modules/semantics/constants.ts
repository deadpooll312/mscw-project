import { FeatureAliases } from 'app/api/types';

export const ALIASES = {
  regions: FeatureAliases.REGION,
  districts: FeatureAliases.DISTRICT,
} as const;

export enum AVAILABLE_CONTROL {
  GOVERNMENT = 'GOVERNMENT',
  CITIZEN = 'CITIZEN',
  ALL = 'ALL',
}

export enum MAP_LEVEL {
  CITY = 'city',
  REGION = 'region',
  DISTRICT = 'district'
}