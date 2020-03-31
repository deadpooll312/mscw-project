import { combineReducers } from 'redux';

// import { analyticsReducer } from 'app/store/modules/analytics/reducer';
// import { reportReducer } from 'app/store/modules/report/reducer';
import { mapReducer } from 'app/store/modules/map/reducer';
import { semanticsReducer } from 'app/store/modules/semantics/reducer';
import { appReducer } from 'app/store/modules/app/reducer';
import { sidebarReducer } from 'app/store/modules/sidebar/reducer';
import { dashboardReducer } from 'app/store/modules/dashboard/reducer';
import { dashboardTableReducer } from 'app/store/modules/table/reducer';
import { violationCardsReducer } from 'app/store/modules/violation_card/reducer';
import { carCardsReducer } from 'app/store/modules/car_card/reducer';

export const reducerMap = {
  // analytics: analyticsReducer,
  // report: reportReducer,
  map: mapReducer,
  semantics: semanticsReducer,
  app: appReducer,
  sidebar: sidebarReducer,
  dashboard: dashboardReducer,
  dashboardTable: dashboardTableReducer,
  violationCard: violationCardsReducer,
  carCard: carCardsReducer,
};

export default combineReducers(reducerMap);
