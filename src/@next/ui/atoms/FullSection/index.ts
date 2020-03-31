import styled from 'styled-components';

type FullBlockProps = {
  isFull?: boolean;
};

const FullBlock = styled.section<FullBlockProps>`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: absolute;

  display: flex;
  flex-direction: column;
`;

export default FullBlock;
