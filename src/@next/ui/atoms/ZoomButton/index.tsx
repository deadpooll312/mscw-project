import * as React from 'react';
import type Map from 'ol/Map';
import styled from 'styled-components';

import Icon from '@ant-design/icons';

import { Button, Avatar } from 'antd';
import CONSTANTS from '@next/constants';

const icons = {
  plus: require('static/svg/s-plus.svg'),
  minus: require('static/svg/s-minus.svg'),
};

type Props = {
  type: keyof typeof icons;
  map: Map;
};

const IconComponents: Record<keyof typeof icons, React.ComponentType> = {
  plus: () => <Avatar shape="square" src={icons.plus} />,
  minus: () => <Avatar shape="square" src={icons.minus} />,
};

const ZoomButton: React.FC<Props> = React.memo(
  (props) => {
    const handleClick = React.useCallback(
      () => {
        let zoom = props.map.getView().getZoom();

        switch (props.type) {
          case 'plus': {
            zoom += 0.5;
            break;
          }
          case 'minus': {
            zoom -= 0.5;
            break;
          }
        }

        props.map.getView().animate({
          zoom: Math.max(zoom, 0),
          duration: CONSTANTS.TIME.ONE_SECOND_IN_MS,
        });
      },
      [props.map, props.type],
    );
    return (
      <ButtonZoom size="large" onClick={handleClick}>
        <Icon component={IconComponents[props.type]} />
      </ButtonZoom>
    );
  },
);

export default ZoomButton;

const ButtonZoom = styled(Button)`
  background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground} !important;
  transition: background-color 0.5s, color 0.5s;
  padding: 0px !important;
`;
