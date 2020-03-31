import { MomentInput } from 'moment';

import { ViolationsTypes } from '@next/ui/atoms/map/types';
import { Layer, SemanticsState, SemanticStateKey, RegionDataItem, DistrictDataItem, FutureSelectedObject } from 'app/store/modules/semantics/types';
import SEMANTICS_TYPES from 'app/store/modules/semantics/action_types';
import createAction from 'app/store/promise_middleware/create_action';
import { Season } from '../@types';
import { FeatureAliases } from 'app/api/types';
import { selectPrimaryFiltersWithoutTheme, selectSecondaryFiltersWithSearch } from 'app/store/modules/sidebar/selectors';
import { LayerObjectDTO } from 'app/swagger/model/layerObjectDTO';

export const update = (data: Partial<SemanticsState>) => ({
  type: SEMANTICS_TYPES.update,
  payload: {
    data,
  }
});
export const updateKey = <K extends keyof SemanticsState>(key: K, data: Partial<SemanticsState[K]>) => ({
  type: SEMANTICS_TYPES.updateKey,
  payload: {
    key,
    data,
  }
});

export const setKey = <K extends SemanticStateKey>(key: K, data: SemanticsState[K]) => ({
  type: SEMANTICS_TYPES.setKey,
  payload: {
    key,
    data,
  }
});

export const refresh = () => ({
  type: SEMANTICS_TYPES.refresh,
  payload: {},
});

// экшн получения округов
export const getRegions = () => {
  return createAction({
    type: SEMANTICS_TYPES.getRegions,
    payload: {},
  });
};

// экшн получения районов
export const getDistricts = (selectedRegionData: SemanticsState['regions']['data'][0]) => {
  return createAction({
    type: SEMANTICS_TYPES.getDistricts,
    payload: {
      selectedRegionData,
    },
  });
};

// экшн на изменение района
export const changeSelectedDistrict = (selectedDistrictData: SemanticsState['districts']['data'][0]) => {
  return createAction({
    type: SEMANTICS_TYPES.changeSelectedDistrict,
    payload: {
      selectedDistrictData,
    },
  });
};

// экшн на изменение округа
export const changeSelectedRegion = (selectedRegionData: SemanticsState['regions']['data'][0], isReset?: boolean) => {
  return createAction({
    type: SEMANTICS_TYPES.changeSelectedRegion,
    payload: {
      selectedRegionData,
      isReset,
    },
  });
};

// экшн на получение названий слоев
export const initialRegionsMapData = () => {
  return createAction({
    type: SEMANTICS_TYPES.initialRegionsMapData,
    payload: {},
  });
};

// экшн на получение названий слоев
export const getLayerNames = () => {
  return createAction({
    type: SEMANTICS_TYPES.getLayerNames,
    payload: {},
  });
};

export const refreshSemantics = () => {
  return createAction({
    type: SEMANTICS_TYPES.refresh,
    payload: {},
  });
};

// // экшн на очистку стейта выбранного района
export const refreshSelectedDistrict = () => {
  return createAction({
    type: SEMANTICS_TYPES.refreshSelectedDistrict,
    payload: {},
  });
};

export const changeSelectedObject = (selectedObject: FutureSelectedObject) => {
  return createAction({
    type: SEMANTICS_TYPES.changeSelectedObject,
    payload: {
      selectedObject,
    },
  });
};

export const getLegend = (payload: { alias: FeatureAliases | 'ts'; season: Season | 'SYS'; type: keyof SemanticsState['legend'] }) => {
  return createAction({
    type: SEMANTICS_TYPES.getLegend,
    payload
  });
};

export const showNearestCamera = (payload: { lng: number; lat: number; trash?: boolean }[]) => {
  return createAction({
    type: SEMANTICS_TYPES.showNearestCamera,
    payload,
  });
};

export const hideNearestCamera = () => (
  setKey('nearestCameras', null)
);

type GetWinterDataParams = {
  dimension: FeatureAliases;
  featureId: string;
  date: MomentInput;
};
export const getWinterData = (params: GetWinterDataParams) => {
  return createAction({
    type: SEMANTICS_TYPES.getWinterData,
    payload: {
      ...params,
    },
  });
};

export const changeSelectedLayers = (key: ViolationsTypes.violations | ViolationsTypes.violationsSys, params: Partial<SemanticsState['layers']['violations']>) => {
  return createAction({
    type: SEMANTICS_TYPES.changeSelectedLayers,
    payload: {
      key,
      params,
    },
  });
};

export const changeSelectedViolationType = (selectedTab: ViolationsTypes.violations | ViolationsTypes.violationsSys) => (
  createAction({
    type: SEMANTICS_TYPES.changeSelectedViolationType,
    payload: {
      selectedTab,
    },
  })
);

export const changeSelectedSystemTypes = (selectedSystemTypes: SemanticsState['dataFilters']['selectedSystemTypes']) => (
  updateKey<'dataFilters'>('dataFilters', { selectedSystemTypes })
);

export const changeViolationSource = (violationSource: SemanticsState['dataFilters']['violationSource']) => (
  createAction({
    type: SEMANTICS_TYPES.changeViolationSource,
    payload: {
      violationSource,
    },
  })
);

export const setASUPRSelected = (isASUPRSelected: boolean) => {
  return createAction({
    type: SEMANTICS_TYPES.setASUPRSelected,
    payload: {
      isASUPRSelected,
    }
  });
};

export const changeKGHFilter = (kgh: boolean) => (
  updateKey<'dataFilters'>('dataFilters', { kgh })
);

export const getSystemTypes = () => {
  return createAction({
    type: SEMANTICS_TYPES.getSystemTypes,
    payload: {},
  });
};

type GetASUPRDataParams = (
  {
    date: MomentInput;
    appMode: Season;
    checkMayor: boolean;
  }
) & (
  {
  selectedRegion: RegionDataItem;
  } | {
    selectedDisctrict: DistrictDataItem;
  }
);

export const getASUPRData = (params: GetASUPRDataParams) => {
  return createAction({
    type: SEMANTICS_TYPES.getASUPRData,
    payload: params,
  });
};

type GetAreaInfoByRegionParams = {
  selectedRegion: RegionDataItem;
  date: MomentInput;
  appMode: Season;
  selectedSystemTypes: string[];
  checkMayor: boolean;
  layerNames: Layer[];
  selectedTab: ViolationsTypes.violations | ViolationsTypes.violationsSys;
};

export const getAreaInfoByRegion = (params: GetAreaInfoByRegionParams) => {
  return createAction({
    type: SEMANTICS_TYPES.getAreaInfoByRegion,
    payload: {
      ...params,
    },
  });
};

type GetAreaViolationInfoByDistrictParams = {
  selectedDisctrict: DistrictDataItem;
  date: MomentInput;
  appMode: Season;
  selectedSystemTypes: string[];
  checkMayor: boolean;
  layerName: Layer;
  selectedTab: ViolationsTypes.violations | ViolationsTypes.violationsSys;
};
export const getAreaViolationInfoByDistrict = (params: GetAreaViolationInfoByDistrictParams) => {
  return createAction({
    type: SEMANTICS_TYPES.getAreaViolationInfoByDistrict,
    payload: {
      ...params,
    },
  });
};

export const changeDistrictIncidents = (payload: LayerObjectDTO[]) => {
  return createAction({
    type: SEMANTICS_TYPES.changeDistrictIncidents,
    payload,
  });
};

export const changeRegionIncidents = (payload: LayerObjectDTO[]) => {
  return createAction({
    type: SEMANTICS_TYPES.changeRegionIncidents,
    payload,
  });
};

export const changeCityIncidents = (payload: LayerObjectDTO[]) => {
  return createAction({
    type: SEMANTICS_TYPES.changeCityIncidents,
    payload,
  });
};

export const getIncidentsAction = (primaryFiltersOwn: ReturnType<typeof selectPrimaryFiltersWithoutTheme>, secondaryFiltersOwn: ReturnType<typeof selectSecondaryFiltersWithSearch>) => {
  return createAction({
    type: SEMANTICS_TYPES.getIncidents,
    payload: {
      primaryFiltersOwn,
      secondaryFiltersOwn,
    },
  });
};
