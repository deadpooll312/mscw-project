import { Season } from 'app/store/modules/@types';
import VectorSource from 'ol/source/Vector';
import ClusterSource from 'ol/source/Cluster';
import VectorLayer from 'ol/layer/Vector';
import Style, { StyleLike } from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Icon from 'ol/style/Icon';
import Circle from 'ol/style/Circle';
import Text from 'ol/style/Text';

import IconAnchorUnits from 'ol/style/IconAnchorUnits';
import Feature from 'ol/Feature';
import { fromLonLat } from 'ol/proj';
import Point from 'ol/geom/Point';

import { getModify, fromHexToRgb, getViolationsMask, getViolationFill, fromHexToRgba } from 'containers/layers/utils/common';

import { ViolationData, LegendItem } from 'app/store/modules/semantics/types';
import { ViolationLayerOptions, Color, ViolationsTypes, ColorNames } from '@next/ui/atoms/map/types';
import { LayerType } from 'containers/layers/types';
import { ROLES, MAP_DATA_PERMISSIONS, MAP_PERMISSION, SEASONS_FOR_MER } from 'app/permissions/constants';
import { pinIcon, pinIconWithCounter, RED_STROKE_FOR_MORE_VIOLATIONS, GREY_MUS, GREY } from 'containers/layers/constants';
import { DashboardFeature } from 'app/store/modules/map/types';
import { UNFOUNDED_COLOR } from 'containers/layers/constants';
import { LayerObjectDTO } from 'app/swagger/model/layerObjectDTO';
import { darken } from 'polished';
import { GEOJSON } from '@next/utils/map/geojson';

const checkCount = (count: number, violationType: ViolationsTypes) => count >= 4 && violationType === ViolationsTypes.violations;

export const getVioaltionLayerName = (alias: LayerType, isASUPRSelected: boolean) => {
  return `is_vioaltion_layer_${alias ?? ''}${isASUPRSelected ? '.ASUPR' : ''}`;
};

export const getFeatureVioaltionLayerName = (alias: LayerType, isASUPRSelected: boolean) => {
  return `${getVioaltionLayerName(alias, isASUPRSelected)}.feature`;
};

const getCounterStyleToPin = (count: number) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  canvas.width = 20;
  canvas.height = 20;

  ctx.arc(
    (canvas.width) / 2,
    (canvas.width) / 2,
    10,
    0, 2* Math.PI,
    false,
  );

  ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
  ctx.fill();

  // ctx.strokeStyle =  'black';
  // ctx.stroke();

  ctx.fillStyle = 'black';
  ctx.font = `12px Circe-Regular`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(
    count.toString(),
    10,
    (canvas.height / 2),
  );

  return new Style({
    image: new Icon({
      src: undefined,
      img: canvas,
      imgSize: [canvas.width, canvas.height],
      anchor: [-0.05, 1.75],                      // на глазок (если знаешь как, то поправь)
    }),
  });
};

export const getViolationIcon = (userRoleIsMer: boolean, violationObject: LayerObjectDTO | null, layerType: LayerType, legend: LegendItem[], violationType = ViolationsTypes.violations) => {
  const getIconFunction = pinIcon[layerType as keyof typeof pinIcon];
  const count = violationObject?.amount;
  let stroke = null;
  if (checkCount(count, violationType)) {
    stroke = {
      color: RED_STROKE_FOR_MORE_VIOLATIONS,
      width: 3,
    };
  }
  try{
    const color = fromHexToRgb(legend.find((item) => item.color === violationObject?.colorCode)?.colorValue);
    if (violationObject && color) {
      return getIconFunction({color: color, modify: getModify(userRoleIsMer, violationObject, violationObject.colorCode, violationType), ...( stroke ? {stroke} : null)});
    }
    const greyColor = layerType === 'mus' ? GREY_MUS : GREY;
    return getIconFunction({color: greyColor});
  } catch (e){
    console.warn('could not get ', violationObject?.colorCode, 'from ', legend);
    return getIconFunction({color: UNFOUNDED_COLOR});
  }

};

// Стилизация
export const getViolationStyle = (legend: LegendItem[], userRoleIsMer: boolean, layerType: LayerType) => (feature: Feature): Style | Style[] => {
  let width = feature.get('isSelected') ? 1 : 0;

  const properties: Partial<LayerObjectDTO>  & Partial<{ violationType: ViolationsTypes; alias: string }> = feature.getProperties();
  const { violationType } = properties;
  // const defect: Defect = properties.defect || null;
  let count = 0;
  let modify = null;
  let defectColor = ColorNames.NO_VIOLATION;

  if (properties) {
    defectColor = properties.colorCode as ColorNames;
    modify = getModify(userRoleIsMer, properties, properties.colorCode, violationType);
    count = properties.amount;
  }
  const fill = new Fill();
  let parkStrokeColor = '';
  let color;

  // если слой парк и на территори парка есть нарушение
  if (properties.alias === 'park' && properties?.colorCode !== ColorNames.NO_VIOLATION) {
    // обводку делаем цветом критичного нарушения
    parkStrokeColor = fromHexToRgba(
      darken(0.2, legend.find((item) => item.color === ColorNames.NO_VIOLATION)?.colorValue ?? Color.GREY),
      0.9,
    );
    // цвет устанавливаем серый
    color = getViolationFill(legend, ColorNames.NO_VIOLATION);
    // ширину обводки пошире
    width = 1.5;
  } else {
    color = modify
      // если есть модификатор, то накладываем canvas маску
      ? getViolationsMask(legend, defectColor, modify)
      : getViolationFill(legend, defectColor, violationType);
  }

  const style = [
    new Style({
      fill,
      stroke: new Stroke({
        color: checkCount(count, violationType) ? RED_STROKE_FOR_MORE_VIOLATIONS : parkStrokeColor || '#fff',
        width: checkCount(count, violationType) ? 3 : width || 0.5, // жирная обводная для нарушений > 4
      }),
      zIndex: 2,
    }),
  ];

  if (properties.alias !== 'park' && count) {
    const position = feature.getProperties().centroid.coordinates;
    const newPinPolygon = new Point(position);
    style.push(
      new Style({
        image: new Circle({
          radius: 10,
          stroke: new Stroke({
            color: checkCount(count, violationType) ? RED_STROKE_FOR_MORE_VIOLATIONS : '#fff',
            width: checkCount(count, violationType) ? 3 : width || 0.5, // жирная обводная для нарушений > 4
          }),
          fill: new Fill({
            color: '#fff'
          }),
        }),
        text: new Text({
          text: `${count}`
        }),
        geometry: newPinPolygon,
        zIndex: 1000
      })
    );

  }

  fill.setColor(color);

  return style;
};

// export const featurePinFilter = (geometryFeatures: DashboardFeature[], objects: ViolationData[], isASUPRSelected?: boolean, conditionColor?: string | null) => (
//   geometryFeatures.filter(
//     (feature) => objects.find(object => {
//       if (object.feature_id === feature.properties.feature_id && object.defect?.color_code > 0) {
//         return isASUPRSelected ? object.defect?.id_systems_all?.indexOf('ASUPR') > -1 : true;
//       }
//       return false;
//     })
//   )
// );

export const featurePinFilterByPermission = (role: keyof typeof ROLES, geometryFeatures: any[], objects: ViolationData[], seasonMode: Season) => {
  return geometryFeatures.filter((feature) => {
    return objects.find(object => {
      if (object.feature_id === feature.properties.feature_id){
        if (MAP_DATA_PERMISSIONS[role] && SEASONS_FOR_MER.has(seasonMode)){
          return object.defect.color_name !== ColorNames.NOT_CRITICAL || (MAP_DATA_PERMISSIONS[role] as MAP_PERMISSION[]).includes(MAP_PERMISSION.YELLOW);
        }
        return true;
      }
    });
  });
};

export const asyncArrayMap = <T extends any, U extends any>(array: T[], callback: (d: T, index: number, array: T[]) => U) => {
  return Promise.all(
    array.map<Promise<U>>((...arg) => {
      return new Promise(
        (res) => {
          setTimeout(
            () => res(callback(...arg)),
            0,
          );
        }
      );
    })
  );
};

export const featurePolygonFilterByPermission = (role: keyof typeof ROLES, objects: ViolationData[], seasonMode: Season) => {
  const arrayOfMapPermission = MAP_DATA_PERMISSIONS[role] as MAP_PERMISSION[];

  if (!arrayOfMapPermission || seasonMode === Season.WINTER) {
    return asyncArrayMap(objects, (d) => ({ ...d }));
  }

  const setOfPermissions = new Set(arrayOfMapPermission);

  return asyncArrayMap(
    objects,
    (object) => {
      if (object.defect.color_name !== ColorNames.NOT_CRITICAL || setOfPermissions.has(MAP_PERMISSION.YELLOW)) {
        return object;
      } else {
        // objectGrey
        return {
          ...object,
          defect: {
            ...object.defect,
            id_systems: '',
            id_systems_all: '',
            color_name: ColorNames.NO_VIOLATION
          },
        };
      }
    },
  );
};

//функция создания слоя с нарушениями
export function createViolationsLayer(
  userRoleIsMer: boolean,
  immutableFeaturesFromGeoJSON: DashboardFeature[],
  options: ViolationLayerOptions,
  violationsByDistrictObject: Record<string, LayerObjectDTO>,
  legend: LegendItem[],
  isASUPRSelected: boolean,
  styleFunction: (feature: Feature) => Style | Style[]
) {
  const {
    layerType,
    violationType,
  } = options;

  const vectorSource = new VectorSource({ format: GEOJSON });
  const layer = new VectorLayer({
    source: vectorSource,
    ...(pinIcon.hasOwnProperty(layerType)
      ? {zIndex: 99}
      : {style: styleFunction}
    )
  });
  layer.set('name', getVioaltionLayerName(options.layerType, isASUPRSelected));

  const features = [];

  // if (pinIcon.hasOwnProperty(layerType)) {
  //   const filteredFeaturesByColor = featurePinFilter(featuresFromGeoJSON, violationsByDistrictObjectCopy, isASUPRSelected);
  //   if (userRoleIsMer) {
  //     immutableFeaturesFromGeoJSON = featurePinFilterByPermission(
  //       options.userRole,
  //       filteredFeaturesByColor,
  //       violationsByDistrictObjectCopy,
  //       options.appMode
  //     );
  //   } else {
  //     immutableFeaturesFromGeoJSON = filteredFeaturesByColor;
  //   }
  // } else if (userRoleIsMer) {
  //   violationsByDistrictObjectCopy = await featurePolygonFilterByPermission(options.userRole, violationsByDistrictObjectCopy, options.appMode);
  // }

  for (const f of immutableFeaturesFromGeoJSON) {
    const newFeature = GEOJSON.readFeature(f);
    const newFeatureId = newFeature.getProperties().feature_id;
    const violationObject = violationsByDistrictObject[newFeatureId] || null;

    if (violationObject || (!['mkd', 'tpu', 'soc'].includes(layerType))) {
      if (pinIcon.hasOwnProperty(layerType)) {

        const style = [
          new Style({
            image: new Icon({
              opacity: 1,
              src: getViolationIcon(userRoleIsMer, violationObject, layerType, legend, violationType),
              anchor: [15, 28],
              anchorXUnits: IconAnchorUnits.PIXELS,
              anchorYUnits: IconAnchorUnits.PIXELS,
              crossOrigin: 'anonymous',
            }),
          }),
        ];

        if (layerType in pinIconWithCounter) {
          const count = pinIconWithCounter[layerType](violationObject);

          if (count) {
            style.push(getCounterStyleToPin(count));
          }
        }

        newFeature.setStyle(style);
      }
      newFeature.set('alias', layerType);
      newFeature.set('name', getFeatureVioaltionLayerName(layerType, isASUPRSelected));
      newFeature.set('violationType', violationType);

      if (violationObject) {
        Object.entries(violationObject).forEach(([key, data]) => {
          newFeature.set(key, data);
        });
      }
      features.push(newFeature);
    }
  }

  vectorSource.addFeatures(features);

  return layer;
}

// функция создания слоя с пинами нарушений в парках
export function createParkPinsLayer(parkObjectViolation: Record<string, LayerObjectDTO>, violationType) {
  const styleFunction: StyleLike = (feature) => {
    const size = feature.get('features').length;
    const style = [
      new Style({
        image: new Icon({
          opacity: 1,
          src: pinIcon.parkViolation(),
          anchor: [15, 27],
          anchorXUnits: IconAnchorUnits.PIXELS,
          anchorYUnits: IconAnchorUnits.PIXELS,
          crossOrigin: 'anonymous',
        }),
      })
    ];
    if (size) {
      style.push(getCounterStyleToPin(size));
    }

    return style;
  };

  const vectorSource = new VectorSource();
  const clusterSource = new ClusterSource({
    distance: 30,
    source: vectorSource,
  });
  const parkPinsLayer = new VectorLayer({
    source: clusterSource,
    style: styleFunction,
    zIndex: 100,
  });

  parkPinsLayer.set('name', getVioaltionLayerName('park', false));

  const parkWithPins = Object.values(parkObjectViolation).filter(x => x?.latitude && x?.longitude);
  for (const parkPin of parkWithPins) {
    const longs = parkPin.longitude.replace(/{|}/g, '').split(',');
    const lats = parkPin.latitude.replace(/{|}/g, '').split(',');

    longs.forEach((lng, index) => {
      const lat = lats[index];

      const parkViolationPin = new Point(fromLonLat([+lng, +lat]));
      const parkViolationPinFeature = new Feature({
        id: `park-violation-${index}`,
        index: index,
        type: 'park-violation',
        geometry: parkViolationPin,
      });

      parkViolationPinFeature.set('alias', 'park');
      parkViolationPinFeature.set('name', getFeatureVioaltionLayerName('park', false));
      parkViolationPinFeature.set('violationType', violationType);

      Object.entries(parkPin).forEach(([key, data]) => {
        parkViolationPinFeature.set(key, data);
      });

      parkViolationPinFeature.setStyle(styleFunction);
      vectorSource.addFeature(parkViolationPinFeature);
    });
  }
  return parkPinsLayer;
}
