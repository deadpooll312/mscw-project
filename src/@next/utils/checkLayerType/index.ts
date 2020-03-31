import type { LayerType } from 'containers/layers/types';

export const isSocLayer = (objectTypeCode: LayerType) => {
  return objectTypeCode === 'soc';
};
