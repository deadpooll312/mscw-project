import * as React from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Layout, Menu } from 'antd';
import { Sidebar, StyledMenu, StyledHeader, BtnLink, StyledLayout } from './styled';
import { checkIsAdmin } from '@next/utils/checkOnPermission';
import { selectLogin, selectUser } from 'app/store/modules/app/selectors';
import Loading from '@next/ui/atoms/Loading';

const { Content } = Layout;

// TODO Переименовать компонент в Camel
type Props = {};

const PAGES = {
  layers: React.lazy(() => (
    import(/* webpackChunkName: "@LayersTable" */ './components/LayersTable')
  )),
  colors: React.lazy(() => (
    import(/* webpackChunkName: "@ColorsTable" */ './components/ColorsTable')
  )),
  cameras: React.lazy(() => (
    import(/* webpackChunkName: "@CameraSettings" */ './components/CameraSettings')
  )),
};

const AdminPage: React.FC<Props> = React.memo(
  (props) => {
    const login = useSelector(selectLogin);
    const user = useSelector(selectUser);

    const isAdmin = React.useMemo(() => checkIsAdmin(user), [user]);

    if (!isAdmin) {
      return <Redirect to="/login" />;
    }

    const [selectedMenuItem, setSelectedMenuItem] = React.useState<keyof typeof PAGES>('layers');

    const onSelect = React.useCallback(({ key }) => setSelectedMenuItem(key), []);

    const CurrentContent = React.useMemo(() => PAGES[selectedMenuItem] || PAGES['layers'], [selectedMenuItem]);

    return (
      <StyledLayout>
        <Sidebar>
          <Link to={`/map`}><BtnLink>Dashboard</BtnLink></Link>
          <StyledMenu
            mode="inline"
            defaultSelectedKeys={['layers']}
            onSelect={onSelect}
          >
            {/* <Menu.Item key="dashboard"><Link to={`/map`}>Dashboard</Link></Menu.Item> */}
            <Menu.Item key="layers">Слои</Menu.Item>
            <Menu.Item key="colors">Легенда</Menu.Item>
            <Menu.Item key="role_model" disabled>Ролевая модель</Menu.Item>
            <Menu.Item key="cameras"> Камеры </Menu.Item>
          </StyledMenu>
        </Sidebar>
        <StyledLayout>
          <StyledHeader>{login}</StyledHeader>
          <Content>
            <React.Suspense fallback={<Loading type="new_spinner" />}>
              <CurrentContent />
            </React.Suspense>
          </Content>
        </StyledLayout>
      </StyledLayout>
    );
  },
);

export default AdminPage;
