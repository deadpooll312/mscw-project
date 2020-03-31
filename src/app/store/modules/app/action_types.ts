import { factoryAction } from 'app/store/createReducer';

const APP = factoryAction('APP');

// type для экшена
const set = APP('set');
const update = APP('update');
const fetchBasemaps = APP('fetchBasemaps');
const login = APP('login');
const logout = APP('logout');
const logoutBySessionExpired = APP('logoutBySessionExpired');
const checkAuth = APP('checkAuth');
const updateCredentials = APP('updateCredentials');
const fetchPasswordSettings = APP('fetchPasswordSettings');
const changeSidebarTab = APP('changeSidebarTab');
const applySettings = APP('applySettings');
const setBreakpoint = APP('setBreakpoint');
const loginSaga = APP('loginSaga');
const logoutSaga = APP('logoutSaga');
const logoutBySessionExpiredSaga = APP('logoutBySessionExpiredSaga');
const refreshStateOnLogout = APP('refreshStateOnLogout');
const checkSaga = APP('checkSaga');
const updateCredentialsSaga = APP('updateCredentialsSaga');
const changeIsSidebarOpen = APP('changeIsSidebarOpen');
const downloadInstruction = APP('downloadInstruction');
const loadCityData = APP('loadCityData');
const incAppGlobalLoadingCount = APP('incAppGlobalLoadingCount');

const APP_TYPES = {
  set,
  update,
  fetchBasemaps,
  login,
  logout,
  logoutBySessionExpired,
  checkAuth,
  updateCredentials,
  fetchPasswordSettings,
  changeSidebarTab,
  applySettings,
  setBreakpoint,
  loginSaga,
  logoutSaga,
  logoutBySessionExpiredSaga,
  refreshStateOnLogout,
  checkSaga,
  updateCredentialsSaga,
  changeIsSidebarOpen,
  downloadInstruction,
  loadCityData,
  incAppGlobalLoadingCount,

};

export default APP_TYPES;
