import { factoryAction } from 'app/store/createReducer';

const SEMANTICS = factoryAction('SEMANTICS');

// type для экшена
const update = SEMANTICS('update');
const updateKey = SEMANTICS('updateKey');
const setKey = SEMANTICS('setKey');
const refresh = SEMANTICS('refresh');

const getRegions = SEMANTICS('getRegions');
const getDistricts = SEMANTICS('getDistricts');
const changeSelectedDistrict = SEMANTICS('changeSelectedDistrict');
const changeSelectedRegion = SEMANTICS('changeSelectedRegion');
const initialRegionsMapData = SEMANTICS('initialRegionsMapData');
const getLayerNames = SEMANTICS('getLayerNames');
const refreshSemantics = SEMANTICS('refreshSemantics');
const refreshSelectedDistrict = SEMANTICS('refreshSelectedDistrict');
const changeSelectedObject = SEMANTICS('changeSelectedObject');
const getLegend = SEMANTICS('getLegend');
const showNearestCamera = SEMANTICS('showNearestCamera');
const getWinterData = SEMANTICS('getWinterData');
const setASUPRSelected = SEMANTICS('setASUPRSelected');
const getSystemTypes = SEMANTICS('getSystemTypes');
const changeViolationSource = SEMANTICS('changeViolationSource');
const changeSelectedSystemTypes = SEMANTICS('changeSelectedSystemTypes');
const changeSelectedViolationType = SEMANTICS('changeSelectedViolationType');
const changeKGHFilter = SEMANTICS('changeKGHFilter');
const getASUPRData = SEMANTICS('getASUPRData');
const getAreaInfoByRegion = SEMANTICS('getAreaInfoByRegion');
const getAreaViolationInfoByDistrict = SEMANTICS('getAreaViolationInfoByDistrict');

const changeSelectedLayers = SEMANTICS('changeSelectedLayers');

//new api
const changeCityIncidents = SEMANTICS('changeCityIncidents');
const changeRegionIncidents = SEMANTICS('changeRegionIncidents');
const changeDistrictIncidents = SEMANTICS('changeDistrictIncidents');

const getIncidents = SEMANTICS('getIncidents');

const SEMANTICS_TYPES = {
  update,
  updateKey,
  setKey,
  refresh,
  getRegions,
  getDistricts,
  changeSelectedDistrict,
  changeSelectedRegion,
  initialRegionsMapData,
  getLayerNames,
  refreshSelectedDistrict,
  changeSelectedObject,
  getLegend,
  showNearestCamera,
  getWinterData,
  setASUPRSelected,
  refreshSemantics,
  getSystemTypes,
  changeViolationSource,
  changeSelectedSystemTypes,
  changeSelectedViolationType,
  changeKGHFilter,
  getASUPRData,
  getAreaInfoByRegion,
  getAreaViolationInfoByDistrict,

  changeSelectedLayers,

  changeCityIncidents,
  changeRegionIncidents,
  changeDistrictIncidents,
  getIncidents
};

export default SEMANTICS_TYPES;
