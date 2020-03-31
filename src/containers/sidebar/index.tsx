import * as React from 'react';
import type Map from 'ol/Map';

import { ErrorBoundary } from '@next/hocs/ErrorBoundary';

import SidebarContent from './sidebarContent';

import SideBarRightButtons from 'containers/sidebar/SideBarRightButtons/SideBarRightButtons';
import ViolationsLegend from '@next/ui/organisms/ViolationsLegend/ViolationsLegend';

type Props = {
  map?: Map;
};

const Sidebar: React.FC<Props> = React.memo(
  (props) => {

    return (
      <ErrorBoundary>
        <SidebarContent />
        <SideBarRightButtons map={props.map} />
        <ViolationsLegend />
      </ErrorBoundary>
    );
  },
);

export default Sidebar;
