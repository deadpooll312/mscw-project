import { SemanticsState, LegendState, RegionsState, DistrictsState, LayersState } from 'app/store/modules/semantics/types';
import { ViolationsTypes } from '@next/ui/atoms/map/types';
import { AVAILABLE_CONTROL } from './constants';

export const initialRegions: RegionsState = {
  isLoading: false,
  errors: [],
  data: [],
  layerId: null,
  revisionId: null,
  aliasId: null,
};

export const initialDistricts: DistrictsState = {
  isLoading: false,
  errors: [],
  data: [],
  layerId: null,
  revisionId: null,
  aliasId: null,
  parentRegion: null,
  // ID атрибута, по которому будет фильтр районов
  filterAttributeId: null,
};

export const initialLayers: LayersState = {
  isLoading: false,
  data: [],
  violations: {
    isLoading: false,
    selectedLayers: [],
    infoRegion: null,
    infoDistrict: null,
    infoVioaltion: null,
  },
  violations_sys: {
    isLoading: false,
    selectedLayers: [],
    infoRegion: null,
    infoDistrict: null,
    infoVioaltion: null,
  },
  selectedTab: ViolationsTypes.violations,
  ASUPR: null,
};

export const initialLegend: LegendState = {
  violationsLegend: null,
  violationsLegendSys: null,
  regionsAndDistrictsLegend: null,
  violationsLegendWinter: null,
  regionsAndDistrictsLegendWinter: null,
  carsLegend: null,
};

export const initialSemanticsState: SemanticsState = {
  errors: [],
  systemTypes: [],
  dataFilters: {
    selectedSystemTypes: [],
    violationSource: AVAILABLE_CONTROL.ALL,
    kgh: true,
  },
  isLoading: false,
  legend: initialLegend,
  layers: initialLayers,
  regions: initialRegions,
  districts: initialDistricts,
  selectedObject: null,
  nearestCameras: null,
  winterData: null,

  incidents: {}
};
