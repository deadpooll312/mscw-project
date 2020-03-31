import * as React from 'react';

import { ErrorBoundary } from '@next/hocs/ErrorBoundary';
import AnalyticsPageSlider from '@next/routes/AnalyticsPage/Slider';

const Sidebar = React.lazy(() => (
  import(/* webpackChunkName: "Sidebar" */ 'containers/sidebar')
));

type Props = {};

const Analytics: React.FC<Props> = React.memo(
  () => {
    return (
      <React.Fragment>
        <ErrorBoundary>
          <AnalyticsPageSlider />
        </ErrorBoundary>
        <React.Suspense fallback={<div></div>}>
          <ErrorBoundary>
            <Sidebar />
          </ErrorBoundary>
        </React.Suspense>
      </React.Fragment>
    );
  },
);

export default Analytics;
