import { PieChartCenterIcons } from './styled';

export type DeltaProps = {
  isPositive: boolean;
};

export type PieCenterIconProps = {
  type: keyof typeof PieChartCenterIcons;
};
