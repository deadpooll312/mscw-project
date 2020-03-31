import { factoryAction } from 'app/store/createReducer';

const SIDEBAR = factoryAction('SIDEBAR');

// type для экшена
const changeStartDate = SIDEBAR('changeStartDate');
const changeEndDate = SIDEBAR('changeEndDate');
const changeSidebarDate = SIDEBAR('changeSidebarDate');
const changeViolationType = SIDEBAR('changeViolationType');
const changeSeason = SIDEBAR('changeSeason');

const changeSelectedObjects = SIDEBAR('changeSelectedObjects');
const changeSelectedEvents = SIDEBAR('changeSelectedEvents');
const changeSelectedSources = SIDEBAR('changeSelectedSources');
const changeSelectedViolationTypes = SIDEBAR('changeSelectedViolationTypes');
const changeSelectedRegions = SIDEBAR('changeSelectedRegions');
const changeSelectedDistricts = SIDEBAR('changeSelectedDistricts');
const changeSecondaryFilters =  SIDEBAR('changeSecondaryFilters');

const changeLastTouchFilter = SIDEBAR('changeLastTouchFilter');

const setInitialFilters = SIDEBAR('setInitialFilters');
const resetToInitialFilters = SIDEBAR('resetToInitialFilters');
const resetToInitialFiltersWithSaveViolationAndSeason = SIDEBAR('resetToInitialFiltersWithSaveViolationAndSeason');
const changeUsePeriod = SIDEBAR('changeUsePeriod');

const changeSearchFilter = SIDEBAR('changeSearchFilter');

const SIDEBAR_TYPES = {
  changeStartDate,
  changeEndDate,
  changeSidebarDate,
  changeViolationType,
  changeSeason,
  changeUsePeriod,

  changeSelectedObjects,
  changeSelectedEvents,
  changeSelectedSources,
  changeSelectedViolationTypes,
  changeSelectedRegions,
  changeSelectedDistricts,
  changeSecondaryFilters,
  changeSearchFilter,

  changeLastTouchFilter,
  setInitialFilters,
  resetToInitialFilters,
  resetToInitialFiltersWithSaveViolationAndSeason,
};

export default SIDEBAR_TYPES;
