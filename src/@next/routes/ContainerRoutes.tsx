import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import Loading from '@next/ui/atoms/Loading';
import FullBlock from '@next/ui/atoms/FullSection';
import { SIDEBAR_TABS } from '@next/ui/organisms/TopSidebar/constants';
import { TabId } from 'app/types';
import styled from 'styles';

const TopSidebar = React.lazy(() => (
  import(/* webpackChunkName: "new_AnalyticsPage" */ '@next/ui/organisms/TopSidebar')
));

// const AnalyticsPage = React.lazy(() => (
//   import(/* webpackChunkName: "new_AnalyticsPage" */ '@next/routes/AnalyticsPage')
// ));

const DashboardPage = React.lazy(() => (
  import(/* webpackChunkName: "new_MainPage" */ '@next/routes/DashboardPage')
));

// const ReportPage = React.lazy(() => (
//   import(/* webpackChunkName: "new_ReportPage" */ '@next/routes/ReportPage')
// ));

const MapPage = React.lazy(() => (
  import(/* webpackChunkName: "MapPage" */ '@next/routes/MapPage/MapPage')
));

const ViolationsTablePage = React.lazy(() => (
  import(/* webpackChunkName: "ViolationsTablePage" */ '@next/routes/ViolationsTablePage')
));

const ViolationCardFormWrap = React.lazy(() => (
  import(/* webpackChunkName: "ViolationCardFormWrap" */ '@next/ui/organisms/ViolationCard/ViolationCardWrap')
));

const CarCardFormWrap = React.lazy(() => (
  import(/* webpackChunkName: "CarCardFormWrap" */ '@next/ui/organisms/CarCard/CarCardWrap')
));

const ContainerRoutes = React.memo(() => {
  return (
    <React.Suspense fallback={<Loading />}>
      <FullBlock isFull={false} id="main-section">
        <TopSidebar />
        <React.Suspense fallback={<Loading />}>
          <PagesContainer>
            <Switch>
              <Route path={SIDEBAR_TABS[TabId.DASHBOARD].path} component={DashboardPage} />
              <Route path={SIDEBAR_TABS[TabId.TABLE].path} component={ViolationsTablePage} />

              <Route path={SIDEBAR_TABS[TabId.MAP].path} component={MapPage} />
              {/* <Route path={SIDEBAR_TABS[TabId.REPORT].path} component={ReportPage} /> */}
              {/* <Route path={SIDEBAR_TABS[TabId.ANALYTICS].path} component={AnalyticsPage} /> */}
              <Redirect to="/login" />
            </Switch>
            <ViolationCardFormWrap />
            <CarCardFormWrap />
          </PagesContainer>
        </React.Suspense >
      </FullBlock>
    </React.Suspense >
  );

});

export default ContainerRoutes;

const PagesContainer = styled.div`
  position: relative;
  display: flex;
  overflow-y: auto;
  flex: 2 2 100%;

  height: 100%;
  width: 100%;

  background-color: ${({ theme }) => theme.colors.dashboardCard.mainBackground};
`;

