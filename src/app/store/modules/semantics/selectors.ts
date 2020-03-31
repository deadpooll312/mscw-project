import keyBy from 'lodash-es/keyBy';
import { createSelector } from 'reselect';

import { selectViolationsGeometry, selectDistrictsGeometry } from 'app/store/modules/map/selectors';
import { selectMapData, selectUser, selectShowCars } from 'app/store/modules/app/selectors';
import { ReduxState } from 'app/store/modules/@types';
import { ViolationsTypes } from '@next/ui/atoms/map/types';
import { AVAILABLE_CONTROL, MAP_LEVEL } from './constants';
import { summAllProperties } from 'utils';
import { TotalViolation } from 'app/store/modules/semantics/types';
import { GetViolationsResponse } from 'app/api/types';
import { selectModuleSidebarRegions, selectModuleSidebarDistricts, selectModuleSidebarSeason, selectModuleSidebarViolationTypeIsSys } from 'app/store/modules/sidebar/selectors';
import { selectDashboardObjectWidget } from 'app/store/modules/dashboard/selectors';
import { LayerObjectDTO } from 'app/swagger/model/layerObjectDTO';
import uniqBy from 'lodash-es/uniqBy';
import { getLengendByPermission } from '@next/utils/checkOnPermission';

export function selectSemanticsModule(state: ReduxState) {
  return state.semantics;
}

export function selectRegions(state: ReduxState) {
  return selectSemanticsModule(state).regions;
}

export function selectDistricts(state: ReduxState) {
  return selectSemanticsModule(state).districts;
}
export function selectIsDistrictsHasData(state: ReduxState) {
  return Boolean(selectDistricts(state)?.data?.length);
}

export function selectLayers(state: ReduxState) {
  return selectSemanticsModule(state).layers;
}

export function selectLegend(state: ReduxState) {
  return selectSemanticsModule(state).legend;
}

export function selectReigionsData(state: ReduxState) {
  const regions = selectRegions(state);
  return regions?.data;
}

export function selectSelectedRegion(state: ReduxState) {
  const regionsData = selectReigionsData(state);
  const currentRegions = selectModuleSidebarRegions(state);

  if (currentRegions?.[0]?.type) {
    return regionsData?.find((rowData) => rowData.featureId === currentRegions?.[0]?.type) ?? null;
  }

  return null;
}

export function selectRegionsAliasId(state: ReduxState) {
  const regions = selectRegions(state);
  return regions?.aliasId;
}

//districts

export const selectDistrictsData = (state: ReduxState) => {
  return selectDistricts(state)?.data;
};

export function selectParentRegion(state: ReduxState) {
  const distrcits = selectDistricts(state);
  return distrcits?.parentRegion;
}

export function selectFilterAttributeId(state: ReduxState) {
  const distrcits = selectDistricts(state);
  return distrcits?.filterAttributeId;
}

export function selectSelectedDistrict(state: ReduxState) {
  const districtsData = selectDistrictsData(state);
  const currentDIstrict = selectModuleSidebarDistricts(state);

  if (currentDIstrict?.[0]?.type) {
    return districtsData?.find((rowData) => rowData.featureId === currentDIstrict?.[0]?.type) ?? null;
  }

  return null;
}

export function selectIsViolationsShowed(state: ReduxState) {
  return Boolean(selectSelectedDistrict(state));
}

//layers
// данные слоев
export function selectLayersData(state: ReduxState) {
  return selectLayers(state).data;
}

export function selectViolations(state: ReduxState) {
  return selectLayers(state).violations;
}
export function selectSelectedLayersViolations(state: ReduxState) {
  return selectViolations(state).selectedLayers;
}
export function selectViolationsSys(state: ReduxState) {
  return selectLayers(state).violations_sys;
}
export function selectSelectedLayersViolationsSys(state: ReduxState) {
  return selectViolationsSys(state).selectedLayers;
}

export function selectSelectedLayersBySelectedViolationType(state: ReduxState) {
  const selectedViolationType = selectSelectedViolationType(state);
  const selectedViolationsLayers = selectSelectedLayersViolations(state);
  const selectedViolationsSysLayers = selectSelectedLayersViolationsSys(state);

  if (selectedViolationType === ViolationsTypes.violations) {
    return selectedViolationsLayers;
  }

  return selectedViolationsSysLayers;
}

export function selectSelectedViolationType(state: ReduxState){
  return selectLayers(state).selectedTab;
}

export const selectSystemTypes = (state: ReduxState) => {
  return selectSemanticsModule(state).systemTypes;
};

export function selectASUPR(state: ReduxState){
  return selectLayers(state).ASUPR;
}

export function selectASUPRSelected(state: ReduxState) {
  return selectASUPR(state)?.isSelected;
}

export function selectASUPRData(state: ReduxState) {
  return selectASUPR(state)?.data;
}

export const selectSystemTypesForViolationSource = createSelector(
  selectSystemTypes,
  selectSelectedViolationType,
  selectViolationSource,
  selectASUPRSelected,
  (systemTypes, ViolationType, ViolationSource, ASUPRisSelected): ReduxState['semantics']['systemTypes'] => {
    if (ASUPRisSelected || ViolationType === ViolationsTypes.violationsSys) {
      return [];
    }

    let ansArray = [];

    if (ViolationSource === AVAILABLE_CONTROL.ALL) {
      ansArray = systemTypes;
    } else {
      ansArray = systemTypes.filter((rowData) => rowData.type === ViolationSource);
    }

    return ansArray;
  },
);

export const selectDataFilters = (state: ReduxState) => {
  return selectSemanticsModule(state).dataFilters;
};

export const selectSelectedSystemTypes = (state: ReduxState) => {
  return selectDataFilters(state).selectedSystemTypes;
};

//legend

export const selectCarsLegend = (state: ReduxState) => {
  return selectLegend(state).carsLegend;
};

export function selectLegendForDistricts(state: ReduxState) {
  return selectLegend(state).regionsAndDistrictsLegend;
}

export function selectLegendForViolations(state: ReduxState) {
  return selectLegend(state).violationsLegend;
}

export function selectLegendForViolationsSys(state: ReduxState) {
  return selectLegend(state).violationsLegendSys;
}

export const selectLegendForViolationsBySource = createSelector(
  selectModuleSidebarViolationTypeIsSys,
  selectLegendForViolations,
  selectLegendForViolationsSys,
  (violationActiveIsSys, violationsLegend, violationsLegendSys) => {
    if (violationActiveIsSys) {
      return violationsLegendSys;
    }

    return violationsLegend;
  },
);

//feature

export function selectSelectedObject(state: ReduxState) {
  return selectSemanticsModule(state).selectedObject;
}

export function selectCurrentViolationGeometry(state: ReduxState) {
  const selectedObect = selectSelectedObject(state);
  if (selectedObect) {
    const { dimension, featureId } = selectedObect;
    const violationsGeometry = selectViolationsGeometry(state);
    if (violationsGeometry && dimension in violationsGeometry) {
      const featuresData = violationsGeometry[dimension];
      const currentViolationGeometry = featuresData.find((feature) => feature.properties.feature_id === featureId);
      return currentViolationGeometry;
    }
  }

  return null;
}

export function selectNearestCameras(state: ReduxState) {
  return selectSemanticsModule(state).nearestCameras;
}

export function selectNearestCamerasData(state: ReduxState) {
  return selectNearestCameras(state)?.data ?? null;
}

export function selectWinterData(state: ReduxState) {
  return selectSemanticsModule(state).winterData;
}

export function selectViolationSource(state: ReduxState) {
  return selectDataFilters(state).violationSource;
}

export const fieldsToShowPercentViolationForASUPR: Record<'fieldToGetCount' | 'fieldToGetTotalCount', keyof TotalViolation> = {
  fieldToGetCount: 'objects_violations_asupr',
  fieldToGetTotalCount: 'amount_objects_asupr',
};

export const selectFieldsToShowPercentViolationForMainLayers = createSelector(
  selectSelectedViolationType,
  selectViolationSource,
  (violationType, violationSource) => {
    let fieldToGetCount: keyof TotalViolation = null;
    let fieldToGetTotalCount: keyof TotalViolation = 'amount_objects';

    if (violationType === 'violations') {
      if (violationSource === AVAILABLE_CONTROL.CITIZEN) {
        fieldToGetCount = 'objects_citizen';
      }
      if (violationSource === AVAILABLE_CONTROL.GOVERNMENT) {
        fieldToGetCount = 'objects_gov';
      } else {
        fieldToGetCount = 'objects_with_violations';
      }
    } else {
      fieldToGetCount = 'violations_sys';
    }

    return {
      fieldToGetCount,
      fieldToGetTotalCount,
    };
  },
);

export const selectFieldsToShowPercentViolation = createSelector(
  selectASUPRSelected,
  selectFieldsToShowPercentViolationForMainLayers,
  (isASUPRSelected, fieldsToShowPercentViolationForMainLayers) => {
    if (isASUPRSelected) {
      return fieldsToShowPercentViolationForASUPR;
    } else {
      return fieldsToShowPercentViolationForMainLayers;
    }
  },
);

export function selectKGHFilter(state: ReduxState) {
  return selectDataFilters(state).kgh;
}

export const selectCheckMayor = (state: ReduxState) => {
  return !selectKGHFilter(state);
};

export const selectDistrictsGeometryByDistrictData = createSelector(
  selectDistrictsData,
  selectDistrictsGeometry,
  (data, districtsGeometry) => {
    const districtsByFeatureId = keyBy(data ?? [], 'featureId');
    return districtsGeometry?.filter((rowData) => {
      return districtsByFeatureId[rowData.properties.feature_id];
    }) ?? [];
  }
);
export const selectHasDistrictsGeometryByDistrictData = (state: ReduxState) => {
  return Boolean(selectDistrictsGeometryByDistrictData(state).length);
};

export const selectLayerViolation = (state: ReduxState) => {
  const selectedViolationType = selectSelectedViolationType(state);
  if (selectedViolationType === ViolationsTypes.violations) {
    return selectLayers(state)[ViolationsTypes.violations];
  }

  return selectLayers(state)[ViolationsTypes.violationsSys];
};

export const selectLayerViolationSelectedLayers = (state: ReduxState) => {
  return selectLayerViolation(state).selectedLayers;
};

export const selectCurrentLevel = (state: ReduxState) => {
  const mapData = selectMapData(state);
  const selectedRegion = selectSelectedRegion(state);
  const selectedDistrict = selectSelectedDistrict(state);

  if (selectedDistrict) {
    return 'violation';
  }
  if (selectedRegion && selectedRegion?.featureId !== mapData.featureId) {
    return 'district';
  }

  return 'region';
};

export const selectLayerAreaRegionsInfo = (state: ReduxState) => {
  return selectLayerViolation(state).infoRegion;
};
export const selectLayerAreaDistrictsInfo = (state: ReduxState) => {
  return selectLayerViolation(state).infoDistrict;
};
export const selectLayerAreViolationInfo = (state: ReduxState) => {
  return selectLayerViolation(state).infoVioaltion;
};

export const selectLayerAreaInfo = (state: ReduxState) => {
  const currentLevel = selectCurrentLevel(state);

  if (currentLevel === 'region') {
    return selectLayerAreaRegionsInfo(state);
  }
  if (currentLevel === 'district') {
    return selectLayerAreaDistrictsInfo(state);
  }
  return selectLayerAreViolationInfo(state);
};

type AnsSelectLayerViolationInfoByFeatureId = Record<GetViolationsResponse['objects'][0]['feature_id'], Pick<GetViolationsResponse['objects'][0], 'feature_id' | 'object_name' | 'total'>>;

export const selectLayerViolationInfoByFeatureId = createSelector(
  selectLayerAreaInfo,
  (info): AnsSelectLayerViolationInfoByFeatureId => {
    if (info) {
      return Object.values(info).reduce(
        (newObj, aliasEl) => {
          aliasEl?.objects?.forEach(
            (areaEl) => {
              const featureId = areaEl.feature_id;

              newObj[featureId] = {
                feature_id: featureId,
                object_name: areaEl.object_name,
                total: summAllProperties(areaEl.total, newObj[featureId]?.total),
              };
            },
          );

          return newObj;
        },
        {},
      );
    }

    return {};
  },
);

export const selectLayerRegionByViolationTypeInfoByFeatureId = createSelector(
  selectLayerViolationSelectedLayers,
  selectLayerAreaRegionsInfo,
  selectASUPRSelected,
  selectASUPRData,
  (selectedLayers, regionInfo, isASUPRSelected, ASUPRData): AnsSelectLayerViolationInfoByFeatureId => {
    const newObj = {};
    if (!isASUPRSelected) {
      if (regionInfo) {
        selectedLayers.forEach(
          (selectedLayerData) => {
              regionInfo[selectedLayerData.alias]?.objects?.forEach(
                (areaEl) => {
                  const { feature_id } = areaEl;

                  newObj[feature_id] = {
                    feature_id,
                    object_name: areaEl.object_name,
                    total: summAllProperties(areaEl.total, newObj[feature_id]?.total),
                  };
                },
              );
          },
        );
      }
    } else {
      ASUPRData?.objects?.forEach(
        (areaEl) => {
          const { feature_id } = areaEl;

          newObj[feature_id] = {
            feature_id,
            object_name: areaEl.object_name,
            total: summAllProperties(areaEl.total, newObj[feature_id]?.total),
          };
        },
      );
    }

    return newObj;
  },
);

export const selectLayerDistrictByViolationTypeInfoByFeatureId = createSelector(
  selectLayerViolationSelectedLayers,
  selectLayerAreaDistrictsInfo,
  selectASUPRSelected,
  selectASUPRData,
  (selectedLayers, districtInfo, isASUPRSelected, ASUPRData): AnsSelectLayerViolationInfoByFeatureId => {
    const newObj = {};
    if (!isASUPRSelected) {
      if (districtInfo) {
        selectedLayers.forEach(
          (selectedLayerData) => {
              districtInfo[selectedLayerData.alias]?.objects?.forEach(
                (areaEl) => {
                  const { feature_id } = areaEl;

                  newObj[feature_id] = {
                    feature_id,
                    object_name: areaEl.object_name,
                    total: summAllProperties(areaEl.total, newObj[feature_id]?.total),
                  };
                },
              );
          },
        );
      }
    } else {
      ASUPRData?.objects?.forEach(
        (areaEl) => {
          const { feature_id } = areaEl;

          newObj[feature_id] = {
            feature_id,
            object_name: areaEl.object_name,
            total: summAllProperties(areaEl.total, newObj[feature_id]?.total),
          };
        },
      );
    }

    return newObj;
  },
);

export const selectLayerViolationByViolationTypeInfoByFeatureId = createSelector(
  selectLayerViolationSelectedLayers,
  selectLayerAreaInfo,
  selectASUPRSelected,
  selectASUPRData,
  (selectedLayers, info, isASUPRSelected, ASUPRData): AnsSelectLayerViolationInfoByFeatureId => {
    const newObj = {};
    if (!isASUPRSelected) {
      if (info) {
        selectedLayers.forEach(
          (selectedLayerData) => {
              info[selectedLayerData.alias]?.objects?.forEach(
                (areaEl) => {
                  const { feature_id } = areaEl;

                  newObj[feature_id] = {
                    feature_id,
                    object_name: areaEl.object_name,
                    total: summAllProperties(areaEl.total, newObj[feature_id]?.total),
                  };
                },
              );
          },
        );
      }
    } else {
      ASUPRData?.objects?.forEach(
        (areaEl) => {
          const { feature_id } = areaEl;

          newObj[feature_id] = {
            feature_id,
            object_name: areaEl.object_name,
            total: summAllProperties(areaEl.total, newObj[feature_id]?.total),
          };
        },
      );
    }

    return newObj;
  },
);

export const selectLayerViolationInfoByFeatureIdArr = createSelector(
  selectLayerViolationInfoByFeatureId,
  (infoByFeatureId) => {
    return Object.values(infoByFeatureId);
  },
);

/////

export const selectCurrentMapLevel = createSelector(
  selectModuleSidebarRegions,
  selectModuleSidebarDistricts,
  (regions, districts) => {
    if (!regions.length && !districts.length) {
      return MAP_LEVEL.CITY;
    }

    if (regions.length && !districts.length) {
      return MAP_LEVEL.REGION;
    }

    if (regions.length && districts.length) {
      return MAP_LEVEL.DISTRICT;
    }
  }
);

export const selectIsCurrentLevelIsCity = createSelector(
  selectCurrentMapLevel,
  (currentLevel) => currentLevel === MAP_LEVEL.CITY,
);

export const isCurrentLevelIsRegion = createSelector(
  selectCurrentMapLevel,
  (currentLevel) => currentLevel === MAP_LEVEL.REGION
);

export const isCurrentLevelIsDistrict = createSelector(
  selectCurrentMapLevel,
  (currentLevel) => currentLevel === MAP_LEVEL.DISTRICT
);

export const selectIncidents = (state: ReduxState) => {
  return selectSemanticsModule(state).incidents;
};

export const selectCityIncidents = (state: ReduxState) => {
  return selectIncidents(state).city;
};

export const selectCityIncidentsIndexes = createSelector(
  selectCityIncidents,
  (data) => {
    let result: Record<string, LayerObjectDTO>  = {};
    if (data?.length) {
      result = keyBy(data, 'regionId');
    }
    return result;
  }
);

export const selectRegionIncidents = (state: ReduxState) => {
  return selectIncidents(state).region;
};

export const selectRegionIncidentsIndexes = createSelector(
  selectRegionIncidents,
  (data) => {
    let result: Record<string, LayerObjectDTO>  = {};
    if (data?.length) {
      result = keyBy(data, 'districtId');
    }
    return result;
  }
);

export const selectDistrictIncidents = (state: ReduxState) => {
  return selectIncidents(state).district;
};

export const selectDistrictIncidentsIndexes = createSelector(
  selectDistrictIncidents,
  (data) => {
    let result: Record<string, LayerObjectDTO>  = {};
    if (data?.length) {
      result = keyBy(data, 'featureId');
    }
    return result;
  }
);

export const selectMapLayersData = selectDashboardObjectWidget;

const selectUniqLegendForViolationsByColor = createSelector(
  selectLegendForViolationsBySource,
  selectUser,
  selectModuleSidebarSeason,
  selectCheckMayor,
  (legendForViolations, user, appMode, checkMayor) => {
    return getLengendByPermission(
      uniqBy(legendForViolations, 'color'),
      user,
      appMode,
      checkMayor,
    );
  },
);

export const selectKeyByLegendForCarsByColor = createSelector(
  selectCarsLegend,
  (legend) => {
    return keyBy(legend, 'color');
  },
);

export const selectUniqLegendForCarsByColor = createSelector(
  selectCarsLegend,
  (legend) => {
    return uniqBy(legend, 'color');
  },
);

const selectUniqLegendForDistrictsByColor = createSelector(
  selectLegendForDistricts,
  (legend) => {
    return uniqBy(legend, 'color');
  },
);

export const selectLegendUniqByColor = createSelector(
  isCurrentLevelIsDistrict,
  selectUniqLegendForViolationsByColor,
  selectUniqLegendForDistrictsByColor,
  selectShowCars,
  selectUniqLegendForCarsByColor,
  (showAllViolation, uniqLegendForViolationsByColor, uniqLegendForDistrictsByColor, showCars, uniqCarLegend) => {
    if (showCars) {
      return uniqCarLegend;
    }
    if (showAllViolation) {
      return uniqLegendForViolationsByColor;
    }

    return uniqLegendForDistrictsByColor;
  },
);
