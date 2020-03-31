import * as React from 'react';
import Map from 'ol/Map';
import { useSelector } from 'react-redux';

import { fitExtent } from '@next/utils/map/fit';
import { extentMsk } from '@next/constants/moscow';
import { selectCurrentLevel, selectIsCurrentLevelIsCity, selectSelectedObject } from 'app/store/modules/semantics/selectors';
import { selectModuleViolationCardData } from 'app/store/modules/violation_card/selectors';

type Props = {
  map: Map;
};

const RegionFitExtentTrigger: React.FC<Props> = React.memo(
  (props) => {
    const currentLevel = useSelector(selectCurrentLevel);
    const showAllRegions = useSelector(selectIsCurrentLevelIsCity);

    const violationCardData = useSelector(selectModuleViolationCardData);
    const selectedObject = useSelector(selectSelectedObject);

    React.useEffect(
      () => {
        if (currentLevel === 'region' && showAllRegions) {
          fitExtent(
            props.map,
            extentMsk,
            { padding: [25, 25, 25, 25], maxZoom: 10 },
            () => {
              if (!(violationCardData?.featureId !== selectedObject?.featureId)) {
                props.map.getView().setMaxZoom(12.5);
              }
            },
          );
        }
      },
      [currentLevel, showAllRegions],
    );

    return null;
  },
);

export default RegionFitExtentTrigger;
