import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Icon } from 'antd';

import { AvalibleCurrentTypes} from 'app/store/modules/analytics/types';
import { ButtonType } from '@next/routes/AnalyticsPage/Slider/Widget/Button/styled';
import { selecteCurrentTypes } from 'app/store/modules/analytics/selectors';
import { wrapChangeCurrentTypes } from 'app/store/modules/analytics/actions';

type Props = {
  type: AvalibleCurrentTypes;
};

const title = {
  tpu: 'ТПУ - транспортно-пересадочные узлы',
  dt: 'ДТ - дворовые территории',
  odh: 'ОДХ - объекты дорожного хозяйства',
  mkd: 'МКД - многоквартирные дома',
};

const icons = {
  tpu: require('static/icons_text/ТПУ.png'),
  mkd: require('static/icons_text/МКД.png'),
  dt: require('static/icons_text/ДТ.png'),
  odh: require('static/icons_text/ОДХ.png'),
};

const AnalyticsPageWidgetButton: React.FC<Props> = React.memo(
  (props) => {
    const currentTypes = useSelector(selecteCurrentTypes);
    const isSelected = currentTypes.has(props.type);

    const dispatch = useDispatch();

    const handleChange = React.useCallback(
      () => {
        let currentTypesNew = new Set(currentTypes) as Parameters<typeof wrapChangeCurrentTypes>[0];

        if (isSelected) {
          currentTypesNew = new Set(currentTypes);
          currentTypesNew.delete(props.type);
        } else {
          currentTypesNew.add(props.type);
        }

        dispatch(
          wrapChangeCurrentTypes(
            currentTypesNew,
          ),
        );
      },
      [props.type, currentTypes, isSelected],
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
        title={title[props.type]}
      >
        <Icon component={ComponentIcon} />
      </ButtonType>
    );
  },
);

export default AnalyticsPageWidgetButton;
