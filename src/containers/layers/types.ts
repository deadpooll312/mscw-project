import type { IconModifier } from 'components/Icons/types';

export type LayerType = 'tpu' | 'mkd' | 'odh' | 'dt' | 'park' | 'soc' | 'mus';

export type OverloadedIconFunc = {
  color?: string;
  modify?: IconModifier | null;
  selected?: boolean;
  size?: number;
  hovered?: boolean;
  isFakeCoordinates?: boolean;
  stroke?: {
    color: string;
    width: number;
  };
};
