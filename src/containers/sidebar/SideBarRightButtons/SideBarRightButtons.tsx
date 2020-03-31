import * as React from 'react';
import { useHistory } from 'react-router-dom';
import Map from 'ol/Map';

import { ErrorBoundary } from '@next/hocs/ErrorBoundary';

import { TabId } from 'app/types';
import SideBarRightButtonsMap from 'containers/sidebar/SideBarRightButtons/map';
import { SIDEBAR_TABS } from '@next/ui/organisms/TopSidebar/constants';

type Props = {
  map?: Map;
};

const SideBarRightButtons: React.FC<Props> = React.memo(
  (props) => {
    const history = useHistory();

    return (
      <ErrorBoundary>
        {
          history.location.pathname.includes(SIDEBAR_TABS[TabId.MAP].path) && (
            <SideBarRightButtonsMap map={props.map} />
          )
        }
      </ErrorBoundary>
    );
  },
);

export default SideBarRightButtons;