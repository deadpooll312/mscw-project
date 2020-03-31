import { factoryAction } from 'app/store/createReducer';

const TABLE = factoryAction('TABLE');

// type для экшена
const getDashboardTableData = TABLE('getDashboardTableData');
const setDashboardTableData = TABLE('setDashboardTableData');
const setDashboardTableDataLoading = TABLE('setDashboardTableDataLoading');

const TABLE_TYPES = {
  getDashboardTableData,
  setDashboardTableData,
  setDashboardTableDataLoading
};

export default TABLE_TYPES;
