
import { fork, select, call, put, takeLatest, takeEvery } from 'redux-saga/effects';

import MAP_TYPES from 'app/store/modules/map/action_types';
import createEffect from 'app/store/promise_middleware/create_effect';
import { getViolationsGeometryByDistrict, getRegionsGeometry, getDistrictsGeometryByRegion, setRegionGeometry, setDistrictsGeometry, setViolationsGeometry } from 'app/store/modules/map/actions';
import { selectDistrictsGeometry, selectViolationsGeometry, selectRegionsGeometryIndex, selectDistrictsGeometryIndex } from 'app/store/modules/map/selectors';
import { genILIKEFilter, genEQUALSFilter } from 'app/lib/wfs';
import { getFeaturesWfs } from 'app/api/wfs';
import { DashboardFeature } from 'app/store/modules/map/types';

function* onGetRegionsGeometryEffect({ payload }: ReturnType<typeof getRegionsGeometry>) {
  const geometryRegionIndexOld = yield select(selectRegionsGeometryIndex);

  const regionsGeometryData: ThenArg<ReturnType<typeof getFeaturesWfs>> = yield call(
    getFeaturesWfs,
    payload.layerId,
    payload.revisionId,
  );

  const geometryData: DashboardFeature[] = regionsGeometryData.data.features;

  const isChanged = geometryData.some((dashboardFeature) => {
    const dashboardFeatureOld = geometryRegionIndexOld[dashboardFeature.properties.feature_id];
    if (!dashboardFeatureOld) {
      return true;
    }

    const {
      id: lessId,
      ...dashboardFeatureOther
    } = dashboardFeature;

    const {
      id: lessOldId,
      ...dashboardFeatureOldOther
    } = dashboardFeatureOld;

    return (
      !dashboardFeatureOld
      || JSON.stringify(dashboardFeatureOldOther) !== JSON.stringify(dashboardFeatureOther)
    );
  });

  if (isChanged) {
    yield put(
      setRegionGeometry(geometryData),
    );
  }
}

function* onGetDistrictsGeometryByRegionEffect({ payload }: ReturnType<typeof getDistrictsGeometryByRegion>) {
  const geometryDistrictsOld = yield select(selectDistrictsGeometry);
  const geometryDistrictsIndexOld = yield select(selectDistrictsGeometryIndex);
  
  const districtsGeometryData: ThenArg<ReturnType<typeof getFeaturesWfs>> = yield call(getFeaturesWfs,
    payload.layerId,
    payload.revisionId,
    { filter: `(${genILIKEFilter(payload.filterAttributeId, payload.parentRegionFilterCode)})` },
  );

  const geometryData: DashboardFeature[] = districtsGeometryData.data.features;
  const isChanged = geometryData.some((dashboardFeature) => {
    const dashboardFeatureOld = geometryDistrictsIndexOld[dashboardFeature.properties.feature_id];
    if (!dashboardFeatureOld) {
      return true;
    }

    const {
      id: lessId,
      ...dashboardFeatureOther
    } = dashboardFeature;

    const {
      id: lessOldId,
      ...dashboardFeatureOldOther
    } = dashboardFeatureOld;

    return (
      !dashboardFeatureOld
      || JSON.stringify(dashboardFeatureOldOther) !== JSON.stringify(dashboardFeatureOther)
    );
  });

  if (isChanged) {
    const geometryDatafeatureIdSet = new Set(geometryData.map((rowData) => rowData.properties.feature_id));

    const filtredGeometry = geometryDistrictsOld.filter((dashboardFeature) => (
      !geometryDatafeatureIdSet.has(dashboardFeature.properties.feature_id)
    ));

    yield put(
      setDistrictsGeometry(
        [
          ...filtredGeometry,
          ...geometryData,
        ]
      ),
    );
  }
}

function* onGetViolationsGeometryByDistrictEffect({ payload }: ReturnType<typeof getViolationsGeometryByDistrict>) {
  const layer = payload.layer;

  const violationData: ThenArg<ReturnType<typeof getFeaturesWfs>> = yield call(
    getFeaturesWfs,
    layer.layer_id,
    layer.revision.revision_id,
    { filter: `(${genEQUALSFilter('district_id', payload.selectedDistrictFeatureId)})` },
    { page: 0, size: 100000}
  );
  const currentViolationsGeometry: ReturnType<typeof selectViolationsGeometry> = yield select(selectViolationsGeometry);

  yield put(setViolationsGeometry({
    ...currentViolationsGeometry,
    [layer.alias]: violationData.data.features,
  }));
}

const onGetRegionsGeometryWatcher = createEffect(
  MAP_TYPES.getRegionsGeometry,
  takeLatest,
  onGetRegionsGeometryEffect
);
const onGetDistrictsGeometryByRegionWatcher = createEffect(
  MAP_TYPES.getDistrictsGeometryByRegion,
  takeLatest,
  onGetDistrictsGeometryByRegionEffect
);
const onGetViolationsGeometryByDistrictWatcher = createEffect(
  MAP_TYPES.getViolationsGeometryByDistrict,
  takeEvery,
  onGetViolationsGeometryByDistrictEffect
);

// список на прослушивание
const MapEffects = [
  fork(onGetRegionsGeometryWatcher),
  fork(onGetDistrictsGeometryByRegionWatcher),
  fork(onGetViolationsGeometryByDistrictWatcher),
];

export default MapEffects;
