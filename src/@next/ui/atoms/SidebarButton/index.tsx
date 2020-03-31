import * as React from 'react';
import styled, { css } from 'styles';
import { useStyledTheme } from 'styles/themes/hooks';
import { Icon, Button } from 'antd';
import { lighten } from 'polished';
import { ButtonProps } from 'antd/lib/button';

type StyledSidebarButtonProps = {
  color?: string;
  backgroundcolor?: string;
  font?: string;
  padding?: string;
  fontSize?: string;
  bordercolor?: string;
  outlinecolor?: string;
  margin?: string;
};

type SidebarButtonProps = {
  title: React.ReactNode;
  isActive?: boolean;
  isFilterButton?: boolean;
  value: any;
  backGroundColor?: string;
  margin?: string;
  onClick?<E, C, T extends any>(event: React.BaseSyntheticEvent<E, C, {value: T}>): void;

  icon?: ButtonProps['icon'];

  disabled?: boolean;
};

const SidebarButton: React.FC<SidebarButtonProps> = React.memo(
  (props) => {
    const theme = useStyledTheme();
    const { isActive, isFilterButton, margin } = props;
    let backgroundColor = theme.colors.palette.white1;
    let color = theme.colors.palette.white1;

    if (isFilterButton) {
      backgroundColor = theme.colors.palette.grey6;
    } else {
      backgroundColor = isActive ? props.backGroundColor ?? theme.colors.palette.blue5 : theme.colors.dashboardCard.cardBackground;
      color = isActive ? theme.colors.palette.white1 : theme.colors.dashboardCard.defaultText;
    }
    const onClick = React.useCallback((event) => {
      if (!props.disabled) {
        if (props.onClick) {
          props.onClick({...event, target: { value: props.value } });
        }
      }
    }
    , [props.onClick, props.value, props.disabled]);

    const renderTitle = React.useMemo(
      () => {
        if (isFilterButton) {
          return (
            <AdvancedTitle>
              <span>{props.title}</span>
              <CloseSidebarIconBtn>
                <Icon type="close"/>
              </CloseSidebarIconBtn>
            </AdvancedTitle>
          );
        }

        return props.title;
      },
      [props.title],
    );

    return (
      <StyledSidebarButton
        icon={props.icon}
        backgroundcolor={backgroundColor}
        bordercolor={isActive ? 'transparent' : theme.colors.dashboardCard.boxShadow}
        outlinecolor={isActive ? '#fff' : theme.colors.dashboardCard.boxShadow}
        margin={margin}
        color={color}
        onClick={onClick}
        value={props.value}

        children={renderTitle}
        disabled={props.disabled}
      />
    );
  },
);

export const StyledSidebarButton = styled(Button)<StyledSidebarButtonProps>`
  &&& {
    color: ${(props) => props.color || props.theme.colors.palette.white1 };
    background-color: ${(props) => props.backgroundcolor || props.theme.colors.palette.yellow1 };
    font-family: ${(props) => props.font || props.theme.fonts.family.sidebar.extra };
    font-size: ${(props) => props.fontSize || props.theme.fonts.size.default };
    padding: ${(props) => props.padding || '7px 9px' };
    border-radius: 5px;
    border-color: ${(props) => props.bordercolor};
    height: 35px;
    margin: ${(props) => props.margin};

    &:focus {
      outline-color: ${(props) => props.outlinecolor};
      outline-width: 4px;
      outline-offset: -2px;
    }

    transition: color 0.5s, background-color 0.5s, transform 0.5s;

    ${({ disabled, backgroundcolor, theme }) => disabled
    ? (
      css`
          cursor: disabled;

          &:hover{
            background-color: initial;

            transform: initial;
          }
        `
    )
    : (
      css`
          cursor: pointer;

          &:hover{
            background-color: ${lighten(0.1, backgroundcolor || theme.colors.palette.yellow1)};

            transform: scale(1.05, 1.05);
          }
        `
    )
};
  }
`;

export const AdvancedTitle = styled.div`
  position: relative;
  width: 100%;
  padding: 0 10px 0 0;
`;

export const CloseSidebarIconBtn = styled.div`
  position: absolute;
  top: -5px;
  border-radius: 10px;
  border: 1px solid white;
  background-color: white;
  right: -6px;
  width: 10px;
  height: 10px;
  text-align: center;

  &&& .anticon-close {
    font-size: 6px;
    width: 100%;
    height: 100%;
    margin: 0;
    position: relative;
    display: block;
    color: black;
  }

  &&& svg {
    margin-top: 15%;
  }
`;

export {
  SidebarButton
};
