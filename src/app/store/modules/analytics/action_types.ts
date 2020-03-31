import { factoryAction } from 'app/store/createReducer';

const ANALITYCS = factoryAction('ANALITYCS');

// type для экшена
const wrapChangeCurrentTypes = ANALITYCS('wrapChangeCurrentTypes');
const wrapChangeCurrentSystems = ANALITYCS('wrapChangeCurrentSystems');
const changeCurrentTypes = ANALITYCS('changeCurrentTypes');
const changeCurrentSystems = ANALITYCS('changeCurrentSystems');
const changeDate = ANALITYCS('changeDate');
const loadAnalyticsData = ANALITYCS('loadAnalyticsData');
const loadWidgetCircle = ANALITYCS('loadWidgetCircle');
const loadWidgetLines = ANALITYCS('loadWidgetLines');
const loadWidgetCharts = ANALITYCS('loadWidgetCharts');
const setOneAnalyticsData = ANALITYCS('setOneAnalyticsData');
const changeSeason = ANALITYCS('changeSeason');
const changeViolationType = ANALITYCS('changeViolationType');
const resetSelectedFilters = ANALITYCS('resetSelectedFilters');

const ANALITYCS_TYPES = {
  wrapChangeCurrentTypes,
  wrapChangeCurrentSystems,
  changeCurrentTypes,
  changeCurrentSystems,
  changeDate,
  loadAnalyticsData,
  loadWidgetCircle,
  loadWidgetLines,
  loadWidgetCharts,
  setOneAnalyticsData,
  changeSeason,
  changeViolationType,
  resetSelectedFilters,
};

export default ANALITYCS_TYPES;
