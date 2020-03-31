import * as React from 'react';
import { useHistory } from 'react-router-dom';

import { TabId } from 'app/types';
import TabPanel from 'components/Tabs/tab-panel';

import { ErrorBoundary } from '@next/hocs/ErrorBoundary';

import Loading from '@next/ui/atoms/Loading';
import { isEqualPathWithLocation } from '@next/utils/router';
import { SIDEBAR_TABS } from '@next/ui/organisms/TopSidebar/constants';

const TabMap = React.lazy(() => (
  import(/* webpackChunkName: "@TabMap" */ './TabContainers/TabMap')
));
const TabReport = React.lazy(() => (
  import(/* webpackChunkName: "@TabReport" */ './TabContainers/TabReport')
));
// const TabAnalytics = React.lazy(() => (
//   import(/* webpackChunkName: "@TabAnalytics" */ './TabContainers/TabAnalytics')
// ));

type Props = {};

const SidebarContent: React.FC<Props> = React.memo(
  (props) => {
    const history = useHistory();

    return (
      <React.Suspense fallback={<Loading />}>
        <React.Fragment>
          {
            isEqualPathWithLocation(history.location, SIDEBAR_TABS[TabId.MAP].path) && (
              <TabPanel id={TabId.MAP}>
                <ErrorBoundary>
                  <TabMap />
                </ErrorBoundary>
              </TabPanel>
            )
          }
          {
            isEqualPathWithLocation(history.location, SIDEBAR_TABS[TabId.REPORT].path) && (
              <TabPanel id={TabId.REPORT}>
                <ErrorBoundary>
                  <TabReport />
                </ErrorBoundary>
              </TabPanel>
            )
          }
          {/* {
            isEqualPathWithLocation(history.location, SIDEBAR_TABS[TabId.ANALYTICS].path) && (
              <TabPanel id={TabId.ANALYTICS}>
                <ErrorBoundary>
                  <TabAnalytics />
                </ErrorBoundary>
              </TabPanel>
            )
          } */}
        </React.Fragment>
      </React.Suspense>
    );
  }
);

export default SidebarContent;
