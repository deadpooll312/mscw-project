import * as React from 'react';
import styled from 'styles';
import { useDispatch, useSelector } from 'react-redux';
import { selectAppThemeName } from 'app/store/modules/app/selectors';

import { Button, Icon, Avatar, Popover } from 'antd';
import { logoutSaga } from 'app/store/modules/app/actions';
import { selectLogin } from 'app/store/modules/app/selectors';
import { HelpInfoDropdown } from '@next/routes/MapPage/TopRight/UserInfoBlock/HelpInfoDropdown';
import { lighten } from 'polished';

const icons = {
  help: require('static/help.png'),
  exit: require('static/exit.png'),
  helpWhite: require('static/helpWhite.png'),
  exitWhite: require('static/exitWhite.png'),
};

type Props = {};

const ExitPopover = <b>Выход из Системы</b>;

const useIconExit = React.memo(() => <Avatar shape="square" src={icons.exit} />);
const useIconHelp = React.memo(() => <Avatar shape="square" src={icons.help} />);
const useIconHelpWhite = React.memo(() => <Avatar shape="square" src={icons.helpWhite} />);
const useIconExitWhite = React.memo(() => <Avatar shape="square" src={icons.exitWhite} />);

const UserInfoBlock: React.FC<Props> = React.memo(
  () => {
    const login = useSelector(selectLogin);
    const dispatch = useDispatch();
    const [isHelpInfoVisible, setHelpInfoVisible] = React.useState(false);

    const onLogout = React.useCallback(
      () => {
        dispatch(logoutSaga());
      },
      [],
    );
    const onHelpClick = React.useCallback(
      () => {
        // dispatch(downloadInstruction());
        setHelpInfoVisible(true);
      },
      [],
    );

    const setHiddenOther = React.useCallback(
      () => {
        setHelpInfoVisible(false);
      },
      [],
    );

    const themeName = useSelector(selectAppThemeName);

    return (
      <FlexContainer direction="row">
        <LoginWrap>{login}</LoginWrap>

        <Popover content={ExitPopover} placement="bottom">
          <ExitButton size="large" onClick={onLogout}>
            <Icon component={themeName === 'light' ? useIconExit : useIconExitWhite} />
          </ExitButton>
        </Popover>

        <HelopButton size='large' onClick={onHelpClick}>
          <Icon component={themeName === 'light' ? useIconHelp : useIconHelpWhite} />
        </HelopButton>
        <HelpInfoDropdown
          visible={isHelpInfoVisible}
          setHiddenOther={setHiddenOther}
        />
      </FlexContainer>
    );
  },
);

export default UserInfoBlock;

const FlexContainer = styled.div<{ direction: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  justify-content: space-between;
  position: relative;

  .ant-btn:last-child:not(:first-child){
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

const ExitButton = styled(Button)`
    height: 35px !important;
    width: 100%;
    cursor: pointer;

    &.ant-btn {
      border-radius: 0;
      margin-right: -2px;
      background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};
      border-color: ${({ theme }) => theme.colors.dashboardCard.boxShadow};
      transition: background-color 0.5s;
    }
    &.ant-btn:hover, .ant-btn:focus {
      color: ${({ theme }) => theme.colors.dashboardCard.defaultText };
      background-color: ${({ theme }) => lighten(0.1, theme.colors.dashboardCard.buttonActive)};
      border-color: ${({ theme }) => theme.colors.dashboardCard.boxShadow};
    }
`;

const HelopButton = styled(ExitButton)`
    &.ant-btn {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
`;

export const LoginWrap = styled.div`
  cursor: default;
  height: 35px;
  border-radius: 6px 0px 0px 6px;
  background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};
  transition: background-color 0.5s;
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText};
  padding: 8px 15px 7px 15px;
  font-weight: 500;
  border: 1px solid ${({ theme }) => theme.colors.dashboardCard.boxShadow};
  border-right: unset;
`;
