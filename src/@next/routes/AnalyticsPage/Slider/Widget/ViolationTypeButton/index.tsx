import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Icon } from 'antd';

import { ButtonType } from './styled';
import { selectCurrentViolationType } from 'app/store/modules/analytics/selectors';
import { changeViolationType } from 'app/store/modules/analytics/actions';
import { AnalyticsViolationTypes } from 'app/store/modules/@types';

type Props = {
  type: AnalyticsViolationTypes;
};

const icons = {
  [AnalyticsViolationTypes.ALL]: require('static/icons_text/all.png'),
  [AnalyticsViolationTypes.CRT]: require('static/icons_text/critical.png')
};

const AnalyticsPageViolationTypeButton: React.FC<Props> = React.memo(
  (props) => {
    const currentViolationType = useSelector(selectCurrentViolationType);
    const isSelected = currentViolationType === props.type;

    const dispatch = useDispatch();

    const handleChange = React.useCallback(
      () => {
        if (!isSelected) {
          dispatch(
            changeViolationType(props.type),
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

export default AnalyticsPageViolationTypeButton;
