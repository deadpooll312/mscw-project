import * as React from 'react';
import DashboardPageContainer from './DashboardPageContainer';
import { ErrorBoundary } from '@next/hocs/ErrorBoundary';

type Props = {};

export const DashboardPage: React.FC<Props> = React.memo(
  (props) => {
    return (
      <ErrorBoundary>
        <DashboardPageContainer />
      </ErrorBoundary>
    );
  },
);

export default DashboardPage;
