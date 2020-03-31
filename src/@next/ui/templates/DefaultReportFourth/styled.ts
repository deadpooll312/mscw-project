import styled from 'styled-components';

export const Owerlay = styled.div`
  position: relative;
  height: 100%;
  margin-top: 20px;
  padding: 30px 20px;
  margin-left: 2vw;
  font-family: 'Circe-Regular';
  color: #000;
`;

export const PageTittle = styled.h1`
  font-family: 'Circe-Bold';
  font-weight: bold;
`;

export const RowOne = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const Description = styled.div`
  display: inline-block;
  /* margin-left: 7px; */
  font-size: 14px;
  height: 40px;
  padding-top: 11px;
  font-family: 'Circe-Bold';
`;

export const StyledLegend = styled.div`
  display: flex;
  justify-content: flex-end;
  text-align: center;
  margin-right: 10px;
  height: 40px;
`;

export const StyledLegendItem = styled.div<{ backgroundColor?: string; textColor?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  font-size: 11px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor || '#fff'};

  &:first-child {
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
  }
  &:last-child {
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
  }
`;

export const RowTwo = styled.div`
  display: flex;
  height: 150px;

  overflow: auto;
`;

export const RowThree = styled.div`
  display: flex;
  justify-content: center;
  height: 270px;
`;

export const BarDescription = styled.div`
  /* margin-left: 10px; */
  font-size: 20px;
  font-weight: bold;
  font-family: 'Circe-Bold';
`;

export const RowFour = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 50px;
`;

export const LegendItemBottom = styled.div<{ backgroundColor?: string; textColor?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  color: #fff;
  font-size: 11px;
  background-color: ${({ backgroundColor }) => `${backgroundColor}`};
  color: ${({ textColor }) => textColor};
  
  &:first-child {
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
  }
  &:last-child {
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
  }
`;

export const StyledObjectStatusesBlock = styled.div`
  margin-top: 40px;
`;
 
export const StyledObjectCriticalBlock = StyledObjectStatusesBlock;
