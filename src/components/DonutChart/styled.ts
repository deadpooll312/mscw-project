import { DeltaProps, PieCenterIconProps } from './types';
import styled from 'styled-components';

export const PieChartCenterIcons = {
  flag: './static/flag.png',
  selected: './static/selected.png',
};

export const RelativeWrap = styled.div`
    position: relative;
    width: 100%;
`;

export const AbsoluteWrap = styled.div`
   position: absolute;
   left: 0;
   right: 0;
   bottom: 0;
   top: 0;
`;

export const StyledPieChartLegend = styled.ul`
    padding-left: 0;
    height: 50px;
    text-align: center;

    & > li {
        text-align: left;
    }

    & > li > p {
        margin-bottom: 0;
    }
`;

export const PieCenterIcon = styled.div<PieCenterIconProps>`
    content: url(${({ type }) => PieChartCenterIcons[type]});
    width: 50px;
    height: 50px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 30%;
`;

export const Container = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 15px;
    position: relative;
`;

export const Title = styled.h1`
    position: absolute;
    font-size: 23px;
    font-weight: bold;
    line-height: 1;
    margin-left: 40px;
    top: 10px;
`;

export const Total = styled.div`
    position: absolute;
    font-size: 26px;
    font-weight: bold;
    line-height: 1;
    margin-left: 40px;
    top: 320px;
    color: #000;
`;

export const TotalTitle = styled.div`
    display: inline-block;
    width: 47%;
    font-size: 16px;
    font-family: 'Circe-Bold';
    vertical-align: top;
`;

export const TotalElement = styled.div`
    display: inline-block;
    width: 53%;
`;

export const Delta = styled.span<DeltaProps>`
    color: ${({ isPositive }) => isPositive  ? '#49a59d' : '#95354b'};
    font-size: 18px;
`;

export const DeltaTitle = styled.div`
    display: inline-block;
    font-size: 10px;
    font-weight: 300;
    margin-left: 15px;
`;

export const WrapTooltip = styled.div`
    background: #fff;
    border: solid 1px gray;
    border-radius: 5px;
    padding: 10px 20px;
    span {
      font-size: 18px;
      font-weight: 900;
    };
`;

export const NoChartData = styled.div`
    display: inline-block;
    height: 100%;
    width: 50%;
    font-size: 20px;
    vertical-align: middle;
    margin-top: -40px;
    text-align: center;
`;
