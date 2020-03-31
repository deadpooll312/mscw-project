import styled from 'styled-components';

export const RelativeWrap = styled.div`
    position: relative;
    width: 100%;
    min-width: 100px;
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