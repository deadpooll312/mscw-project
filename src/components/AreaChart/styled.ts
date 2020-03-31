import styled from 'styled-components';

const StatisticsIcons = {
  positive: 'static/positive.png',
  negative: 'static/negative.png',
};

export const Title = styled.p`
    position: absolute;
    font-size: 17px;
    top: -22px;
    color: #000;
`;

export const Container = styled.div`
    margin: 0 auto;
    width: 90%;
    height: 205px;
    margin-top: 48px;
    position: relative;
    .recharts-cartesian-axis-tick-line{
      display: none;
    }
`; 

export const Indicators = styled.div`
    top: 15px;
    position: relative;
`;

export const Total = styled.p`
    font-size: 30px;
    color: #000;
    font-weight: bold;
    display: inline-block;
`;

export const StatisticsIcon = styled.div<{ type: keyof typeof StatisticsIcons }>`
    content: url(${({ type }) => StatisticsIcons[type]});
    display: inline-block;
    width: 25px;
    position: relative;
`;

export const Percent = styled.p<{ isPositive?: boolean }>`
    font-size: 17px;
    color: ${({ isPositive }) => isPositive  ? '#49a59d' : '#95354b'};
    font-weight: bold;
    display: inline-block;
    margin-left: 5px;
    position: relative;
    top: -13px;
`;

export const Period = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Date = styled.div`
`;

export const WrapTooltip = styled.div`
    background: #fff;
    border: solid 1px gray;
    border-radius: 5px;
    padding: 10px 20px;
`;
