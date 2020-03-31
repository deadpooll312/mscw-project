import styled, { css } from 'styled-components';

const WhiteBlock = styled.div<{ maxWidth?: number }>`
  ${({ maxWidth }) => maxWidth && css`
    width: ${maxWidth}px;
  `}
  border-radius: 6px;
  background-color: white;
  border: 1px solid #d9d9d9;
  padding: 5px;
`;

export default WhiteBlock;