import styled from 'styled-components';
import { Button } from 'antd';

const SeasonButton = styled(Button)<{ isActive: boolean }>`
  &&& {
    background-color: ${({ isActive }) => isActive ? 'rgb(233, 238, 253)' : 'white'};
  }
`;

export default SeasonButton;
