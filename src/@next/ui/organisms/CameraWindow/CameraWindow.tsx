import * as React from 'react';
import styled from 'styled-components';
import { Icon, Tooltip } from 'antd';

import StreamVideo from '@next/ui/atoms/StreamVideo/StreamVideo';

type Props = {
  [k: string]: any;
};

const CameraWindow: React.FC<Props> = React.memo(
  (props) => {
    return (
      <CameraWrapper
        height={props.height}
        isSelected={props.isSelected}
        data-index={props.index}
        onClick={props.onClick}
        onMouseOver={props.onMouseOver}
        onMouseOut={props.onMouseOut}
      >
        <StreamVideo link={props.link} />
        <FullSizeButton data-index={props.index} onClick={props.onFullSizeClick}><Icon type="arrows-alt" /></FullSizeButton>
        <MetaWrapper>
          {props.name && (
            <Tooltip placement="topLeft" title={props.name} arrowPointAtCenter><Name>{props.name}</Name></Tooltip>
          )}
          {props.address && (
            <Tooltip placement="topLeft" title={props.address} arrowPointAtCenter><Address>{props.address}</Address></Tooltip>
          )}
        </MetaWrapper>
      </CameraWrapper>
    );
  },
);

export default CameraWindow;

export const CameraWrapper = styled.div<{ isSelected: boolean; height?: number }>`
  width: 100%;
  height: ${(p) => p.height}px;
  min-height: 100px;
  background: #fff;
  border-radius: 5px;
  transform: scale3d(${({ isSelected }) => isSelected ? '0.95, 0.95' : '0.85, 0.85'}, 1);
  transition: background-color 0.2s, opacity 0.2s, transform 0.2s, box-shadow 0.2s;
  box-shadow: ${({ isSelected }) => isSelected
    ? '0px 10px 20px 0 rgba(0, 0, 0, 0.7)'
    : '0px 15px 15px 0 rgba(0, 0, 0, 0.15)'
};
  will-change: transform;
  cursor: pointer;

  &:hover {
    background: rgba(196, 196, 196, 1);
  }
`;

const FullSizeButton = styled.button`
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
  box-shadow: 0px 15px 15px 0 rgba(0, 0, 0, 0.15);
  cursor: pointer;
`;

const MetaWrapper = styled.div`
  position: absolute;
  right: 1px;
  bottom: 1px;
  max-width: 45%;
  background: white;
  padding: 2px 5px;
  border-radius: 3px;
`;

const Name = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 13px;
  margin-bottom: 2px;
`;

const Address = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 11px;
  margin-bottom: 0px;
`;
