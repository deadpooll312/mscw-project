import * as React from 'react';
import styled from 'styles';
import { Button, Icon, Avatar } from 'antd';

import imgLegend from 'static/svg/legend.svg';

type Props = {
  onClick: () => any;
};

const LegendButtonIcon = () => <Avatar shape="square" src={imgLegend} />;

const LegendButton: React.FC<Props> = React.memo(
  (props) => {
    return (
      <ButtonWrap
        size="large"
        onClick={props.onClick}
      >
        <Icon component={LegendButtonIcon} />
        { props.children }
      </ButtonWrap>
    );
  },
);

export default LegendButton;

const ButtonWrap = styled(Button)`
  pointer-events: initial;
  margin-left: 400px;

  &.ant-btn {
    padding: 0 10px;
    border: none;
    border-radius: 6px;

    background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};
    &:active, :focus, :hover{
      background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};
    }

    transition: background-color 0.5s;
  }
  span {
    color: ${({ theme }) => theme.colors.dashboardCard.defaultText};
    transition: color 0.5s;
  }
  .anticon, .anticon + span {
    vertical-align: baseline;
  }
  @media (min-width: 2000px) and (max-width: 4000px)  {
    margin-left: 510px;
  }
`;
