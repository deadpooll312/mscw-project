import * as React from 'react';
import styled from 'styled-components';

type Props = {
  iconUrl: string;
  isOpen: boolean;
  onClick(): void;
};

const Central = styled.div`
  width: 52px;
  height: 50px;
  margin-left: -10px;
  margin-bottom: 10px;
  background-color: #fff;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  cursor: pointer;
  pointer-events: initial;
  &&& {
    background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};
    transition: background-color 0.5s, color 0.5s;
  }
  &::after {
    content: " ";
    position: absolute;
    width: 30px;
    height: 30px;
    margin: -20px 0 20px 0;
    border-bottom-right-radius: 12px;
    box-shadow: 16px 14px 0px -2px ${({ theme }) => theme.colors.dashboardCard.cardBackground};
    transition: box-shadow 0.5s;
    top: 70px;
    left: -10px;
    transform: scale(-1,-1);
  }
`;

const Img = styled.img<{ isOpen: boolean }>`
    margin-top: 10px;
    margin-left: 10px;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(0deg)' : 'rotate(-180deg)')};
    transition: 0.7s ease;
`;

const SidebarToggleButton: React.FC<Props> = React.memo(
  (props) => (
    <Central onClick={props.onClick}>
      <Img id="arrow" src={props.iconUrl} isOpen={props.isOpen} />
    </Central>
  ),
);

export default SidebarToggleButton;
