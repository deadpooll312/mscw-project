import styled from 'styled-components';

type Props = {
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string;
};
const Flex = styled.div<Props>`
  flex-grow: ${({ flexGrow }) => flexGrow ?? 'initial'};
  flex-shrink: ${({ flexShrink }) => flexShrink ?? 'initial'};
  flex-basis: ${({ flexBasis }) => flexBasis ?? 'initial'};
`;

export default Flex;
