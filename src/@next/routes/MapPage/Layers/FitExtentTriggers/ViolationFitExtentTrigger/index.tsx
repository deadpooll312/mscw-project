import * as React from 'react';
import Map from 'ol/Map';
import { useSelector } from 'react-redux';

import { fitExtent } from '@next/utils/map/fit';
import { selectCurrentLevel, isCurrentLevelIsDistrict, selectSelectedObject, selectSelectedDistrict } from 'app/store/modules/semantics/selectors';
import { selectDistrictsGeometryIndex, selectViolationsGeometry } from 'app/store/modules/map/selectors';
import { GEOJSON } from '@next/utils/map/geojson';

type Props = {
  map: Map;
};

const ViolationFitExtentTrigger: React.FC<Props> = React.memo(
  (props) => {
    const currentLevel = useSelector(selectCurrentLevel);
    const showAllViolation = useSelector(isCurrentLevelIsDistrict);

    const regionsDistrictIndex = useSelector(selectDistrictsGeometryIndex);
    const selectedObject = useSelector(selectSelectedObject);
    const geometry = useSelector(selectViolationsGeometry);

    const selectedDistrict = useSelector(selectSelectedDistrict);

    React.useEffect(
      () => {
        if (currentLevel === 'violation' && showAllViolation && !selectedObject) {
          const featureDistrict = regionsDistrictIndex?.[selectedDistrict.featureId];
          if (featureDistrict) {
            const districtGeometry = GEOJSON.readFeature(featureDistrict);

            const districtExtent = districtGeometry.getGeometry().getExtent();
            fitExtent(props.map, districtExtent, { padding: [25, 25, 25, 25], maxZoom: 20 });
          }
          return;
        }
      },
      [currentLevel, showAllViolation, selectedDistrict],
    );

    React.useEffect(
      () => {
        if (currentLevel === 'violation' && showAllViolation && selectedObject) {
          const geometryVioaltion = geometry?.[selectedObject.dimension];
          if (geometryVioaltion) {
            const featureVioaltion = geometryVioaltion.find((rowData) => rowData.properties.feature_id === selectedObject.featureId);
            if (featureVioaltion) {
              const violationGeometry = GEOJSON.readFeature(featureVioaltion);

              const violationExtent = violationGeometry.getGeometry().getExtent();
              fitExtent(props.map, violationExtent, { padding: [25, 25 + 510, 25, 25], maxZoom: 17 });
            }
            return;
          }
        }
      },
      [currentLevel, showAllViolation, selectedObject, geometry?.[selectedObject?.dimension] ?? null],
    );

    return null;
  },
);

export default ViolationFitExtentTrigger;
