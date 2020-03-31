import styled from 'styled-components';

export const ChartWrapper = styled.div`
    width: 900px;
    height: 300px;
    margin-top: 20px;
    /* margin-left: 150px; */
    /* margin-left: 100px; */
    .recharts-cartesian-axis-tick-line{
      display: none;
    }
    .recharts-surface{
      width: 1300px;
    }
`;

export const WrapTooltip = styled.div`
    background: #fff;
    border: solid 1px gray;
    border-radius: 2px;
    padding: 10px 15px;
`;

export const TooltipDescription = styled.p<{ stringColor?: any }>`
  color: ${({ stringColor }) => stringColor};
  font-family: 'Circe-Bold';
  &:first-child{
    margin-top: 15px;
  }
`;

export const ShowPercentBtn = styled.button`
  position: absolute;
  left: 10px;
  margin-top: -5px;
  border: solid 1px #d9d9d9;
  border-radius: 4px;
  z-index: 99;
  padding-top: 3px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    box-shadow:0px 1px 8px 2px rgba(0,0,0,0.11);
    transition: all 0.5s;
  }
`;

export const LegendLine = styled.div`
  margin-left: 45px;
  margin-bottom: -20px;
  font-weight: bold;
  color: #000;
`;