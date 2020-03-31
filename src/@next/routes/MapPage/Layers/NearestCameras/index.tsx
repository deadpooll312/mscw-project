import * as React from 'react';
import Map from 'ol/Map';
import NearestCamerasLayer from 'containers/layers/NearestCamerasLayer';

type Props = {
  map: Map;
};

const NearestCamerasLayers: React.FC<Props> = React.memo(
  (props) => {
    return (
      <React.Fragment>
        <NearestCamerasLayer map={props.map} />
      </React.Fragment>
    );
  },
);

export default NearestCamerasLayers;
