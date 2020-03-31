import * as React from 'react';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectedLoggedIn, selectLogin } from 'app/store/modules/app/selectors';
import useBreakpoint from '@next/hooks/useBreakpoint';
import Loading from '@next/ui/atoms/Loading';

const ModalSessionExpiredContainer = React.lazy(() => (
  import(/* webpackChunkName: "ModalSessionExpiredContainer" */ 'containers/modal-session-expired')
));
const VersionLabel = React.lazy(() => (
  import(/* webpackChunkName: "VersionLabel" */ '@next/ui/atoms/VersionLabel')
));
const ExpiredCredentialsContainer = React.lazy(() => (
  import(/* webpackChunkName: "ExpiredCredentialsContainer" */ 'routes/expired-credentials')
));
const AdminContainer = React.lazy(() => (
  import(/* webpackChunkName: "AdminContainer" */ 'routes/admin')
));
const ContainerRoutes = React.lazy(() => (
  import(/* webpackChunkName: "ContainerRoutes" */ '@next/routes/ContainerRoutes')
));

// const ReportPage = React.lazy(() => (
//   import(/* webpackChunkName: "new_ReportPage" */ '@next/routes/ReportPage')
// ));

// const AnalyticsPage = React.lazy(() => (
//   import(/* webpackChunkName: "new_AnalyticsPage" */ '@next/routes/AnalyticsPage')
// ));

type Props = {};

const PrivateRoutes: React.FC<Props> = React.memo(
  () => {
    const loggedIn = useSelector(selectedLoggedIn);
    const login = useSelector(selectLogin);

    useBreakpoint([loggedIn, login]);

    if (!loggedIn || !login) {
      return <Redirect to="/login" />;
    }

    return (
      <React.Suspense fallback={<Loading />}>
        <ModalSessionExpiredContainer />
        <Switch>
          <Route path="/admin" component={AdminContainer} />
          <Route path="/update-credentials" component={ExpiredCredentialsContainer} />
          <Route path="/*" component={ContainerRoutes} />
        </Switch>
        {
          __DEV__ && <VersionLabel />
        }
      </React.Suspense>
    );
  },
);

export default PrivateRoutes;
