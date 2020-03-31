import styled, { css } from 'styled-components';
import { Button } from 'antd';

const isOpenCss = css`
  transform: translate3d(calc(-100% - 10px), 0, 0);
`;

export const SidebarContainer = styled.section<{ isOpen?: boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 10px;
  top: 10px;
  /* TODO пока не удаляем */
  /* bottom: 10px; */
  width: 35vw;
  max-width: 400px;
  opacity: 1;
  border-radius: 6px;
  border-top-right-radius: 0px;
  box-shadow: 0px 15px 15px 0 rgba(0, 0, 0, 0.15);
  ${({ isOpen }) => !isOpen && isOpenCss};

  &&& {
    background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};
    color: ${({ theme }) => theme.colors.dashboardCard.defaultText};

    transition: transform 0.5s, background-color 0.5s, color 0.5s;
  }

  z-index: 1;
  @media (min-width: 2000px) {
    max-width: 25vw;
  }
`;

export const Main = styled.main`
  height: 100%;
  position: relative;
`;

export const Title = styled.span`
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  font-weight: 500;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000000;
`;
export const Close = styled.div`
  font-size: 1.2rem;
  padding: 4px;
  font-weight: 600;
  user-select: none;
  cursor: pointer;
  position: absolute;
  right: 4px;
`;
export const Hr = styled.div`
  height: 1px;
  width: 100%;
  mix-blend-mode: undefined;
  background-color: #d9e1e4;
  border: solid 1px #d9e1e4;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  pointer-events: none;
  transform: translate3d(100%, 0, 0);
  right: -10px;
  height: 100%;
  width: 40px;

  .ant-btn {
    padding: 1px 6px;
  }

  .ant-btn:hover {
    color: #2b55e6;
    border-color: #d9d9d9;
  }
  .ant-btn:focus {
    color: rgba(0, 0, 0, 0.65);
    border-color: #d9d9d9;
  }
`;

export const TopButtons = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .ant-btn + .ant-btn {
    margin-top: -2px;
  }
  .ant-btn:not(:first-child) {
    border-radius: 0;
  }

  .ant-btn:nth-child(2):not(:last-child), .ant-btn-group > span:nth-child(2):not(:last-child) > .ant-btn {
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    border-top: none;
  }

  .ant-btn:last-child:not(:first-child) {
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
    border-bottom: none;
  }
`;

export const CenterButtons = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 42px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 10;

  >*:nth-child(n+2) {
    margin-top: 10px;
  }

  .ant-btn:last-child:not(:first-child) {
    border-bottom: none;
  }
`;

export const BottomButton = styled.div`
  width: 40px;
  display: flex;
  flex: 1;
  align-items: flex-end;
  /* height: 187px; */
`;

export const StyledButton = styled(Button)`
  height: 40px;
  width: 100%;
  pointer-events: initial;
  border-top: none;
  background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground} !important;
  transition: background-color 0.5s;
`;

export const StyledSwitcher = styled.div`
  height: 70px;
  pointer-events: initial;
`;

export const ReturnIcon = styled.div`
  content:  url('static/return.png');
  width: 16px;
  height: 16px;
  margin: 0 auto;
`;

export const StyledMapButton = styled(Button)<{isActive: boolean}>`
  .ant-button {
    color: rgba(0, 0, 0, 0.65);
  }
  &&& {
    background-color: ${({ isActive, theme }) => isActive ? theme.colors.dashboardCard.buttonActive : theme.colors.dashboardCard.cardBackground};
    padding: 6px;
    width: 42px;
    height: 40px;
    pointer-events: initial;
    cursor: pointer;
    color: ${({ isActive, theme }) => isActive ? theme.colors.palette.white1 : theme.colors.dashboardCard.defaultText};

    border-color: #f0f5ff;
  }
`;

export const PointIcon = styled.div`
  content: url('static/pin.png');
  width: 18px;
  margin: 6px;
`;
