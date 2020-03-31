import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isString } from 'util';

import LoginPageForm from '@next/routes/LoginPage/Form';
import { selectedLoggedIn, selectLogin, selectError, loginLoading } from 'app/store/modules/app/selectors';
import { loginSaga } from 'app/store/modules/app/actions';
import { SIDEBAR_TABS } from '@next/ui/organisms/TopSidebar/constants';

const LoginPageFormWrap: React.FC<{}> = React.memo(
  () => {
    const loggedIn = useSelector(selectedLoggedIn);
    const login = useSelector(selectLogin);
    const error = useSelector(selectError);
    const loginLoadingValue = useSelector(loginLoading);

    const dispatch = useDispatch();

    const onSubmit = React.useCallback(
      (user) => dispatch(loginSaga(user)),
      [],
    );

    if (!!loggedIn && !!login) {
      return (
        <Redirect to={SIDEBAR_TABS.MAP.path} />
      );
    }

    return (
      <LoginPageForm
        loginLoading={loginLoadingValue}
        onSubmit={onSubmit}
        errorMessage={error ? <div>{`Ошибка. ${isString(error) ? error : ''}`}</div> : ''}
      />
    );
  },
);

export default LoginPageFormWrap;
