import * as React from 'react';
import styled, { css } from 'styled-components';
import { Icon } from 'antd';
import StreamVideo from '@next/ui/atoms/StreamVideo/StreamVideo';

type Props = {
  link: string;
  permittedMove?: boolean;
  handleClickToMove?: (x: number, y: number) => any;
  handleClickToMoveHome: () => any;
  handleZoom: (zoomIn: boolean) => any;
};

const MOVE_TO = {
  UP: 'UP',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  HOME: 'HOME',
} as const;

export const VideoWithControllComponent = (props: Props) => {
  const [showButton, setShowButton] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>();

  const handleMoveCamera = React.useCallback(
    (event) => {
      if (props.handleClickToMove) {
        const { to } = event.currentTarget.dataset;

        console.info('move camera', to);

        switch (to as keyof typeof MOVE_TO) {
          case MOVE_TO.UP: {
            props.handleClickToMove(0, 14);
            return;
          }
          case MOVE_TO.RIGHT: {
            props.handleClickToMove(28, 0);
            return;
          }
          case MOVE_TO.DOWN: {
            props.handleClickToMove(0, -14);
            return;
          }
          case MOVE_TO.LEFT: {
            props.handleClickToMove(-28, 0);
            return;
          }
          case MOVE_TO.HOME: {
            props.handleClickToMoveHome();
            return;
          }
          default:
            break;
        }
      }
    },
    [props.handleClickToMove],
  );

  const onZoomClick = React.useCallback((action) => ()=> {
    props.handleZoom(action);
  }, []);

  return (
    <VideoWithControlWrap ref={ref}>
      <StreamVideo link={props.link} handlePlayVideo={setShowButton}/>
      {
        Boolean(props.permittedMove) && (
          <ControllWrap isShow={showButton}>
            <ButtonContainerToHome>
              <ButtonMoveCamera data-to={MOVE_TO.HOME} onClick={handleMoveCamera} ><Icon type="home" /></ButtonMoveCamera>
              <ButtonMoveCamera onClick={onZoomClick(true)} ><Icon type="zoom-in" /></ButtonMoveCamera>
              <ButtonMoveCamera onClick={onZoomClick(false)} ><Icon type="zoom-out" /></ButtonMoveCamera>
            </ButtonContainerToHome>
            <React.Fragment>
              <ButtonContainerToTop>
                <ButtonMoveCamera data-to={MOVE_TO.UP} onClick={handleMoveCamera}><Icon type="up" /></ButtonMoveCamera>
              </ButtonContainerToTop>
              <ButtonContainerToRight>
                <ButtonMoveCamera data-to={MOVE_TO.RIGHT} onClick={handleMoveCamera}><Icon type="right" /></ButtonMoveCamera>
              </ButtonContainerToRight>
              <ButtonContainerToDown>
                <ButtonMoveCamera data-to={MOVE_TO.DOWN} onClick={handleMoveCamera}><Icon type="down" /></ButtonMoveCamera>
              </ButtonContainerToDown>
              <ButtonContainerToLeft>
                <ButtonMoveCamera data-to={MOVE_TO.LEFT} onClick={handleMoveCamera}><Icon type="left" /></ButtonMoveCamera>
              </ButtonContainerToLeft>
            </React.Fragment>
            <ZoomInContainerWrap>
              <ZoomInContainer>
                <Icon type="zoom-in" />
              </ZoomInContainer>
            </ZoomInContainerWrap>
            <ZoomOutContainerWrap>
              <ZoomOutContainer>
                <Icon type="zoom-out" />
              </ZoomOutContainer>
            </ZoomOutContainerWrap>
          </ControllWrap>
        )
      }
    </VideoWithControlWrap>
  );
};

const ControllWrap = styled.div<{ isShow?: boolean }>`
  position: absolute;
  top: 50%;
  width: 100vw;
  height: 95vh;
  transform: translateY(-50%);
  opacity: ${({ isShow }) => isShow ? '1' : '0'};
  transition: opacity 0.7s, transform 0.5s;
`;

const ButtonMoveCamera = styled.button`
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 3px;
  background-color: white;
  :hover {
    transform: scale(1.1);
  }
  :active {
    transform: scale(1.15);
  }
`;

const commontWrapButtonCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
`;

const commontWrapButtonXCss = css`
  ${commontWrapButtonCss};
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  padding: 10px 100px;
`;

const commontWrapButtonYCss = css`
  ${commontWrapButtonCss};
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  padding: 100px 10px;
`;

const commonZoomCss = css`
  position: absolute;
  width: 100%;
  height: 10%;
  overflow: hidden;
  pointer-events: none;
`;
const ZoomInContainerWrap = styled.div`
  ${commonZoomCss};
  top: 0;
`;

const ZoomOutContainerWrap = styled.div`
  ${commonZoomCss};
  bottom: 0;
`;

const commonZoomInContainerCss = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-size: 30px;
  transition: border-radius 0.2s, transform 0.2s, opacity 0.2s;
`;

const ZoomInContainer = styled.div<{ isShow?: boolean }>`
  ${commonZoomInContainerCss};
  opacity: ${({ isShow }) => isShow ? 1 : 0};
  transform: ${({ isShow }) => isShow ? 'translate(0, 0)' : 'translate(0, -100%)'};
  border-radius: ${({ isShow }) => isShow ? '0% 0% 50% 50%' : ''};
`;

const ZoomOutContainer = styled.div<{ isShow?: boolean }>`
  ${commonZoomInContainerCss};
  opacity: ${({ isShow }) => isShow ? 1 : 0};
  transform: ${({ isShow }) => isShow ? 'translate(0, 0)' : 'translate(0, 100%)'};
  border-radius: ${({ isShow }) => isShow ? '50% 50% 0% 0% ' : ''};
`;

const ButtonContainerToHome = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  padding-bottom: 50px;
  padding-right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: transform 0.3s;
  ${ButtonMoveCamera}{
    margin-bottom: 10px;
  }
`;

const ButtonContainerToTop = styled.div`
  ${commontWrapButtonXCss};
  top: 0;
  padding-bottom: 100px;
`;
const ButtonContainerToDown = styled.div`
  ${commontWrapButtonXCss};
  bottom: 0;
  padding-top: 100px;
`;

const ButtonContainerToLeft = styled.div`
  ${commontWrapButtonYCss};
  left: 0;
  padding-right: 100px;
`;
const ButtonContainerToRight = styled.div`
  ${commontWrapButtonYCss};
  right: 0;
  padding-left: 100px;
`;

const VideoWithControlWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const VideoWithControl = React.memo(VideoWithControllComponent);
