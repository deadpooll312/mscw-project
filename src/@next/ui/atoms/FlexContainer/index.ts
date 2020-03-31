import styled from 'styled-components';

type Props = {
  flexDirection?: 'column' | 'row';
  alignItems?: 'center' | 'space-between' | 'baseline' | 'flex-end' | 'end';
  justifyContent?: 'center' | 'space-between' | 'flex-end' | 'flex-start';
  flexWrap?: 'wrap';
};
const FlexContainer = styled.div<Props>`
  display: flex;
  flex-wrap: ${({ flexWrap }) => flexWrap ?? 'initial'};
  flex-direction: ${({ flexDirection }) => flexDirection ?? 'initial'};
  align-items: ${({ alignItems }) => alignItems ?? 'initial'};
  justify-content: ${({ justifyContent }) => justifyContent ?? 'initial'};
`;

export default FlexContainer;
