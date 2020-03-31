import * as React from 'react';
import type Map from 'ol/Map';
import SidebarRightButtonsContainer from '@next/ui/atoms/SidebarRightButtonsContainer';
import ZoomButton from '@next/ui/atoms/ZoomButton';

type Props = {
  map: Map;
};

const MapZoomButtons: React.FC<Props> = React.memo(
  (props) => {
    return (
      <SidebarRightButtonsContainer>
        <ZoomButton type="plus" map={props.map} />
        <ZoomButton type="minus" map={props.map} />
      </SidebarRightButtonsContainer>
    );
  }
);

export default MapZoomButtons;
