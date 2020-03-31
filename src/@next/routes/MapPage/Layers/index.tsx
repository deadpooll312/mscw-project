import * as React from 'react';
import Map from 'ol/Map';

import MapPageRegionLayer from '@next/routes/MapPage/Layers/Region';
import MapPageDitrictsLayer from '@next/routes/MapPage/Layers/DIstricts';
import ViolationsLayers from '@next/routes/MapPage/Layers/Violations';
import NearestCamerasLayers from '@next/routes/MapPage/Layers/NearestCameras';
import FitExtentTriggers from '@next/routes/MapPage/Layers/FitExtentTriggers';
import LoadIncidentsTrigger from '@next/routes/MapPage/Layers/LoadIncidentsTrigger';
import ThrowToObjectLoadingTrigger from '@next/routes/MapPage/Layers/ThrowToObjectLoadingTrigger';
import CarsLayer from '@next/routes/MapPage/Layers/Cars';

type Props = {
  map: Map;
};

const MapPageLayers: React.FC<Props> = React.memo(
  (props) => {
    return (
      <React.Fragment>
        <MapPageRegionLayer map={props.map} />
        <MapPageDitrictsLayer map={props.map} />
        <NearestCamerasLayers map={props.map} />
        <ViolationsLayers map={props.map} />
        <CarsLayer map={props.map} />

        <FitExtentTriggers map={props.map} />
        <LoadIncidentsTrigger />
        <ThrowToObjectLoadingTrigger />
      </React.Fragment>
    );
  },
);

export default MapPageLayers;
