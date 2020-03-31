import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Icon } from 'antd';

import { Season } from 'app/store/modules/@types';
import { ButtonType } from './styled';
import { selectCurrentSeason } from 'app/store/modules/analytics/selectors';
import { changeSeason } from 'app/store/modules/analytics/actions';

type Props = {
  type: Season;
};

const icons = {
  [Season.MIXED]: require('static/icons_text/all.png'),
  [Season.WINTER]: require('static/icons_text/winter.png'),
  [Season.ALL]: require('static/icons_text/summer.png'),
};

const AnalyticsPageSeasonButton: React.FC<Props> = React.memo(
  (props) => {
    const currentSeason = useSelector(selectCurrentSeason);
    const isSelected = currentSeason === props.type;

    const dispatch = useDispatch();

    const handleChange = React.useCallback(
      () => {
        if (!isSelected) {
          dispatch(
            changeSeason(props.type),
          );
        }
      },
      [props.type, isSelected],
    );

    const ComponentIcon = React.useMemo(
      () => {
        return () => <Avatar shape="square" src={icons[props.type]} />;
      },
      [props.type],
    );

    return (
      <ButtonType
        type={isSelected ? 'primary' : 'default'}
        onClick={handleChange}
      >
        <Icon component={ComponentIcon} />
      </ButtonType>
    );
  },
);

export default AnalyticsPageSeasonButton;
