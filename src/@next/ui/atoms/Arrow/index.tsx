import * as React from 'react';
import styled, { css } from 'styled-components';

const iconArrow = require('static/svg/arrow-angle-l.svg');

type Props = {
  className?: string;
  onClick?: (...arg: any[]) => any;
  isRotated?: boolean;
  arrowMove?: number;
};

const Img = styled.img<Pick<Props, 'isRotated'>>`
  transform: ${({ isRotated }) => (isRotated ? 'rotate(0deg)' : 'rotate(-180deg)')};
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const isRotatedCss = (arrowMove: number) => css`
  left: ${arrowMove ?? -30}px;
`;
const isNotRotatedCss = (arrowMove: number) => css`
  right: ${arrowMove ?? -30}px;
`;

const ArrowWrapper = styled.div<Pick<Props, 'isRotated' | 'arrowMove'>>`
  width: auto;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  &&& {
    ${({ isRotated, arrowMove }) => (
    Boolean(isRotated)
      ? isRotatedCss(arrowMove)
      : isNotRotatedCss(arrowMove)
  )}
  }

  &.slick-disabled {
    display: none;
  }

  &::before {
    display: none;
  }
`;

const Arrow: React.FC<Props> = React.memo(
  (props) => {
    return (
      <ArrowWrapper
        className={props.className}
        isRotated={props.isRotated}
        onClick={props.onClick}
        arrowMove={props.arrowMove}
      >
        <Img src={iconArrow} isRotated={props.isRotated} />
      </ArrowWrapper>
    );
  },
);

export default Arrow;
