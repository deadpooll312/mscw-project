import * as React from 'react';
import Map from 'ol/Map';
import { useSelector } from 'react-redux';

import { fitExtent } from '@next/utils/map/fit';
import { selectCurrentLevel, selectSelectedRegion, isCurrentLevelIsRegion, selectSelectedObject } from 'app/store/modules/semantics/selectors';
import { selectRegionsGeometryIndex } from 'app/store/modules/map/selectors';
import { selectModuleViolationCardData } from 'app/store/modules/violation_card/selectors';
import { GEOJSON } from '@next/utils/map/geojson';

type Props = {
  map: Map;
};

const DistrictFitExtentTrigger: React.FC<Props> = React.memo(
  (props) => {
    const currentLevel = useSelector(selectCurrentLevel);
    const showAllDistrict = useSelector(isCurrentLevelIsRegion);

    const selectedRegion = useSelector(selectSelectedRegion);
    const regionsGeometryIndex = useSelector(selectRegionsGeometryIndex);

    const violationCardData = useSelector(selectModuleViolationCardData);
    const selectedObject = useSelector(selectSelectedObject);

    React.useEffect(
      () => {
        if (currentLevel === 'district' && showAllDistrict) {
          const featureRegion = regionsGeometryIndex?.[selectedRegion.featureId];
          if (featureRegion) {
            const regionGeometry = GEOJSON.readFeature(featureRegion);

            const regionExtent = regionGeometry.getGeometry().getExtent();
            fitExtent(
              props.map,
              regionExtent,
              { padding: [25, 25, 25, 25], maxZoom: 13 },
              () => {
                if (!(violationCardData?.featureId !== selectedObject?.featureId)) {
                  props.map.getView().setMaxZoom(20);
                }
              },
            );
          }
          return;
        }
      },
      [currentLevel, showAllDistrict, selectedRegion],
    );

    return null;
  },
);

export default DistrictFitExtentTrigger;
