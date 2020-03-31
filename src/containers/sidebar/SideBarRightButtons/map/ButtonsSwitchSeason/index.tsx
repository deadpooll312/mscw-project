import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Season, PointMode } from 'app/store/modules/@types';
import { changeSelectedObject, hideNearestCamera } from 'app/store/modules/semantics/actions';
import { setMapPointMode } from 'app/store/modules/map/actions';
import { StyledSwitcher } from 'containers/sidebar/styled';
import SeasonsSwitcher from '@next/ui/organisms/SeasonsSwitcher';
import { selectModuleSidebarSeason } from 'app/store/modules/sidebar/selectors';
import { changeSeason } from 'app/store/modules/sidebar/actions';

type Props = {};

const ButtonsSwitchSeason: React.FC<Props> = React.memo(
  () => {
    const seasonActive = useSelector(selectModuleSidebarSeason);
    const dispatch = useDispatch();

    const onChange = React.useCallback(
      (newState: Season) => {
        dispatch(changeSeason(newState));

        // закрытие карточки выбранного геообъекта
        dispatch(changeSelectedObject(null));
        dispatch(hideNearestCamera());
        dispatch(setMapPointMode(PointMode.OFF));
      },
      [],
    );

    return (
      <StyledSwitcher>
        <SeasonsSwitcher
          selectedState={seasonActive}
          onChange={onChange}
        />
      </StyledSwitcher>
    );
  },
);

export default ButtonsSwitchSeason;
