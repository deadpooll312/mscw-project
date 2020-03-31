import { factoryAction } from 'app/store/createReducer';

const REPORT = factoryAction('REPORT');

// type для экшена
const changeDate = REPORT('changeDate');
const getReports = REPORT('getReports');
const setReports = REPORT('setReports');

const REPORT_TYPES = {
  changeDate,
  getReports,
  setReports,
};

export default REPORT_TYPES;
