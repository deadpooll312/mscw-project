import styled from 'styled-components';

export const DistrictName = styled.div`
  word-break: keep-all;
  white-space: nowrap;
  font-weight: 600;
`;

export const InfoBlock = styled.div<{ size: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #818490;
  left: ${({ size }) => size * 2}px;
  height: ${({ size }) => size / 2 + 20}px;

  padding: 0 20px;

  & > span {
    font-size: 9px;
    font-weight: bold;
    text-transform: uppercase;
  }

  & strong {
    color: #2a2a2c;
    margin-right: 3px;
  }
  & strong, span, ${DistrictName} {
    line-height: 1;
  }
  & strong + span {
    margin-left: 3px;
  }

`;