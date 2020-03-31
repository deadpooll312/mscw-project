import styled from 'styled-components';
import { StyledRadio } from 'containers/sidebar/TabContainers/TabMap/LayersSelector/styled';

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${StyledRadio} {
    padding: 5.5px 11px;
  }
`;

export default FlexContainer;
