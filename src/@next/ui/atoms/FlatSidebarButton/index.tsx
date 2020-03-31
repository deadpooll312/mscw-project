import * as React from 'react';
import styled from 'styled-components';
import { ThemedStyledProps } from 'styles';
import { useStyledTheme } from 'styles/themes/hooks';

type FlatSidebarButtonProps = {
  isActive?: boolean;
  title: string;
  icon?: any;
  value: any;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
};

const FlatSidebarButton: React.FC<FlatSidebarButtonProps> = React.memo((props)=> {
  const { isActive } = props;
  const theme = useStyledTheme();
  return (
    <StyledFlatSidebarButton
      color={isActive ? theme.colors.palette.yellow3 : theme.colors.palette.textGrey2 }
      onClick={props.onClick}
      value={props.value}
    >
      {props.title}
    </StyledFlatSidebarButton>
  );
});

export const StyledFlatSidebarButton = styled.button`
  background-color: ${(props: ThemedStyledProps<{}>) => props.theme.colors.palette.white1 };
  border: none;
  font-family: ${(props: ThemedStyledProps<{}>) => props.theme.fonts.family.sidebar.extra };
  font-size: ${(props: ThemedStyledProps<{}>) => props.theme.fonts.size.default };

  &&:focus {
    outline: none;
  }
  &&:hover{
    cursor: pointer;
  }
`;

export default FlatSidebarButton;