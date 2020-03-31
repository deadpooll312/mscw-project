import * as React from 'react';
import { selectSelectedObject } from 'app/store/modules/semantics/selectors';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { selectModuleViolationCardData } from 'app/store/modules/violation_card/selectors';
import { incAppGlobalLoadingCount, decAppGlobalLoadingCount } from 'app/store/modules/app/actions';

type Props = {};

const ThrowToObjectLoadingTrigger: React.FC<Props> = React.memo(
  () => {
    const violationCardData = useSelector(selectModuleViolationCardData);
    const selectedObject = useSelector(selectSelectedObject);

    const dispatch = useDispatch();

    React.useEffect(
      () => {
        if (violationCardData) {
          if (violationCardData?.featureId !== selectedObject?.featureId) {
            dispatch(
              incAppGlobalLoadingCount(),
            );

            return () => {
              dispatch(
                decAppGlobalLoadingCount(),
              );
            };
          }
        }
      },
      [violationCardData, selectedObject],
    );

    return null;
  },
);

export default ThrowToObjectLoadingTrigger;
