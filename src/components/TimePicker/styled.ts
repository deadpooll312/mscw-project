import styled from 'styled-components';
import { Button, Input } from 'antd';
import { lighten } from 'polished';

export const StyledTimePicker = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const StyledContent = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledHour = styled.div`
  display: inline-block;
  margin: 5px;
`;

export const StyledIncDec = styled.div`
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  line-height: 0;
`;

export const StyledTimeInput = styled(Input)`
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 0;
`;

export const StyledSeparator = styled.span`
  font-weight: bold;
  font-size: 20px;
  display: inline-block;
`;

export const StyledFooter = styled.div`
  width: 100%;
`;

export const StyledApplyButton = styled(Button)`
    &.ant-btn {
        width: 100%;
        border-radius: 6px;
        background-color: ${({theme}) => theme.colors.palette.blue5};
        color: #dee2e8;
        font-family: 'Oswald-Bold';
        letter-spacing: 0.2px;
        text-transform: uppercase;

        &:hover, &:focus {
            color: #dee2e8;
            background-color: ${({theme}) => lighten(0.1, theme.colors.palette.blue5)};

            transform: scale(1.05, 1.05);
        }
    }
`;
