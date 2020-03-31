import {
  fork,
  takeLatest,
  call,
  put,
  putResolve,
  select,
  takeEvery,
} from 'redux-saga/effects';
import { notification } from 'antd';

import SEMANTICS_TYPES from 'app/store/modules/semantics/action_types';
import { getSeasonQueryObject } from 'app/store/modules/semantics/utils';
import { ViolationsTypes } from '@next/ui/atoms/map/types';
import { ALIASES } from 'app/store/modules/semantics/constants';
import createEffect from 'app/store/promise_middleware/create_effect';
import { selectCameraRadius } from 'app/store/modules/map/selectors';
import { LayerType } from 'containers/layers/types';
import { getAllViolationsSimple, getAllViolationsByDimensionAndFilter } from 'app/api/violations';
import { clearViolationsGeometry } from 'app/store/modules/map/actions';

import {
  initialDistricts,
} from 'app/store/modules/semantics/initialState';
import {
  getFormattedUtcDateTimeStandart,
  getFormattedDashDate,
} from '@next/utils/dates';
import {
  Camera,
  UrlMap,
  LayersState,
} from './types';
import {
  ViolationSource, RestResult,
} from 'app/types';
import {
  FeatureAliases,
  GetViolationsParams,
  EchdNearCameraResponse,
} from 'app/api/types';
import {
  // getLayersData,
  getSnowInfo,
  loadSystemTypes,
  loadLegend,
  getLayersData,
} from 'app/api';
import {
  changeSelectedObject,
  getASUPRData,
  updateKey,
  changeSelectedSystemTypes,
  changeSelectedViolationType,
  getRegions,
  getDistricts,
  // getLayerNames,
  changeSelectedRegion,
  changeSelectedDistrict,
  hideNearestCamera,
  setKey,
  refreshSelectedDistrict,
  setASUPRSelected,
  getWinterData,
  getSystemTypes,
  initialRegionsMapData,
  changeViolationSource,
  getLegend,
  showNearestCamera,
  getAreaInfoByRegion,
  changeSelectedLayers,
  getAreaViolationInfoByDistrict,
  getLayerNames,
} from 'app/store/modules/semantics/actions';

import {
  selectSelectedViolationType,
  selectASUPR,
  selectSystemTypesForViolationSource,
  selectSelectedObject,
  selectASUPRData,
  // selectLayers,
  // selectViolations,
  // selectViolationsSys,
  selectLayerAreViolationInfo,
} from 'app/store/modules/semantics/selectors';
import {
  loadRegions,
  loadDistricts,
} from 'app/api/features';
import {
  selectUser,
  selectMapData,
} from 'app/store/modules/app/selectors';
import { loadNearbyCameras } from 'app/api/camera';
import { getCenterText } from '@next/ui/organisms/RegionOverlays/utils';

import IncidentsEffects from './incidentsEffects';
import { changeSelectedDistricts, changeSelectedRegions } from 'app/store/modules/sidebar/actions';
import { asyncArrayMap } from 'containers/layers/ViolationsLayer/utils';

const violationSource = {
  [ViolationsTypes.violations]: ViolationSource.ASUPR,
  [ViolationsTypes.violationsSys]: ViolationSource.SYS,
};

export const checkMkd = (dimension: string) => {
  if(dimension === 'mkdASUPR'){
    return {
      dimension: 'mkd' as LayerType,
      violationSource: ViolationSource.ASUPR,
    };
  } else {
    return {
      dimension: dimension as LayerType,
      violationSource: null
    };
  }
};

function* onGetRegionsEffect({ payload }: ReturnType<typeof getRegions>) {
  const response: ThenArg<ReturnType<typeof loadRegions>> = yield call(loadRegions);

  const region = response[0];

  if (region?.attributes) {
    // бардак
    const data = response.map((d) => ({
      name: d.properties.object,
      shortName: d.properties.object_abbreviation,
      object_code: d.properties.object_code,
      featureId: d.properties.feature_id,
      centroid: d.properties.centroid,
      filterCode: d.properties.object_abbreviation,
      objectId: d.properties.object_id,
      layerId: d.layer_id,
      revisionId: d.revision_id,
    }));

    yield putResolve(updateKey(
      'regions',
      {
        layerId: region.layer_id,
        revisionId: region.revision_id,
        aliasId: region.attributes.object_alias,
        data: data.map((rowData) => ({
          ...rowData,
          centroid: {
            ...rowData.centroid,
            coordinates: getCenterText(rowData),
          },
        })),
      },
    ));
  }
}

function* onGetDistrictsEffect({ payload }: ReturnType<typeof getDistricts>) {
  const selectedRegionData = payload.selectedRegionData;
  const regionName = selectedRegionData?.name;

  const response: ThenArg<ReturnType<typeof loadDistricts>> = yield call(loadDistricts, regionName);

  const district = response[0];
  if (district?.attributes) {
    const data = response.map((d) => ({
      name: d.properties.object,
      shortName: d.properties.object_abbreviation,
      featureId: d.properties.feature_id,
      centroid: d.properties.centroid,
      objectId: d.properties.object_id,
      objectCode: d.properties.object_code, // код района
      parentCode: d.properties.parent_code, // код округа
    }));

    yield put(updateKey(
      'districts',
      {
        layerId: district.layer_id,
        revisionId: district.revision_id,
        filterAttributeId: district.attributes.parent_abbr,
        aliasId: district.attributes.object_abbr,
        data,
        parentRegion: selectedRegionData,
      },
    ));
  }
}

function* onGetLayerNamesEffect({ payload }: ReturnType<typeof getLayerNames>) {
  yield put(updateKey(
    'layers',
    {
      isLoading: true,
    },
  ));
  const response: ThenArg<ReturnType<typeof getLayersData>> = yield call(getLayersData);
  if (response) {

    yield put(updateKey(
      'layers',
      {
        isLoading: false,
        data: response
      },
    ));
  }
}

function* onChangeSelectedRegionEffect({ payload }: ReturnType<typeof changeSelectedRegion>) {
  yield put(changeSelectedObject(null));
  yield put(clearViolationsGeometry());

  let selectedRegion = payload.selectedRegionData || null;

  yield put(updateKey('regions', { isLoading: true }));

  if (selectedRegion) {
    yield put(changeSelectedDistricts([]));
    yield put(changeSelectedRegions([{ type: selectedRegion.featureId, description: selectedRegion.shortName}]));
  } else {
    yield put(changeSelectedDistricts([]));
    yield put(changeSelectedRegions([]));
  }
}

function* onChangeSelectedDistrictEffect({ payload }: ReturnType<typeof changeSelectedDistrict>) {
  yield put(changeSelectedObject(null));
  yield put(hideNearestCamera());
  yield put(clearViolationsGeometry());

  const selectedDistrict = payload.selectedDistrictData;

  if (selectedDistrict) {
    yield put(changeSelectedDistricts([{ type: selectedDistrict.featureId, description: selectedDistrict.name }]));
  } else {
    yield put(updateKey('districts', { ...initialDistricts }));
    yield put(changeSelectedDistricts([]));
  }
}

function* onRefreshSelectedDistrictEffect({ payload }: ReturnType<typeof refreshSelectedDistrict>) {
  yield put(changeSelectedDistricts([]));
  yield put(changeSelectedObject(null));
}

function* onChangeSelectedObjectEffect({ payload }: ReturnType<typeof changeSelectedObject>) {
  const lastSelectedObject = yield select(selectSelectedObject);
  if (payload || lastSelectedObject) {
    yield put(setKey('selectedObject', payload.selectedObject ));
  }
}

function* onGetLegendEfect({ payload }: ReturnType<typeof getLegend>) {
  const { alias, season, type } = payload;

  const response: ThenArg<ReturnType<typeof loadLegend>> = yield call(loadLegend, alias, season);

  if (response) {
    yield put(updateKey('legend', { [type]: response }));
  }
}

function* onShowNearestCameraEffect({ payload: coordinatesArray }: ReturnType<typeof showNearestCamera>) {

  const cameraRadius = Number(yield select(selectCameraRadius));

  const responseArray: ThenArg<ReturnType<typeof loadNearbyCameras>> = yield asyncArrayMap(
    coordinatesArray,
    (item) => loadNearbyCameras(item.lng, item.lat, item.trash, cameraRadius)
  );

  const notEmptyArray = (responseArray as RestResult<EchdNearCameraResponse>[]).filter(response => {
    if (response?.data && response.code === 'SUCCESS') {
      const { cameras }: { lng: string; lat: string; cameras: Camera[]; mappingUrl: UrlMap[] } = response.data;
      return cameras.length;
    }
  });

  if (notEmptyArray.length === 0) {
    notification.warn({
      message: 'Камер поблизости не обнаружено',
      duration: 2.5,
    });
    return;
  }

  const result: {
    cameras: Camera[];
    mappingUrl: UrlMap[];
  } = notEmptyArray.reduce((acc, item) => ({
    cameras: acc.cameras.concat(item.data.cameras),
    mappingUrl: acc.mappingUrl.concat(item.data.mappingUrl),
  }), {cameras: [], mappingUrl: []});

  yield put(updateKey(
    'nearestCameras',
    {
      data: result.cameras,
      mappingUrl: result.mappingUrl,
      // lng,
      // lat,
    },
  ));

  // (responseArray as RestResult<EchdNearCameraResponse>[]).forEach(response => {
  //   if (response?.data && response.code === 'SUCCESS') {
  //     const { cameras, mappingUrl }: { lng: string; lat: string; cameras: Camera[]; mappingUrl: UrlMap[] } = response.data;
  //     if (cameras.length === 0) {
  //       notification.warn({
  //         message: 'Камер поблизости не обнаружено',
  //         duration: 2.5,
  //       });
  //       return;
  //     }
  //   }
  // });
  // yield put(updateKey(
  //   'nearestCameras',
  //   {
  //     data: cameras,
  //     mappingUrl,
  //     // lng,
  //     // lat,
  //   },
  // ));

}

function* onGetWinterDataEffect({ payload }: ReturnType<typeof getWinterData>) {
  const response: ThenArg<ReturnType<typeof getSnowInfo>> = yield call(
    getSnowInfo,
    payload.dimension,
    payload.featureId,
    {
      date: getFormattedDashDate(payload.date),
    }
  );

  yield put(updateKey('winterData', response.data));
}

function* onSetASUPRSelectedEfect({ payload }: ReturnType<typeof setASUPRSelected>) {
  const ASUPRData: ReturnType<typeof selectASUPRData>  = yield select(selectASUPRData);
  const isASUPRSelected = payload.isASUPRSelected;

  yield putResolve(updateKey<'layers'>('layers', { ASUPR: { data: ASUPRData, isSelected: isASUPRSelected} }));
}

function* onInitialRegionsMapDataEffect({ payload }: ReturnType<typeof initialRegionsMapData>) {
  yield putResolve(getLayerNames());
  yield putResolve(getRegions());

  return 1;
}

function* onLoadSystemTypeEffect({ payload }: ReturnType<typeof getSystemTypes>) {
  const systemTypes: ThenArg<ReturnType<typeof loadSystemTypes>> = yield call(loadSystemTypes);
  yield putResolve(setKey('systemTypes', systemTypes.data));

  const systemTypesByViolationSource: ReturnType<typeof selectSystemTypesForViolationSource> = yield select(selectSystemTypesForViolationSource);
  yield put(changeSelectedSystemTypes(
    systemTypesByViolationSource.map((rowData) => rowData.value),
  ));
}

function* onChangeViolationSourceEffect({ payload }: ReturnType<typeof changeViolationSource>) {
  yield putResolve(updateKey<'dataFilters'>('dataFilters', { violationSource: payload.violationSource }));

  const systemTypesByViolationSource: ReturnType<typeof selectSystemTypesForViolationSource> = yield select(selectSystemTypesForViolationSource);
  yield put(changeSelectedSystemTypes(
    systemTypesByViolationSource.map((rowData) => rowData.value),
  ));
}

function* onChangeSelectedViolationTypeEffect({ payload }: ReturnType<typeof changeSelectedViolationType>) {
  const selectedTab = payload.selectedTab;
  yield putResolve(updateKey<'layers'>('layers', { selectedTab }));

  if (selectedTab === ViolationsTypes.violations) {
    const systemTypesByViolationSource: ReturnType<typeof selectSystemTypesForViolationSource> = yield select(selectSystemTypesForViolationSource);
    yield put(changeSelectedSystemTypes(
      systemTypesByViolationSource.map((rowData) => rowData.value),
    ));
  } else {
    yield put(changeSelectedSystemTypes([]));
  }
}

function* onGetASUPRDataEffect({ payload }: ReturnType<typeof getASUPRData>) {
  const violationType: ReturnType<typeof selectSelectedViolationType> = yield select(selectSelectedViolationType);

  if (violationType === ViolationsTypes.violations) {
    const mapData: ReturnType<typeof selectMapData> = yield select(selectMapData);
    const user: ReturnType<typeof selectUser> = yield select(selectUser);
    const params: GetViolationsParams = {
      ...getSeasonQueryObject(user, payload.appMode, payload.checkMayor),
      startDate: getFormattedUtcDateTimeStandart(payload.date, { utc: true }),
      endDate: getFormattedUtcDateTimeStandart(payload.date, { utc: true }),
      violationSource: violationSource[violationType],
    };

    let result = null;

    if ('selectedRegion' in payload) {
      const selectedFeatureId = payload.selectedRegion.featureId;
      const parentCode = payload.selectedRegion.object_code;

      const alias = selectedFeatureId === mapData.featureId ? 'regions' : 'districts';
      const path = ALIASES[alias];

      result = yield call(
        getAllViolationsSimple,
        ['mkd'],
        path,
        parentCode,
        params,
      );
    } else if ('selectedDisctrict' in payload) {
      const selectedFeatureId = payload.selectedDisctrict.featureId;
      const path = FeatureAliases.DISTRICT;

      result = yield call(
        getAllViolationsByDimensionAndFilter,
        ['mkd'],
        path,
        'district_id',
        selectedFeatureId,
        params,
      );
    }

    const ASUPR = yield select(selectASUPR);
    yield put(updateKey('layers', { ASUPR: { ...ASUPR, data: result?.['mkd'] ?? null } }));
  } else {
    const ASUPR = yield select(selectASUPR);
    yield put(updateKey('layers', { ASUPR: { ...ASUPR, isSelected: false, data: null } }));
  }
}

function* onGetAreaInfoByRegionEffect({ payload }: ReturnType<typeof getAreaInfoByRegion>) {
  const mapData: ReturnType<typeof selectMapData> = yield select(selectMapData);
  const selectedFeatureId = payload.selectedRegion.featureId;
  const parentCode = payload.selectedRegion.object_code;

  const alias = selectedFeatureId === mapData.featureId ? 'regions' : 'districts';
  const user: ReturnType<typeof selectUser> = yield select(selectUser);

  const path = ALIASES[alias];
  const date = getFormattedUtcDateTimeStandart(payload.date, { utc: true });

  const params: GetViolationsParams = {
    ...getSeasonQueryObject(user, payload.appMode, payload.checkMayor),
    startDate: date,
    endDate: date,
  };

  const violationSourceSystem = payload.selectedSystemTypes.toString();
  if (violationSourceSystem) {
    params.violationSourceSystem = violationSourceSystem;
  }

  if (payload.selectedTab === ViolationsTypes.violationsSys) {
    params.violationSource = ViolationSource.SYS;
    delete params.violationSourceSystem;
  }

  if (payload.selectedTab === ViolationsTypes.violations) {
    yield put(
      getASUPRData(
        {
          selectedRegion: payload.selectedRegion,
          date: payload.date,
          appMode: payload.appMode,
          checkMayor: payload.checkMayor,
        },
      ),
    );
  }
  const nameInfo: keyof LayersState['violations'] = alias === 'regions' ? 'infoRegion' : 'infoDistrict';

  yield put(changeSelectedLayers(payload.selectedTab, { [nameInfo]: null, isLoading: true }));
  const result: ThenArg<ReturnType<typeof getAllViolationsSimple>> = yield call(
    getAllViolationsSimple,
    payload.layerNames.map((layerData) => layerData.alias),
    path,
    parentCode,
    params,
  );
  yield put(changeSelectedLayers(payload.selectedTab, { [nameInfo]: result, isLoading: false }));
}

function* onGetAreaViolationInfoByDistrictEffect({ payload }: ReturnType<typeof getAreaViolationInfoByDistrict>) {
  const user: ReturnType<typeof selectUser> = yield select(selectUser);
  const featureId = payload.selectedDisctrict.featureId;

  const path = FeatureAliases.DISTRICT;
  const date = getFormattedUtcDateTimeStandart(payload.date, { utc: true });

  const params: GetViolationsParams = {
    ...getSeasonQueryObject(user, payload.appMode, payload.checkMayor),
    startDate: date,
    endDate: date,
  };

  const violationSourceSystem = payload.selectedSystemTypes.toString();
  if (violationSourceSystem) {
    params.violationSourceSystem = violationSourceSystem;
  }

  if (payload.selectedTab === ViolationsTypes.violationsSys) {
    params.violationSource = ViolationSource.SYS;
    delete params.violationSourceSystem;
  }

  if (payload.layerName.alias === 'mkd' && payload.selectedTab === ViolationsTypes.violations) {
    yield put(
      getASUPRData(
        {
          selectedDisctrict: payload.selectedDisctrict,
          date: payload.date,
          appMode: payload.appMode,
          checkMayor: payload.checkMayor,
        },
      ),
    );
  }

  const result: ThenArg<ReturnType<typeof getAllViolationsByDimensionAndFilter>> = yield call(
    getAllViolationsByDimensionAndFilter,
    [payload.layerName.alias],
    path,
    'district_id',
    featureId,
    params,
  );

  const infoVioaltionOldOld = yield select(selectLayerAreViolationInfo);
  yield put(changeSelectedLayers(payload.selectedTab, { infoVioaltion: {...(infoVioaltionOldOld ?? {}), ...result } }));
}

// function* onChangeSelectedLayersEffect({ payload }: ReturnType<typeof changeSelectedLayers>) {
//   const layer = yield select(selectLayers);

//   yield put(
//     updateKey<'layers'>(
//       'layers',
//       {
//         [payload.key]: {
//           ...layer[payload.key],
//           ...payload.params,
//         },
//       },
//     ),
//   );
// }

/* ------------------------------------------------------------- */
function* onGetAreaInfoByRegionWatcher() {
  yield fork(
    createEffect(
      SEMANTICS_TYPES.getAreaInfoByRegion,
      takeEvery,
      onGetAreaInfoByRegionEffect,
    )
  );
}

function* oGetAreaViolationInfoByDistrictWatcher() {
  yield fork(
    createEffect(
      SEMANTICS_TYPES.getAreaViolationInfoByDistrict,
      takeEvery,
      onGetAreaViolationInfoByDistrictEffect,
    )
  );
}

// function* onChangeSelectedLayersWatcher() {
//   yield fork(
//     createEffect(
//       SEMANTICS_TYPES.changeSelectedLayers,
//       takeLatest,
//       onChangeSelectedLayersEffect
//     )
//   );
// }

const onGetRegionsWatcher = createEffect(
  SEMANTICS_TYPES.getRegions,
  takeLatest,
  onGetRegionsEffect
);

const onGetDistrictsWatcher = createEffect(
  SEMANTICS_TYPES.getDistricts,
  takeLatest,
  onGetDistrictsEffect
);

const onGetLayerNamesWatcher = createEffect(
  SEMANTICS_TYPES.getLayerNames,
  takeLatest,
  onGetLayerNamesEffect
);

const onChangeSelectedRegionEffectWatcher = createEffect(
  SEMANTICS_TYPES.changeSelectedRegion,
  takeLatest,
  onChangeSelectedRegionEffect
);

const onChangeSelectedDistrictWatcher = createEffect(
  SEMANTICS_TYPES.changeSelectedDistrict,
  takeLatest,
  onChangeSelectedDistrictEffect
);

const onRefreshSelectedDistrictWatcher = createEffect(
  SEMANTICS_TYPES.refreshSelectedDistrict,
  takeLatest,
  onRefreshSelectedDistrictEffect
);

const onChangeSelectedObjectWatcher = createEffect(
  SEMANTICS_TYPES.changeSelectedObject,
  takeLatest,
  onChangeSelectedObjectEffect
);

const onGetLegendWatcher = createEffect(
  SEMANTICS_TYPES.getLegend,
  takeEvery,
  onGetLegendEfect
);

const onShowNearestCameraWatcher = createEffect(
  SEMANTICS_TYPES.showNearestCamera,
  takeLatest,
  onShowNearestCameraEffect
);

const onGetWinterDataWatcher = createEffect(
  SEMANTICS_TYPES.getWinterData,
  takeLatest,
  onGetWinterDataEffect
);

const onSetASUPRSelectedWatcher = createEffect(
  SEMANTICS_TYPES.setASUPRSelected,
  takeLatest,
  onSetASUPRSelectedEfect
);

const onInitialRegionsMapDataWatcher = createEffect(
  SEMANTICS_TYPES.initialRegionsMapData,
  takeLatest,
  onInitialRegionsMapDataEffect,
);

const onLoadSystemTypeWatcher = createEffect(
  SEMANTICS_TYPES.getSystemTypes,
  takeLatest,
  onLoadSystemTypeEffect,
);

const onChangeViolationSourceWatcher = createEffect(
  SEMANTICS_TYPES.changeViolationSource,
  takeLatest,
  onChangeViolationSourceEffect,
);

const onChangeSelectedViolationTypeWatcher = createEffect(
  SEMANTICS_TYPES.changeSelectedViolationType,
  takeLatest,
  onChangeSelectedViolationTypeEffect,
);

const onGetASUPRDAta = createEffect(
  SEMANTICS_TYPES.getASUPRData,
  takeLatest,
  onGetASUPRDataEffect,
);

// список на прослушивание
const SemanticsEffects = [
  fork(onGetRegionsWatcher),
  fork(onGetDistrictsWatcher),
  fork(onGetLayerNamesWatcher),
  fork(onChangeSelectedRegionEffectWatcher),
  fork(onChangeSelectedDistrictWatcher),
  fork(onRefreshSelectedDistrictWatcher),
  fork(onChangeSelectedObjectWatcher),
  fork(onGetLegendWatcher),
  fork(onShowNearestCameraWatcher),
  fork(onGetWinterDataWatcher),
  fork(onSetASUPRSelectedWatcher),
  fork(onInitialRegionsMapDataWatcher),
  fork(onLoadSystemTypeWatcher),
  fork(onChangeViolationSourceWatcher),
  fork(onChangeSelectedViolationTypeWatcher),
  fork(onGetASUPRDAta),

  fork(onGetAreaInfoByRegionWatcher),
  fork(oGetAreaViolationInfoByDistrictWatcher),
  // fork(onChangeSelectedLayersWatcher),
  ...IncidentsEffects,
];

export default SemanticsEffects;
