import styled from 'styled-components';
import { Radio, DatePicker, Icon } from 'antd';
import { lighten } from 'polished';

export const StyledIcon = styled(Icon)`
    /* margin-right: 10px; */
    @media (max-width: 768px) {
        margin-right: 4px;
    }
`;

export const StyledDatePicker = styled(DatePicker)`
    &.ant-calendar-picker {
        visibility: hidden;
        position: absolute;
        left: 0;
        top: 35px;
        width: 100%;

    }
    .ant-input{
        height: 30px;
        border: none;
    }

`;

export const StyledRangeDatePicker = styled(DatePicker.RangePicker)`
    &.ant-calendar-picker {
        visibility: hidden;
        position: absolute;
        left: 0;
        top: 35px;
        width: 100%;

    }
    .ant-input{
        height: 30px;
        border: none;
    }

`;

export const DateRadioGroup = styled(Radio.Group)`
    &.ant-radio-group {
        background-color: rgba(222,226,232,0.6);
        border-radius: 6px;
        padding: 2px;
        display: flex;
        min-height: 35px;
        min-width: 150px;
    }
`;

export const StyledFormattedDate = styled.span`
    margin-left: 10px;
`;

export const StyledRadioDate = styled(Radio.Button)<{ blockWidth?: number }>`
    width: ${({ blockWidth }) => `${blockWidth || 50}`}%;

    &.ant-radio-button-wrapper{
        text-align: center;
        margin: 0 2.5px;
        height: 30px;
        >span {
            font-family: 'Circe-Bold';
            font-size: 14px;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.43;
            letter-spacing: 0.2px;
            @media (max-width: 768px) {
                font-size: 11px;
            }
        }
    }

    &.ant-radio-button-wrapper:last-child, &.ant-radio-button-wrapper:first-child{
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        opacity: 0.6;
        background: transparent;
        border: none;
        color: ${({ theme }) => theme.colors.dashboardCard.defaultText};
    transition: color 0.5s, color 0.5s;
    }

    &.ant-radio-button-wrapper-checked:first-child, &.ant-radio-button-wrapper-checked:last-child{
        border-radius: 6px;
        background-color: ${({ theme }) => theme.colors.dashboardCard.radioDate};
        color: ${({ theme }) => theme.colors.dashboardCard.radioDateColor};;
        border: none;
        opacity: 1;
        &&& {
            &:hover {
                background-color: ${({ theme }) => lighten(0.1, theme.colors.dashboardCard.radioDate)};

                transform: scale(1.05, 1.05);
            }
        }

    transition: color 0.5s, background-color 0.5s, transform 0.5s;
    }

    &.ant-radio-button-wrapper:not(:first-child)::before{
        display: none;
    }

`;

