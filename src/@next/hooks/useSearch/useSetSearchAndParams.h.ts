import { LayerType } from 'containers/layers/types';

export type HandleSetSearchAndParamsNewSearchData = {
  params?: {
    id?: number | string;

    test_a?: number | string;
    test_c?: number | string;
  };
  search?: {
    violationPartialData?: {
      featureId: string;
      objectTypeCode: LayerType;
      okrugName: string;
      districtName: string;
    };

    test_a?: number | string | { test_aa: number } | (number | string)[];
    test_b?: number | string;
    test_c?: number | string;
  };
  type?: 'push' | 'replace';
  path?: string;
};

export type HandleSetSearchAndParams = (newSearchData: HandleSetSearchAndParamsNewSearchData) => void;
