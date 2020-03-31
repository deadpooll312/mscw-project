import * as React from 'react';
import Map from 'ol/Map';

import CarmerasLayers from '@next/routes/MapPage/Layers/Cameras/CamerasLayer';

type Props = {
  map: Map;
};

const ViolationsCamerasLayers: React.FC<Props> = React.memo(
  (props) => {
    return (
      <React.Fragment>
        <CarmerasLayers map={props.map} />
      </React.Fragment>
    );
  },
);

export default ViolationsCamerasLayers;
