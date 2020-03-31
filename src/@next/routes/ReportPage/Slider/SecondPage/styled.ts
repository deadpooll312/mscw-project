import styled from 'styled-components';

export const Title = styled.div`
    font-size: 1.5em;
    font-family: 'Circe-Bold';
    font-weight: bold;
    color: #000;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const StyledSecondPage = styled.div`
    position: relative;
    height: 100%;
    margin-left: 2vw;
    margin-top: 20px;
    padding-top: 30px;
    color: #000;
`;

export const DateText = styled.div`
    font-size: 1.5em;
    color: black;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    margin-bottom: 0.5vh;
`;

export const FlexRow = styled(Row)`
    justify-content: space-around;
`;

export const WrapComponent = styled.div`
    flex-wrap: wrap;
    padding: 20px 0;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    /* margin: 0 7%;
    &:first-child {
        margin: 0;
    }
    &:last-child {
        margin: 0;
    } */
    & ${Row} {
        padding: 5px 0;
    }
`;

export const ColumnTitle = styled.div<{ textColor?: string }>`
    display: flex;
    flex-direction: column;
    font-size: 1.5em;
    font-family: 'Circe-Regular';
    color: ${({ textColor }) => textColor ? textColor : '#000'};
    text-align: center;
`;

export const Value = styled.div<{ textColor?: string; fontSize?: number; flexBasic?: number }>`
    font-size: ${({ fontSize }) => fontSize ? fontSize : 2}em;
    font-family: 'Circe-Bold';
    color: ${({ textColor }) => textColor ? textColor : '#000'};
    text-align: end;
    /* flex: 1 0 ${({ flexBasic }) => flexBasic ?? 120}px; */
    min-width: 110px;
    width: 110px;
`;

export const Description = styled.div<{ fontSize?: number }>`
    /* margin: auto 2vw;
    margin-right: 0; */
    margin-left: 20px;
    font-size: ${({ fontSize }) => fontSize ? fontSize : 1.25}em;
    font-family: 'Circe-Regular';
    text-align: start;
    line-height: 1;
`;