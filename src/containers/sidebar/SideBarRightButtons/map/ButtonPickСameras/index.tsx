import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { PointMode } from 'app/store/modules/@types';
import { setMapPointMode } from 'app/store/modules/map/actions';
import { selectSelectedDistrict } from 'app/store/modules/semantics/selectors';
import { selectPointMode, selectSelectCameraEnabled } from 'app/store/modules/map/selectors';
import { StyledMapButton, PointIcon } from 'containers/sidebar/styled';

type Props = {};

const ButtonPickСameras: React.FC<Props> = React.memo(
  () => {
    const pointMode = useSelector(selectPointMode);
    const isDistrictSelected = !!useSelector(selectSelectedDistrict);
    const isSelectCameraEnabled = useSelector(selectSelectCameraEnabled);

    const dispatch = useDispatch();

    const isSearchMode = React.useMemo(()=> [PointMode.SEARCH].includes(pointMode), [pointMode]);

    const onChoosePoint = React.useCallback(() => {
      if (isSearchMode) {
        dispatch(setMapPointMode(PointMode.OFF));
      } else {
        dispatch(setMapPointMode(PointMode.SEARCH));
      }  
    }, [isSearchMode]);

    const isActive = React.useMemo(() => pointMode !== PointMode.OFF && pointMode !== PointMode.SELECTED, [pointMode]);

    return Boolean(isDistrictSelected && isSelectCameraEnabled) && (
      <StyledMapButton
        onClick={onChoosePoint}
        isActive={isActive}
        title="Выбор точки на карте для просмотра камер"
      >
        <PointIcon />
      </StyledMapButton>
    );
  },
);

export default ButtonPickСameras;
