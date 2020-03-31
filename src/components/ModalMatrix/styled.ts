import styled from 'styled-components';
import { Button } from 'antd';
import { css, ThemedStyledProps } from 'styles';
import FlexContainer from '@next/ui/atoms/FlexContainer';

const TableContainerMedia = css`
  @media (min-width: 1600px) and (max-width: 4000px)  {
    max-height: 480px;
  }
`;

export const CloseModalButton = styled(Button)`
  && {
    position: absolute;
    top: 0;
    right: 0;
    background-color: ${({ theme }) => theme.colors.dashboardCard.boxShadow} !important;
    transition: background-color 0.5s;
    border: none;
    box-shadow: none;
  }
`;

export const MatrixContent = styled.div`
  h2{
    color: ${({ theme }) => theme.colors.dashboardCard.defaultText} !important;
    transition: color 0.5s;
  }
  font-family: 'Circe-Regular';
  font-weight: 100;
  padding: 20px;
  .ant-tabs-nav .ant-tabs-tab-active{
    color: #8a3b4d;
    font-weight: 100;
  }
  .ant-tabs-nav{
    color: ${({ theme }) => theme.colors.dashboardCard.defaultText} !important;
    transition: color 0.5s;
  }
  .ant-tabs-ink-bar{
    background-color: #8a3b4d;
  }
  .ant-tabs-nav .ant-tabs-tab:hover{
    color: #8a3b4d;
  }
  .ant-tabs-nav-scroll{
    text-align: center;
  }
`;

export const MatrixTitle = styled.p<{hasMargin?: boolean}>`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText} !important;
  transition: color 0.5s;
  margin-left: 30px;
  line-height: 1;
  margin-bottom: ${({hasMargin}) => hasMargin ? '1em' : 0};
`;

export const MatrixTitleSecond = styled.p`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText} !important;
  transition: color 0.5s;
  margin-left: 30px;
  line-height: 1;
`;

export const ColorArrowWrap = styled.div`
  margin-top: 80px;
`;

export const ColorArrowWrapSecond = styled.div`
  margin-top: 200px;
`;

export const ColorLine = styled.div`
  height: 10px;
  margin-right: 50px;
  margin-left: 30px;
  background: linear-gradient(90deg, rgba(151,52,74,1) 0%, rgba(76,164,157,1) 100%);
`;

export const ColorArrow = styled.div`
  position: fixed;
  right: 45px;
  top: 141px;
  height: 16px;
  width: 16px;
  &::after{
    content: ''; 
    position: absolute; /* Абсолютное позиционирование */
    left: -10px; 
    bottom: -61px; /* Положение треугольника */
    border: 13px solid transparent; 
    border-left: 20px solid #4ca49d;
  }
`;

export const ColorArrowSecond = styled.div`
  position: fixed;
  right: 45px;
  top: 141px;
  height: 16px;
  width: 16px;
  &::after{
    content: ''; 
    position: absolute; /* Абсолютное позиционирование */
    left: -10px; 
    bottom: -166px; /* Положение треугольника */
    border: 13px solid transparent; 
    border-left: 20px solid #4ca49d;
  }
`;

export const Row = styled.div`
  height: 150px;
  width: 87%;
  margin: 0 auto;
  margin-top: -70px;
`;

export const FiveHours = styled.div`
  color: #000;
  line-height: 1;
  margin-right: 5px;
  height: 100%;
  width: 15%;
  display: inline-block;
  vertical-align: top;
  p {
    margin-left: 10px;
  }
`;

export const FiveHoursSecondOne = styled.div`
  color: #000;
  line-height: 1;
  margin-right: 5px;
  height: 100%;
  width: 17%;
  display: inline-block;
  vertical-align: top;
  margin-top: -80px;
  p {
    margin-left: 10px;
  }
`;

export const FiveHoursSecondTwo = styled.div`
  color: #000;
  line-height: 1;
  margin-right: 5%;
  margin-left: 7%;
  height: 100%;
  width: 17%;
  display: inline-block;
  vertical-align: top;
  p {
    margin-left: 10px;
  }
`;

export const FirstDay = styled.div`
  color: #000;
  line-height: 1;
  margin-right: 5px;
  height: 100%;
  width: 28%;
  display: inline-block;
  vertical-align: top;
  p {
    margin-left: 10px;
  }
`;

export const SecondDay = styled.div`
  margin: 0 5px 0 5px;
  height: 100%;
  width: 26%;
  display: inline-block;
`;

export const ThirdDay = styled.div`
  color: #000;
  margin-right: 5px;
  height: 100%;
  width: 25%;
  display: inline-block;
`;

export const ThirdDaySecond = styled.div`
  color: #000;
  margin-right: 5px;
  height: 100%;
  width: 25%;
  display: inline-block;
`;

export const Top = styled.div`
  height: 60%;
  border-left: solid 1px gray;
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText} !important;
`;

export const TopSecond = styled.div`
  height: 60%;
  border-left: solid 1px gray;
  border-right: solid 1px gray;
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText} !important;
`;

export const Middle = styled.div`
  border-right: solid 1px gray;
  border-bottom: solid 1px gray;
  border-left: solid 1px gray;
  height: 13%;
`;

export const FirstTop = styled.div`
  height: 60%;
  border-left: solid 1px gray;
`;

export const SecondTop = styled.div`
  height: 60%;
`;

export const Bottom = styled.div`
  width: 50%;
  height: 13%;
  border-right: solid 1px gray; 
`;

export const Footer = styled.div`
  height: 14%;
  text-align: center;
  font-size: 19px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText} !important;
`;

export const Discription = styled.p`
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText} !important;
  position: absolute;
  line-height: 1;
  left: 22%;
  margin-top: 9px;
`;

export const DiscriptionSecond = styled.p`
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText} !important;
  position: absolute;
  line-height: 1;
  left: 21.1%;
  margin-top: 50px;
  height: 80px;
  padding-left: 10px;
`;

export const DiscriptionSecondTwo = styled.p`
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText} !important;
  position: absolute;
  line-height: 1;
  left: 43%;
  margin-top: 129px;
  height: 80px;
  padding-left: 7px;
`;

export const Criteria = styled.div`
  width: 96%;
  margin: 0 auto;
  margin-top: 60px;
`;

export const LeftItem = styled.div`
  display: inline-block;
  width: 50%;
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText} !important;
  font-size: 14px;
  vertical-align: top;
  min-height: 85px;
`;

export const RightItem = styled.div`
  display: inline-block;
  width: 50%;
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText} !important;
  font-size: 14px;
  vertical-align: top;
  min-height: 85px;
`;

export const Dot = styled.div`
  /* display: inline-block; */
  width: 5%;
  font-size: 40px;
  float: left;
  min-height: 85px;
  span {
    position: relative;
    top: -21px;
  }
`;

export const Text = styled.div`
  display: inline-block;
  width: 95%;
  height: 100%;
`;

export const SnowIcon = styled.div`
    content:  url('static/snow.png');
    width: 23px;
    height: 24px;
    position: absolute;
    margin-left: -28px;
`;

export const EmptyContainer = styled.div`
  width: 100%;
  border-right: solid 1px gray;
  height: 80px;
`;

export const SnowContent = styled.div`
  font-family: 'Circe-Regular';
  font-weight: 100;
  padding: 20px;
  .ant-tabs-nav .ant-tabs-tab-active{
    color: #8a3b4d;
    font-weight: 100;
  }
  .ant-tabs-ink-bar{
    background-color: #8a3b4d;
  }
  .ant-tabs-nav .ant-tabs-tab:hover{
    color: #8a3b4d;
  }
  .ant-tabs-nav-scroll{
    text-align: center;
  }
`;

export const DescriptionRow = styled.div`
  p{
    display: inline-block;
    color: ${({ theme }) => theme.colors.dashboardCard.defaultText} !important;
  }
`;

export const DescriptionRight = styled.div`
  display: inline-block;
  margin-left: 10px;
`;

export const GreenIcon = styled.div`
    content:  url('static/greenCross.png');
    width: 16px;
    height: 16px;
    display: inline-block;
    position: relative;
    top: 4px;
    margin-right: 3px;
`;

export const RedIcon = styled(GreenIcon)`
    content:  url('static/redCross.png');
`;

export const SnowTitle = styled.p`
    display: inline-block;
    background-color: #94344b;
    color: #fff;
    font-size: 18px;
    width: fit-content;
    padding: 3px 18px;
    font-weight: bold;
    border-radius: 10% /50%;
`;

export const TableContainer = styled.div<{ maxHeight: string; noMedia?: boolean }>`
  max-height: ${({ maxHeight }) => maxHeight};
  overflow: auto;
  ${({noMedia}) => noMedia ? null : TableContainerMedia }
  /* width: 99%; */
`;

export const TableTh = styled.th`
  position: sticky;
  z-index: 10;
  top: 0;
  background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground} !important;
  transition: background-color 0.5s;
`;

export const Table = styled.table`
  font-family: 'Circe-Regular';
  border-collapse: collapse;
  width: 99%;
  td, th {
    padding: 5px;
    color: ${({ theme }) => theme.colors.dashboardCard.defaultText} !important;
  }
  th {
    text-align: center;
    font-family: 'Circe-Bold';
    font-size: 14px;
    border-right: dashed 1px gray;
    border-left: dashed 1px gray;
    &:first-child, :last-child {
      border-left: none;
    }
    &:last-child {
      border-right: none;
    }
  }
  td {
    border-right: dashed 1px gray;
    border-left: dashed 1px gray;
    &:first-child {
      border-left: none;
    }
  }
`;

export const TableMixed = styled(Table)`
  td, th {
    padding: 0;
  }
  th {
    font-weight: 800;
    font-size: 18px;
    background-color: ${({ theme }) => theme.colors.dashboardCard.tableMatrixBackground} !important;
    border: 1px solid;
    border-color: ${({ theme }) => theme.colors.dashboardCard.boxShadow};
    &:first-child {
      border-left: 1px solid black;
    }
    &:last-child {
      border-right: 1px solid;
      border-color: ${({ theme }) => theme.colors.dashboardCard.boxShadow};
    }
  }
  td {
    font-weight: 800;
    font-size: 15px;
    padding: 1px 5px;
    border: 1px solid;
    border-color: ${({ theme }) => theme.colors.dashboardCard.boxShadow};
    &:first-child {
      border-left: 1px solid;
      border-color: ${({ theme }) => theme.colors.dashboardCard.boxShadow};
    }
    &:last-right {
      border-left: 1px solid;
      border-color: ${({ theme }) => theme.colors.dashboardCard.boxShadow};
    }
  }
`;

export const BoldTd= styled.td`
  font-family: 'Circe-Bold';
  font-size: 16px;
`;

export const ColorTr= styled.tr`
  background-color: ${({ theme }) => theme.colors.dashboardCard.tableMatrixBackground} !important;
  transition: background-color 0.5s;
`;

export const CenterTd= styled.td`
  text-align: center;
`;

type TdMixedMatrixProps = {
  width?: number | string;
  textAlign?: 'center';
  yellowBgIfHasValue?: boolean;
};
export const TdMixedMatrix = styled.td<TdMixedMatrixProps>`
  background-color: ${({ yellowBgIfHasValue }) => yellowBgIfHasValue ? '#f9e395' : 'initial' };
  text-align: ${({ textAlign }) => textAlign ?? 'initial'};
`;

export const BlockWithPadding = styled.div<{ paddingValue: string }>`
  padding: ${({ paddingValue }) => paddingValue ?? 'initial'};
`;

export const ColorSpan = styled.span<{ colorText?: string }>`
  color: ${({ colorText }) => colorText ?? 'initial' };
`;

export const FromSixToTenFooter = styled(FlexContainer)`
  color: ${({theme}: ThemedStyledProps<{}>) => theme.colors.dashboardCard.defaultText};
  & > p {
    margin-bottom: 0;
  }
`;
