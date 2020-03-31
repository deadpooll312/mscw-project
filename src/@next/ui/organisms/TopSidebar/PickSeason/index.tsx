import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styles';
import { Season } from 'app/store/modules/@types';
import { SidebarButton, StyledSidebarButton } from '@next/ui/atoms/SidebarButton';
import { changeSeason, resetToInitialFiltersWithSaveViolationAndSeason } from 'app/store/modules/sidebar/actions';
import { selectModuleSidebarSeason } from 'app/store/modules/sidebar/selectors';
import { SIDEBAR_SESASONS } from '@next/ui/organisms/TopSidebar/constants';
import { useEventCallback } from '@next/hooks/useEventCallback';

const checkSeasonActive = (seasonInStore: Season, seasonItem: Season) => {
  if (seasonInStore === Season.MIXED) {
    return true;
  }
  return seasonInStore === seasonItem;
};

type Props = {
  isDisabled: boolean;
};

const PickSeason: React.FC<Props> = React.memo((props) => {
  const dispatch = useDispatch();
  const seasonActive = useSelector(selectModuleSidebarSeason);

  const onSeasonBtnClick = useEventCallback((event) => {
    const targetSeason = (event.target as HTMLButtonElement).value as Season;
    let newSeason = null;

    if (seasonActive !== Season.MIXED) {
      newSeason = Season.MIXED;
    } else {
      if (targetSeason === Season.ALL) {
        newSeason = Season.WINTER;
      } else {
        newSeason = Season.ALL;
      }
    }
    dispatch(
      changeSeason(newSeason),
    );
    dispatch(resetToInitialFiltersWithSaveViolationAndSeason());
  }, [seasonActive]);

  return (
    <SeasonContainer>
      <span>Сезон</span>
      {
        SIDEBAR_SESASONS.map(
          season =>
            <SidebarButton
              key={season.id}
              title={season.title}
              isActive={checkSeasonActive(seasonActive, season.id)}
              value={season.id}
              onClick={onSeasonBtnClick}
              disabled={props.isDisabled}
            />
        )
      }
    </SeasonContainer>

  );
});

export default PickSeason;

export const SeasonContainer = styled.div`
  position: relative;

  & > span {
    margin-right: 10px;
  }

  ${StyledSidebarButton} {
    margin: 2.5px 5px;
  }
`;
