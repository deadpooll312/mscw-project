import * as React from 'react';

import { Season } from 'app/store/modules/@types';
import SeasonButton from '@next/ui/atoms/SeasonButton';
import SeasonIcon from '@next/ui/atoms/SeasonIcon';

type Props = {
  season: Season;
  onChange(state: Season): void;
  isActive: boolean;
};

const SwitcherSeasonButton: React.FC<Props> = React.memo(
  (props) => {
    const handleClick = React.useCallback(
      () => {
        props.onChange(props.season);
      },
      [props.onChange, props.season],
    );

    return (
      <SeasonButton
        size="large" 
        isActive={props.isActive}
        onClick={handleClick}
      >
        <SeasonIcon season={props.season}/>
      </SeasonButton>
    );
  },
);

export default SwitcherSeasonButton;
