import { all } from 'redux-saga/effects';

// import AnalyticsEffects from 'app/store/modules/analytics/effects';
// import ReportEffects from 'app/store/modules/report/effects';
import MapEffects from 'app/store/modules/map/effects';
import SemanticsEffects from 'app/store/modules/semantics/effects';
import AppEffects from 'app/store/modules/app/effects';
import SidebarEffects from 'app/store/modules/sidebar/effects';
import DashboardEffects from 'app/store/modules/dashboard/effects';
import DashboardTableEffects from 'app/store/modules/table/effects';
import ViolationCardEffects from 'app/store/modules/violation_card/effects';
import CarCardEffects from 'app/store/modules/car_card/effects';

export default function* root() {
  yield all([
    // ...AnalyticsEffects,
    // ...ReportEffects,
    ...MapEffects,
    ...SemanticsEffects,
    ...AppEffects,
    ...SidebarEffects,
    ...DashboardEffects,
    ...DashboardTableEffects,
    ...ViolationCardEffects,
    ...CarCardEffects,
  ]);
}
