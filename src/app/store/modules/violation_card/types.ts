import type { LayerType } from 'containers/layers/types';
import type { LayerSingleObjectDTO } from 'app/swagger/model/layerSingleObjectDTO';

export type ViolationCardState = {
  isLoading: boolean;
  data: LayerSingleObjectDTO & {
    featureId: string;
    objectTypeCode: LayerType;
    okrugName: string;
    districtName: string;
  };
  activeDefectIndex: number;
};
