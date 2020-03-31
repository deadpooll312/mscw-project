import * as React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Icon, Tooltip } from 'antd';

import { Camera } from 'app/store/modules/semantics/types';
import { VideoWithControl } from 'containers/layers/CamerasLayer/VideoWithControll';
import { sendCameraCommandMove, sendCameraCommandMoveHome, getCamerasAzimuths, sendCameraCommandZoom } from 'app/api/camera';
import StreamVideo from '@next/ui/atoms/StreamVideo/StreamVideo';

type Props = {
  cameraData?: Camera;
  parentContainer: Element;

  onFullSizeShrinkClick: () => any;
  link: any;
  isControlled?: boolean;
};

export const FullSizeCamera = (props: Props) => {
  // const [cameraPositionsToMove, setCameraPositionsToMove] = React.useState([]);
  const {
    parentContainer,
    link,
    onFullSizeShrinkClick,
    cameraData,
  } = props;

  const handleClickToMove = React.useCallback(
    (moveX, moveY) => {
      sendCameraCommandMove(props.cameraData.id, [moveX, moveY]);
    },
    [props?.cameraData?.id],
  );

  const handleClickToMoveHome = React.useCallback(
    () => {
      sendCameraCommandMoveHome(props.cameraData.id);
      getCamerasAzimuths(props.cameraData.id);
    },
    [props?.cameraData?.id],
  );

  const handleZoom = React.useCallback(
    (zoomIn: boolean) => {
      const changeZoom = () => {
        try {
          sendCameraCommandZoom(props.cameraData.id, zoomIn ? 1 : -1);
        } catch {
          //
        }
      };

      changeZoom();
    },
    [props?.cameraData?.id],
  );

  const VideoContainer = React.useMemo(
    () => (
      props.isControlled
        ? (
          <React.Fragment>
            <VideoWithControl
              link={link}

              permittedMove={!cameraData.fixed}
              handleClickToMove={handleClickToMove}
              handleClickToMoveHome={handleClickToMoveHome}
              handleZoom={handleZoom}
            />
            <MetaWrapper>
              {cameraData.name && (
                <Tooltip placement="topLeft" title={cameraData.name} arrowPointAtCenter><MetaField>{cameraData.name}</MetaField></Tooltip>
              )}
              {cameraData?.address && (
                <Tooltip placement="topLeft" title={cameraData.address} arrowPointAtCenter><MetaField>{cameraData.address}</MetaField></Tooltip>
              )}
            </MetaWrapper>
          </React.Fragment>

        )
        : <StreamVideo link={link} />
    ),
    [],
  );

  return (
    ReactDOM.createPortal(
      <FullSizeCameraWindow>
        {VideoContainer}
        <FullSizeShrinkButton onClick={onFullSizeShrinkClick}><Icon type="shrink" /></FullSizeShrinkButton>
      </FullSizeCameraWindow>,
      parentContainer
    )
  );
};

const FullSizeShrinkButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  border: 0;
  border-radius: 2px;
  box-shadow: 0px 15px 15px 0 rgba(0,0,0,0.15);
  cursor: pointer;
`;

const FullSizeCameraWindow = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  background: rgba(196,196,196,0.9);

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  background-color: rgba(128, 128, 128, 0.6);
`;

const MetaWrapper = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  max-width: 45%;
  background: white;
  padding: 2px 5px;
  border-radius: 3px;
`;

const MetaField = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 15px;
  margin-bottom: 2px;
`;
