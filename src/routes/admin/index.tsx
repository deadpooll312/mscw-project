import * as React from 'react';

import { ErrorBoundary } from '@next/hocs/ErrorBoundary';
import AdminPage from 'containers/admin-panel';

type Props = {};

export const AdminComponent: React.FC<Props> = React.memo(
  () => {
    return (
      <ErrorBoundary>
        <AdminPage />
      </ErrorBoundary>
    );
  },
);

export default AdminComponent;
