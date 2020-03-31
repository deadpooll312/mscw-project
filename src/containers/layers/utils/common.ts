import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';

import { DEVICE_PIXEL_RATIO } from 'ol/has';
import { FeatureLike } from 'ol/Feature';
import VectorLayer  from 'ol/layer/Vector';
import { Range } from '@next/ui/atoms/map/types';

import { LegendItem } from 'app/store/modules/semantics/types';

import { ViolationType, Color, ViolationColor, ViolationsTypes, ColorNames } from '@next/ui/atoms/map/types';
import { UNFOUNDED_COLOR } from 'containers/layers/constants';
import { IconModifier } from 'components/Icons/types';

function getColorArray(color): number[] {
  const colorArray = new Array<number>();
  if (color.length < 6) {
    for(let i = 0; i < color.length; i++) {
      const char = color.substr(i, 1);
      const resultColor = parseInt(char.concat(char), 16);
      if (isNaN(resultColor)) {
        return null;
      }
      colorArray.push(resultColor);
    }
  } else {
    for(let i = 0; i < color.length; i+=2) {
      const resultColor = parseInt(color.substr(i, 2), 16);
      colorArray.push(resultColor);
    }
  }
  return colorArray;
}

export const fromHexToRgba = (color: string, alpha: number) => {
  try {
    if (color[0] === '#') {
      const colorArray = getColorArray(color.slice(1));
      return `rgba(${colorArray.join(',')}, ${alpha})`;
    } else {
      return color;
    }
  } catch(e){
    console.warn(e);
    return UNFOUNDED_COLOR;
  }
};

export const fromHexToRgb = (color: string) => {
  return color ? fromHexToRgba(color, 1) : null;
};

export const layerFilter = (layer: VectorLayer) => {
  const features = layer.getSource().getFeatures();
  if (features.length) {
    const type = features[0].getGeometry().getType();
    return type === 'Polygon' || type === 'MultiPolygon';
  }
  return false;
};

export const getModify = (userRoleIsMer: boolean, properties: { [k: string]: any }, colorName: string, violationType = ViolationsTypes.violations): IconModifier | null => {

  if (violationType === 'violations' && properties?.hasfotovideo > 0) {
    if (userRoleIsMer && colorName === ColorNames.NO_VIOLATION) {
      return null;
    }
    return 'line';
  }
  // if (violationType === 'violations_sys' && colorName !== ColorNames.NO_VIOLATION) {

  //   return 'cross';
  // }
  return null;
};

export const getViolationFill = (legend: LegendItem[], defectColorName: ViolationColor, violationType?: ViolationType) => {
  const legendItem = legend.find((item) => item.color === defectColorName);
  let defectColor = '';
  const greyColor = fromHexToRgba((legend.find((item) => item.color === ColorNames.NO_VIOLATION) || { colorValue: Color.GREY }).colorValue, 0.9);
  if (legendItem) {
    defectColor = fromHexToRgba(legendItem.colorValue, 0.9);
    if (!defectColor) {
      console.warn(`Невозможно преобразовать цвет ${defectColorName}`);
    } else {
      if (violationType === 'violations_sys') {
        return (
          defectColorName === ColorNames.NO_VIOLATION
            ? greyColor
            : defectColor
        );
      }
    }
  }
  return defectColor || greyColor;
};

export const getViolationsMask = (legend: LegendItem[], color: ViolationColor, modifyType: IconModifier) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const legendItem = legend.find((item) => item.color === color);
  let fillColor = '';
  const greyColor = fromHexToRgba((legend.find((item) => item.color === ColorNames.NO_VIOLATION) || { colorValue: Color.GREY }).colorValue, 0.9);
  if (legendItem) {
    fillColor = fromHexToRgba(legendItem.colorValue, 0.9);
    if (!fillColor) {
      console.warn(`Невозможно преобразовать цвет ${color}`);
      fillColor = greyColor;
    }
  }
  const pattern = (function() {
    if (modifyType === 'line') {
      const width = 32 * DEVICE_PIXEL_RATIO;
      const height = 32 * DEVICE_PIXEL_RATIO;
      canvas.width = width;
      canvas.height = height;
      context.fillStyle = fillColor || greyColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
      // line 1
      context.beginPath();
      context.moveTo(width / 4, 0);
      context.lineTo(0, height / 4);
      // line 2
      context.moveTo(0, height / 2);
      context.lineTo(width / 2, 0);
      // line 3
      context.moveTo(width / 4 * 3, 0);
      context.lineTo(0, height / 4 * 3);
      // line 4
      context.moveTo(0, height);
      context.lineTo(width, 0);
      // line 5
      context.moveTo(width, height / 4);
      context.lineTo(width / 4, height);
      // line 6
      context.moveTo(width / 2, height);
      context.lineTo(width, height / 2);
      // line 7
      context.moveTo(width, height / 4 * 3);
      context.lineTo(width / 4 * 3, height);
      context.lineWidth = 1;
    } else if (modifyType === 'cross') {
      const width = 16 * DEVICE_PIXEL_RATIO;
      const height = 16 * DEVICE_PIXEL_RATIO;
      canvas.width = width;
      canvas.height = height;
      context.fillStyle = fillColor || greyColor;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.moveTo(width / 8 * 3, height / 8 * 3);
      context.lineTo(width / 8 * 5, height / 8 * 5);
      context.moveTo(width / 8 * 3, height / 8 * 5);
      context.lineTo(width / 8 * 5, height / 8 * 3);
      context.lineWidth = 1;
    }
    context.strokeStyle = '#2a2a2c';

    context.stroke();
    return context.createPattern(canvas, 'repeat');
  }());
  return pattern;
};

export const getFeatureColor = (violationCount: number, amountObjects: number, ranges: Range): string => {
  let percent = (violationCount * 100) / amountObjects;
  const range = Object.keys(ranges).find((key) => {
    percent = isNaN(percent) ? 0 : percent;

    return percent >= ranges[key].min && percent <= ranges[key].max;
  });

  const resultColor = range && ranges[range].color ? ranges[range].color || ranges[Color.GREEN]?.color : ranges[Color.GREEN]?.color;
  return resultColor;
};

export const generateStyle = (fillColor, strokeColor, strokeWidth = 2, zIndex = 1) => {
  return new Style({
    fill: new Fill({
      color: fillColor,
    }),
    stroke: new Stroke({
      color: strokeColor,
      width: strokeWidth,
    }),
    zIndex,
  });
};

export const clearStyle = (feature: FeatureLike) => {
  if ('getStyle' in feature) {
    const style = feature.getStyle();
    if (style) {
      if ('getFill' in style) {
        const fillColor = style.getFill().getColor();
        const strokeColor = style.getStroke().getColor();
        feature.setStyle(generateStyle(fillColor, strokeColor));
      }
    }
  }
};
