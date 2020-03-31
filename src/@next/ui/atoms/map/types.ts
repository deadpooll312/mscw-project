import type { LayerType } from 'containers/layers/types';

export type Range = {
  [key: string]: {
    min: number;
    max: number;
    color?: string;
  };
};

export type ViolationLayerOptions = {
  layerType: LayerType;
  violationType: ViolationType;
};

export enum Color {
  RED = 'critical',
  GREY = 'grey',
  GREEN = 'checked',
  YELLOW = 'yellow',
  ORANGE = 'not_critical'
}

export enum ColorNames {
  NO_VIOLATION = 'no_violation',
  CHECKED = 'checked',
  CRITICAL = 'critical',
  NOT_CRITICAL = 'not_critical',
  FOTO_VIOLATION = 'foto_violation',
  SYSTEMATIC_VIOLATION = 'systematic_violation'
}

export enum ViolationsTypes {
  'violations' =  'violations',
  'violationsSys' = 'violations_sys'
}

export type ViolationType = ViolationsTypes.violations | ViolationsTypes.violationsSys;

export type ViolationColor =
  ColorNames.NO_VIOLATION |
  ColorNames.CHECKED |
  ColorNames.CRITICAL |
  ColorNames.NOT_CRITICAL |
  ColorNames.FOTO_VIOLATION |
  ColorNames.SYSTEMATIC_VIOLATION;
