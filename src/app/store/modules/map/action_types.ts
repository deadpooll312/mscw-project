import { factoryAction } from 'app/store/createReducer';

const MAP = factoryAction('MAP');

// type для экшена
const setRegionGeometry = MAP('setRegionGeometry');
const setDistrictsGeometry = MAP('setDistrictsGeometry');
const setViolationsGeometry = MAP('setViolationsGeometry');

const getRegionsGeometry = MAP('getRegionsGeometry');
const getDistrictsGeometryByRegion = MAP('getDistrictsGeometryByRegion');
const getViolationsGeometryByDistrict = MAP('getViolationsGeometryByDistrict');
const setPointMode = MAP('setPointMode');
const setCameraSettings = MAP('setCameraSettings');

const MAP_TYPES = {
  setRegionGeometry,
  setDistrictsGeometry,
  setViolationsGeometry,
  getRegionsGeometry,
  getDistrictsGeometryByRegion,
  getViolationsGeometryByDistrict,
  setPointMode,
  setCameraSettings
};

export default MAP_TYPES;
