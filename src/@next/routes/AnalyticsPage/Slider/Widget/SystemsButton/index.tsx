import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Icon } from 'antd';

import { AvalibleCurrentSystems } from 'app/store/modules/analytics/types';
import { ButtonType } from '@next/routes/AnalyticsPage/Slider/Widget/Button/styled';
import { SYSTEMS_ALL } from 'app/store/modules/analytics/constants';
import { wrapChangeCurrentSystems } from 'app/store/modules/analytics/actions';
import { selecteCurrentSystems } from 'app/store/modules/analytics/selectors';

type Props = {
  type: AvalibleCurrentSystems;
};

const title = {
  CAFAP: 'Центр автоматизированной фиксации административных правонарушений',
  EDC: 'Единый диспетчерский центр',
  OATI: 'Объединение административно-технических инспекций',
  MGI: 'Мосжилинспекция',
  CODD: 'Центр организации дорожного движения',
  NG: 'Наш Город',
  ALL: 'Все системы'
};

const systemsIcons = {
  CAFAP: require('static/icons_text/ЦАФАП.png'),
  EDC: require('static/icons_text/ЕДЦ.png'),
  OATI: require('static/icons_text/ОАТИ.png'),
  MGI: require('static/icons_text/МЖИ.png'),
  CODD: require('static/icons_text/ЦОДД.png'),
  NG: require('static/icons_text/НГ.png'),
  ALL: require('static/all.png'),
};

const isAll = (type: AvalibleCurrentSystems) => type === 'ALL';

const ALL_SYSTEM_LENGTH = SYSTEMS_ALL.length;

const AnalyticsPageWidgetSystemsButton: React.FC<Props> = React.memo(
  (props) => {
    const currentSystems = useSelector(selecteCurrentSystems);
    const isSelected = (isAll(props.type) && currentSystems.size === ALL_SYSTEM_LENGTH) || (currentSystems.has(props.type) && currentSystems.size !== ALL_SYSTEM_LENGTH);
    
    const dispatch = useDispatch();

    const handleChange = React.useCallback(
      () => {
        let currentSystemsNew = new Set(currentSystems.size === ALL_SYSTEM_LENGTH ? [] : currentSystems) as Parameters<typeof wrapChangeCurrentSystems>[0];

        if (isSelected) {
          currentSystemsNew = new Set(currentSystems);

          currentSystemsNew.delete(props.type);
        } else {
          if (isAll(props.type)){
            currentSystemsNew = new Set(SYSTEMS_ALL);
          } else {
            currentSystemsNew.add(props.type);
          }
        }

        dispatch(
          wrapChangeCurrentSystems(
            currentSystemsNew,
          ),
        );
      },
      [props.type, currentSystems, isSelected],
    );

    const SystemIcon = React.useMemo(
      () => {
        return () => <Avatar shape="square" src={systemsIcons[props.type]} />;
      },
      [props.type],
    );

    return (
      <ButtonType
        type={isSelected ? 'primary' : 'default'}
        onClick={handleChange}
        title={title[props.type]}
      >
        <Icon component={SystemIcon} />
      </ButtonType>
    );
  },
);

export default AnalyticsPageWidgetSystemsButton;
