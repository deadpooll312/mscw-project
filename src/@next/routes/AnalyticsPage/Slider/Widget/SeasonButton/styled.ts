import styled from 'styled-components';
import { Button } from 'antd';

export const ButtonType = styled(Button)`
  &&& {
    width: 42px;
    height: 40px;
    padding-left: 0;
    padding-right: 0;
    margin-right: 5px;
    > i {
      transform: scale(1.7);
    }
  }
`;