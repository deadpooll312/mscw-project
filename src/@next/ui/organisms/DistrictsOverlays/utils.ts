import { DistrictDataItem } from 'app/store/modules/semantics/types';

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
  return size;
};

export const getCenterTextDistricts = (featureData: DistrictDataItem) => {
  switch (featureData.name) {
    case 'Восточный': {
      return [4215158.105597, 7521300];
    }
    case 'Кунцево': {
      return [4163000, 7507100];
    }
    case 'Марфино': {
      return [4184900, 7524500];
    }
    case 'Хорошево-Мневники': {
      return [4170428.779841, 7514800];
    }
    default: {
      return featureData?.centroid?.coordinates;
    }
  }
};