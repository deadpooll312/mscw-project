import styled from 'styled-components';

export const InfoBlock = styled.div<{ size: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #818490;
  height: 100%;
  margin-left: ${({ size }) => size / 3}px;
  padding: 0 20px;
  /* padding-left: 20px; */

  transition: margin-left 0.2s;


  & > span {
    font-size: 9px;
    font-weight: bold;
    text-transform: uppercase;
  }

  & strong {
    color: #2a2a2c;
    margin-right: 3px;
  }
  & strong + span {
    margin-left: 3px;
  }
`;
