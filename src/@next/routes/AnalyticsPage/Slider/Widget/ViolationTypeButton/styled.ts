import styled from 'styled-components';
import { Button } from 'antd';

export const ButtonType = styled(Button)`
  &&& {
    width: 73px;
    height: 40px;
    padding-left: 0;
    padding-right: 0;
    margin-right: 5px;
    > i {
      width: 100%;
      transform: scale(0.99);
      & > span {
        width: 100%;
      }
    }
  }
`;