import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';

import { selectAuth } from 'app/store/modules/app/selectors';
import { loginSaga } from 'app/store/modules/app/actions';
import Loading from '@next/ui/atoms/Loading';
import RouterContainer from '@next/routes';

ruRU.Transfer = {
  ...ruRU.Transfer,
  itemUnit: '',
  itemsUnit: '',
};

ruRU.Modal = {
  ...ruRU.Modal,
  cancelText: 'Отмена',
  justOkText: 'OK',
  okText: 'OK',
};

const App: React.FC<{}> = React.memo(
  () => {
    const auth = useSelector(selectAuth);
    const dispatch = useDispatch();

    React.useEffect(
      () => {
        dispatch(loginSaga(null));
      },
      [],
    );

    if (!auth?.checked) {
      return <Loading />;
    }

    return (
      <ConfigProvider locale={ruRU}>
        <RouterContainer />
      </ConfigProvider>
    );
  },
);

const AppContainer = hot(App);

export default AppContainer;
