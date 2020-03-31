import * as React from 'react';

import ReportPageSlider from '@next/routes/ReportPage/Slider';
import { ErrorBoundary } from '@next/hocs/ErrorBoundary';

const Sidebar = React.lazy(() => (
  import(/* webpackChunkName: "Sidebar" */ 'containers/sidebar')
));

type Props = {};

const ReportPage: React.FC<Props> = React.memo(
  () => {
    return (
      <React.Fragment>
        <ErrorBoundary>
          <ReportPageSlider />
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

export default ReportPage;
