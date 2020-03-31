import * as React from 'react';
import {
  Router,
  Route,
  Switch,
} from 'react-router-dom';
import { historyDashboard } from 'app/store/history';

import Loading from '@next/ui/atoms/Loading';
import { useSelector } from 'react-redux';
import { selectAppGlobalIsLoading } from 'app/store/modules/app/selectors';

const LoginContainer = React.lazy(() => (
  import(/* webpackChunkName: "LoginContainer" */ '@next/routes/LoginPage')
));
const PrivateRoutes = React.lazy(() => (
  import(/* webpackChunkName: "PrivateRoutes" */ '@next/routes/PrivateRoutes')
));

const RouterContainer: React.FC<{}> = React.memo(
  () => {
    const appGlobalIsLoading = useSelector(selectAppGlobalIsLoading);

    return (
      <React.Suspense fallback={<Loading />}>
        <Router history={historyDashboard}>
          <Switch>
            <Route path="/login" component={LoginContainer} />
            <Route path="*" component={PrivateRoutes} />
          </Switch>
        </Router>
        {
          appGlobalIsLoading && (
            <Loading type="new_spinner" overall backgroundColor="rgba(0, 0, 0, 0.5)" />
          )
        }
      </React.Suspense>
    );
  }
);

export default RouterContainer;
