import * as React from 'react';
import { Season } from 'app/store/modules/@types';

import SwitcherSeasonButton from '@next/ui/molecules/SeasonSwitcherButton';
import SeasonButtonsContainer from '@next/ui/atoms/SeasonButtonsContainer';
import SidebarRightButtonsContainer from '@next/ui/atoms/SidebarRightButtonsContainer';

type SwitcherComponentProps = {
  selectedState: Season;
  onChange(state: Season): void;
};

const SEASON_BUTTONS = [Season.ALL, Season.MIXED, Season.WINTER];

const SeasonsSwitcher: React.FC<SwitcherComponentProps> = React.memo(
  (props) => {
    return (
      <SeasonButtonsContainer>
        <SidebarRightButtonsContainer>
          {
            SEASON_BUTTONS.map(
              (season) => (
                <SwitcherSeasonButton
                  key={season} 
                  season={season}
                  isActive={season === props.selectedState}
                  onChange={props.onChange}
                />
              )
            )
          }
        </SidebarRightButtonsContainer>
      </SeasonButtonsContainer>
    );
  },
);

export default SeasonsSwitcher;
