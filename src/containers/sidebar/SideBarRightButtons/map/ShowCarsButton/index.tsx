import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { isCurrentLevelIsDistrict } from 'app/store/modules/semantics/selectors';
import { StyledMapButton } from 'containers/sidebar/styled';
import { changeShowCars, incAppGlobalLoadingCount } from 'app/store/modules/app/actions';
import { selectShowCars, selectUserIsMer } from 'app/store/modules/app/selectors';

type Props = {};

const ShowCarsButton: React.FC<Props> = React.memo(
  () => {
    const showCars = useSelector(selectShowCars);
    const showAllViolation = useSelector(isCurrentLevelIsDistrict);
    const userRoleIsMer = useSelector(selectUserIsMer);

    const dispatch = useDispatch();

    const handleClick = React.useCallback(
      () => {
        if (!showCars) {
          dispatch(incAppGlobalLoadingCount());
        }
        dispatch(changeShowCars(!showCars));
      },
      [showCars],
    );

    React.useEffect(
      () => {
        return () => {
          dispatch(changeShowCars(false));
        };
      },
      [],
    );

    React.useEffect(
      () => {
        if (!showAllViolation) {
          dispatch(changeShowCars(false));
        }
      },
      [showAllViolation]
    );

    return userRoleIsMer && showAllViolation && (
      <StyledMapButton onClick={handleClick} isActive={showCars}>
        ТС
      </StyledMapButton>

    );
  },
);

export default ShowCarsButton;
