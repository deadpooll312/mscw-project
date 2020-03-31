import * as React from 'react';
import { lighten } from 'polished';
import styled, { keyframes, css } from 'styles';

type Props = {
  loadingWidth?: string;

  overall?: boolean;
  backgroundColor?: string;
};

const color = '#2b55e6';
const time = 1.5;

const rotate = keyframes`
  0% {
    transform: rotate(180deg);
  }
  10% {
    transform: rotate(180deg);
  }
  90% {
    transform: rotate(540deg);
  }
  100% {
    transform: rotate(540deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dashoffset: -26;
    stroke-dasharray: 10 120;
  }
  10% {
    stroke-dashoffset: -26;
    stroke-dasharray: 10 120;
  }
  50% {
    stroke-dasharray: 30 120;
    stroke-dashoffset: -16.5;
    stroke: ${lighten(0.2, color)};
  }
  90% {
    stroke-dashoffset: -26;
    stroke-dasharray: 10 120;
  }
  100% {
    stroke-dashoffset: -26;
    stroke-dasharray: 10 120;
  }
`;

const SpinSvgContainerWrap = styled.div<{ overall?: boolean; backgroundColor?: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${({ backgroundColor }) => backgroundColor ?? 'inherit'};

  ${({ overall }) => overall && css`
    z-index: 100000000;
    cursor: progress;
  `}
`;

export const SpinSvgContainer = styled.div<Pick<Props, 'loadingWidth'>>`
  position: absolute;
  width: ${({ loadingWidth }) => loadingWidth ?? '100px'};
  height: ${({ loadingWidth }) => loadingWidth ?? '100px'};
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const SpinSvg = styled.svg`
  animation: ${rotate} ${time}s ease-in-out infinite;
`;

const SpinCircleBackgroundSvg = styled.circle`
  stroke: #e6e6e6;
  stroke-width: 5;
  stroke-linecap: round;
`;

const SpinCircleSvg = styled.circle`
  stroke: ${color};
  stroke-width: 5;
  stroke-linecap: round;
  animation: ${dash} ${time}s ease-in-out infinite;
`;

const LoadingSpinSvg: React.FC<Props> = React.memo(
  (props) => {
    return (
      <SpinSvgContainerWrap overall={props.overall} backgroundColor={props.backgroundColor}>
        <SpinSvgContainer loadingWidth={props.loadingWidth}>
          <SpinSvg viewBox="0 0 50 50">
            <SpinCircleBackgroundSvg cx="25" cy="25" r="20" fill="none"></SpinCircleBackgroundSvg>
            <SpinCircleSvg cx="25" cy="25" r="20" fill="none"></SpinCircleSvg>
          </SpinSvg>
        </SpinSvgContainer>
      </SpinSvgContainerWrap>
    );
  },
);

export default LoadingSpinSvg;
