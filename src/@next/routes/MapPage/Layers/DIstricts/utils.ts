import { getRegionStyle } from '@next/routes/MapPage/Layers/Region/utils';
import find from 'lodash-es/find';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Text from 'ol/style/Text';
import Circle from 'ol/style/Circle';
import { StyleLike } from 'ol/style/Style';
import Map from 'ol/Map';
import { ViolationObject, DistrictDataItem } from 'app/store/modules/semantics/types';

export const getDistrictStyle = getRegionStyle;

const getDistrictViolatoinTitleFontSize = (zoom: number) => {
  if (zoom < 9.6) {
    return '10px';
  } else if (zoom <= 12) {
    return '15px';
  }
  return '15px';
};

const getDistrictRadius = (zoom: number) => {
  if (zoom >= 10 && zoom <= 12) {
    return 17;
  } else if (zoom >= 12 && zoom <= 17) {
    return 17;
  }
  return 12;
};

export const violationTitleStyleFunctionForDistrict = (map: Map, violationsObjects: Record<string, ViolationObject>, fieldToShowInCircle: string): StyleLike => (feature) => {
  const objectWithViolation = find(violationsObjects, function(o) { 
    return o.feature_id === feature.getProperties().feature_id; 
  });
  
  if(!objectWithViolation || !objectWithViolation.total.amount_objects){
    return null;   
  }
  
  const style = new Style({
    text: new Text({
      fill: new Fill({
        color: 'black',
      }),
      stroke: new Stroke({
        color: 'white',
        width: 1,
      }),
      offsetY: 1,
      font: `${getDistrictViolatoinTitleFontSize(map.getView().getZoom())} Circe-Regular`,
      text: `${objectWithViolation.total[fieldToShowInCircle]}`,
    }),
    image: new Circle({
      radius: getDistrictRadius(map.getView().getZoom()),
      stroke: new Stroke({
        color: 'rgba(36, 50, 57, 0.5)'
      }),
      fill: new Fill({
        color: '#fff'
      })
    }),
  });

  return style;
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