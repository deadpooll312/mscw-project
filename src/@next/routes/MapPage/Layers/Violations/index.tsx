import * as React from 'react';
import Map from 'ol/Map';
import { useSelector } from 'react-redux';

import { selectIsViolationsShowed } from 'app/store/modules/semantics/selectors';
import ViolationsCamerasLayers from '@next/routes/MapPage/Layers/Violations/Cameras';
import LayersContainer from '@next/routes/MapPage/Layers/Violations/LayersContainer';
import { selectShowCars } from 'app/store/modules/app/selectors';

type Props = {
  map: Map;
};

const ViolationsLayers: React.FC<Props> = React.memo(
  (props) => {
    const isViolationsShowed = useSelector(selectIsViolationsShowed);
    const showCars = useSelector(selectShowCars);

    return !showCars && isViolationsShowed && (
      <React.Fragment>
        <LayersContainer map={props.map} />
        <ViolationsCamerasLayers map={props.map} />
      </React.Fragment>
    );
  },
);

export default ViolationsLayers;
