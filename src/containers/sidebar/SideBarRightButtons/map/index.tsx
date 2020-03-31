import * as React from 'react';
import type Map from 'ol/Map';

import { CenterButtons} from 'containers/sidebar/styled';

import MapZoomButtons from '@next/ui/molecules/MapZoomButtons';
import ReturnButton from 'containers/sidebar/SideBarRightButtons/map/ReturnButton';
import ShowCarsButton from 'containers/sidebar/SideBarRightButtons/map/ShowCarsButton';
// import ButtonsSwitchSeason from 'containers/sidebar/SideBarRightButtons/map/ButtonsSwitchSeason';
import ButtonPickСameras from 'containers/sidebar/SideBarRightButtons/map/ButtonPickСameras';

type Props = {
  map?: Map;
};

const SideBarRightButtonsMap: React.FC<Props> = React.memo(
  (props) => {
    return (
      <React.Fragment>
        <CenterButtons>
          <MapZoomButtons map={props.map} />
          <ReturnButton />
          <ShowCarsButton />
          {/*TODO Кнопки сезона пока не удаляем */}
          {/* <ButtonsSwitchSeason /> */}
          <ButtonPickСameras />
        </CenterButtons>
      </React.Fragment>
    );
  },
);

export default SideBarRightButtonsMap;
