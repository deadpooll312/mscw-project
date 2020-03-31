import styled from 'styled-components';

export const Row = styled.div<{ height: number }>`
  position: relative;
  height: ${({ height }) => `${height}px`};
  /* overflow: auto; */
`;

export const RowFlex = styled(Row)`
  display: flex;
`;

export const LineTitle = styled.p`
  position: relative;
  font-size: 23px;
  color: #000;
  width: fit-content;
  margin-left: 202px;
  margin-top: 10px;
  font-weight: bold;
  margin-bottom: 0;
  top: -5px;
`;

export const BtnSystemWrap = styled.div`
  display: inline-block;
  margin-left: 30px;
`;

