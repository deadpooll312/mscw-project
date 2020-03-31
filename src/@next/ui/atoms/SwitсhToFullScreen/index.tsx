import * as React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Button, Icon } from 'antd';
import { isFunction } from 'util';

type Props = {
  handleToggle?: (isOpen: boolean) => any;
};

const Container = styled.div`
  position: relative;
`;

const FullSizeContainer = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0.5, 0.5, 0.5, 0.5);
  z-index: 1000;

  & > div {
    height: 100%;
  } 
`;

export const ButtonToggle = styled(Button)`
  &&& {
    position: absolute;
    right: 0;
    z-index: 10;

    &:hover, &:active, &:focus {
      transform: scale(1.1, 1.1) translate(-5%, 5%);
      border-color: #d9d9d9;
      background-color: #fff;
      color: rgba(0, 0, 0, 0.65);
    }

    transition: transform 0.3s;
  }
`;

const rootDom = document.querySelector('#root');

const SwitсhToFullScreen: React.FC<Props> = React.memo(
  (props) => {
    const [isFullScreen, setFullScreen] = React.useState(false);
    const handleClick = React.useCallback(
      () => {
        const newIsFullScreen = !isFullScreen;

        setFullScreen(newIsFullScreen);
        if (isFunction(props.handleToggle)) {
          props.handleToggle(newIsFullScreen);
        }
      },
      [isFullScreen],
    );

    return (
      <React.Fragment>
        <Container>
          <ButtonToggle onClick={handleClick}><Icon type="arrows-alt" /></ButtonToggle>
          {props.children}
        </Container>
        {
          isFullScreen && (
            ReactDOM.createPortal(
              (
                <FullSizeContainer>
                  <ButtonToggle onClick={handleClick}><Icon type="shrink" /></ButtonToggle>
                  {props.children}
                </FullSizeContainer>
              ),
              rootDom,
            )
          )
        }
      </React.Fragment>
    );
  },
);

export default SwitсhToFullScreen;