import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { PointMode } from 'app/store/modules/@types';
import { setMapPointMode } from 'app/store/modules/map/actions';
import { selectIsCurrentLevelIsCity, isCurrentLevelIsRegion, isCurrentLevelIsDistrict } from 'app/store/modules/semantics/selectors';
import { StyledButton, ReturnIcon } from 'containers/sidebar/styled';
import SidebarRightButtonsContainer from '@next/ui/atoms/SidebarRightButtonsContainer';
import { changeSelectedDistricts, changeSelectedRegions } from 'app/store/modules/sidebar/actions';

type Props = {};

const ReturnButton: React.FC<Props> = React.memo(
  () => {
    const showAllRegions = useSelector(selectIsCurrentLevelIsCity);
    const showAllDistrict = useSelector(isCurrentLevelIsRegion);
    const showAllViolation = useSelector(isCurrentLevelIsDistrict);
    
    const dispatch = useDispatch();

    const handleClick = React.useCallback(
      () => {

        if (showAllDistrict) {
          dispatch(changeSelectedDistricts([]));
          dispatch(changeSelectedRegions([]));
          return;
        }

        if (showAllViolation) {
          dispatch(setMapPointMode(PointMode.OFF));
          dispatch(changeSelectedDistricts([]));
          return;
        }
      },
      [showAllDistrict, showAllViolation],
    );

    return !showAllRegions && (
      <SidebarRightButtonsContainer>
        <StyledButton size="large" onClick={handleClick}>
          <ReturnIcon />
        </StyledButton>
      </SidebarRightButtonsContainer>

    );
  },
);

export default ReturnButton;
