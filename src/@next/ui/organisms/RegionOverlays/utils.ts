import { RegionDataItem } from 'app/store/modules/semantics/types';

export const getRegionTitleFontSize = (zoom: number) => {
  if (zoom < 9.6) {
    return 10;
  }
  return 13;
};

export const getRegionViolatoinTitleFontSize = (zoom: number) => {
  if (zoom < 9.6) {
    return 10;
  }
  return 17;
};

export const getSize = (size: number, zoom: number) => {
  if (zoom < 9.6) {
    return size / 1.6;
  }
  return size;
};

export const getCenterText = (featureData: RegionDataItem) => {
  switch (featureData.shortName) {
    case 'ЗАО': {
      return [4169521.9530181335, 7502214.59679119];
    }
    case 'ЮЗАО': {
      return [4177994.1311519877, 7488094.299901434];
    }
    case 'СЗАО': {
      return [4168109.923329158, 7519764.108639889];
    }
    case 'ЮАО': {
      return [4190904.1168797654, 7483858.210834507];
    }
    case 'САО': {
      return [4177187.2570440015, 7527227.69413876];
    }
  }
  return featureData?.centroid?.coordinates;
};