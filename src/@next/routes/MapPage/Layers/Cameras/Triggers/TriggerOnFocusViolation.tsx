import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectNearestCamerasData } from 'app/store/modules/semantics/selectors';
import { isNumber } from 'util';
import { selectModuleViolationCardData, selectModuleViolationCardActiveDefectIndex } from 'app/store/modules/violation_card/selectors';
import { violationMoveCameraToCoordinates } from 'app/api/violations';

type Props = {
};

const TriggerOnFocusViolation: React.FC<Props> = React.memo(
  (props) => {
    const nearestCamerasData = useSelector(selectNearestCamerasData);
    const violationData = useSelector(selectModuleViolationCardData);
    const currentIndexDeffect = useSelector(selectModuleViolationCardActiveDefectIndex);

    // Поворот камер на выбранное нарушение
    React.useEffect(
      () => {
        if (nearestCamerasData) {
          if (violationData && isNumber(currentIndexDeffect)) {
            const lat = violationData?.violations[currentIndexDeffect]?.latitude?.toString().replace(/{|}/g, '')?.split(',')?.map((d) => Number(d))[currentIndexDeffect];
            const long = violationData.violations[currentIndexDeffect]?.longitude?.toString().replace(/{|}/g, '')?.split(',')?.map((d) => Number(d))[currentIndexDeffect];
    
            const cameraIds = nearestCamerasData.filter((rowData) => !rowData.fixed).map((rowData) => rowData.id);
  
            violationMoveCameraToCoordinates(
              cameraIds,
              lat,
              long,
            );
          }
        }
      },
      [nearestCamerasData, violationData, currentIndexDeffect]
    );

    return null;
  },
);

export default TriggerOnFocusViolation;