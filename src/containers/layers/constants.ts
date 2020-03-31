import { 
  getPinIconSvg, 
  getHomeIconSvg, 
  getCameraIcon, 
  getClusterIcon, 
  getParkViolationIcon, 
  getPinPolygonIcon, 
  getScoPinIcon,
  getTrashPinIcon
} from 'components/Icons';
import { Color } from '@next/ui/atoms/map/types';

import { OverloadedIconFunc } from './types';
import { LayerObjectDTO } from 'app/swagger/model/layerObjectDTO';

export const GREEN_REG_AND_DIS = 'rgba(147, 189, 27, 0.6)'; // '#93bd1b'
export const GREEN_VIOLATION = 'rgba(111, 178, 22, 0.6)'; // #6fb216
export const YELLOW = 'rgba(254, 221, 42, 0.6)'; // '#fedd2a'
export const RED = 'rgba(245, 61, 61, 0.6)'; // '#f53d3d'
export const RED_PIN_VIOLATION = 'rgb(245, 61, 61)'; // '#f53d3d'
export const YELLOW_PIN_VIOLATION = 'rgb(254, 221, 42)'; // '#fedd2a'
export const GREEN_PIN_VIOLATION = 'rgb(111, 178, 22)'; // #6fb216

export const RED_STROKE_FOR_MORE_VIOLATIONS = 'rgb(255, 34, 0)';
// export const GREY = 'rgb(128, 128, 128)'; //#808080
// export const GREY = 'rgb(192, 192, 192)'; //#C0C0C0
export const GREY = 'rgb(192, 192, 208)'; //#C0C0D0
export const LIGHT_GREY = 'rgb(200, 200, 200)'; // #c8c8c8
export const GREY_MUS = 'rgb(137,137,164)'; //#8989A4

export const DEFAULT_COLOR = GREEN_REG_AND_DIS;

export const UNFOUNDED_COLOR = 'rgb(0, 0, 0)';

export const pinIcon = {
  tpu: ({ color, modify, stroke }: OverloadedIconFunc) => `data:image/svg+xml,${getPinIconSvg(color, modify, stroke)}`,
  mkd: ({ color, modify, stroke }: OverloadedIconFunc) => `data:image/svg+xml,${getHomeIconSvg(color, { modify }, stroke)}`,
  soc: ({ color, modify, stroke }: OverloadedIconFunc) => `data:image/svg+xml,${getScoPinIcon(color, { modify }, stroke)}`,
  mus: ({ color, modify, stroke }: OverloadedIconFunc) => `data:image/svg+xml,${getTrashPinIcon(color, { modify }, stroke)}`,
  camera: ({ selected = false, hovered = false, isFakeCoordinates = false }: OverloadedIconFunc = {}) => `data:image/svg+xml,${getCameraIcon(selected, hovered, isFakeCoordinates)}`,
  cluster: ({ size }: OverloadedIconFunc) => `data:image/svg+xml,${getClusterIcon(size)}`,
  parkViolation: () => `data:image/svg+xml,${getParkViolationIcon()}`,
  pinPolygon: ({ size, }: OverloadedIconFunc) => `data:image/svg+xml,${getPinPolygonIcon(size)}`,
};

const defaultCalcCount = (data: LayerObjectDTO) => data?.amount;
export const pinIconWithCounter = {
  tpu: defaultCalcCount,
  mkd: defaultCalcCount,
  dt: defaultCalcCount,
  odh: defaultCalcCount,
  park: defaultCalcCount,
  soc: defaultCalcCount,
};

// цвета для полигонов
export const violationColors = {
  [Color.GREY]: GREY,
  [Color.RED]: RED,
  [Color.YELLOW]: YELLOW,
  [Color.GREEN]: GREEN_VIOLATION,
};

export const violationPinColors = {
  [Color.GREY]: GREY,
  [Color.RED]: RED_PIN_VIOLATION,
  [Color.YELLOW]: YELLOW_PIN_VIOLATION,
  [Color.GREEN]: GREEN_PIN_VIOLATION,
};

export const SHADOW_OFFSET = 200;
export const SHADOW_OFFSET_X = -SHADOW_OFFSET;
export const SHADOW_OFFSET_Y = SHADOW_OFFSET;
