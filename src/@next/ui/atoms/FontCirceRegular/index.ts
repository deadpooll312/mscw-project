import styled from 'styled-components';

const FontCirceRegular = styled.span<{ fontSize: number }>`
  font-family: Circe-Regular;

  font-size: ${({ fontSize }) => fontSize}px;
`;

export default FontCirceRegular;
