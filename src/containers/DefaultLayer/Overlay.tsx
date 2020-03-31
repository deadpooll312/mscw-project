import * as React from 'react';
import styled, { css } from 'styled-components';

type Props = {
  show: boolean;
  dependenceSize?: number;
  size: number;
  center?: boolean;
};

/**
 * @todo сделать нормальную трапецию
 */
const DefaultOverlay: React.FC<Props> = React.memo(
  (props) => {
    return (
      <React.Fragment>
        <TriggerShowBlock show={props.show} >
          <Overlay size={props.size} center={props.center} dependenceSize={props.dependenceSize}>
            <ViolationCard size={props.size}>
              {props.children}
            </ViolationCard>
          </Overlay>
          {
            props.center && (
              <Trapezoid size={props.size} dependenceSize={props.dependenceSize} />
            )
          }
        </TriggerShowBlock>
      </React.Fragment>
    );
  },
);

export default DefaultOverlay;

const cssShow = css`
  transform: scale(1, 1);
  opacity: 1;
`;
const cssNotShow = css`
  transform: scale(0.5, 0.5);
  opacity: 0;
`;

const TriggerShowBlock = styled.div<{ show: boolean }>`
  ${({ show }) => (
    show
      ? cssShow
      : cssNotShow
  )}

  transition: transform 0.4s, opacity 0.2s;

`;

export const Trapezoid = styled.div<{ size: number; dependenceSize: number }>`
  position: absolute;
  width: 50px;

  /* border: 1px solid rgba(36, 50, 57, 0.5); */
  border-left: none;

  transform: perspective(100px) rotatey(-45deg);
  background: white;

  height: ${({ size }) => size - 10}px;

  transform: scale(0.95, 0.95) perspective(100px) rotatey(-45deg) scale(0.88);

  overflow: hidden;
  top: ${({ size, dependenceSize }) => `${-(size - dependenceSize) / 2 + 5}px`};
`;

export const Overlay = styled.div<Pick<Props, 'size' | 'center' | 'dependenceSize'>>`
  text-align: center;
  position: absolute;
  left: ${({ center, size }) => size / (!center ? 2 : 1.3)}px;
  height: ${({ center, size }) => size - (center ? 10 : 0)}px;

  transition: left 0.2s, height 0.2s;
  overflow: hidden;
  top: ${({ center, size, dependenceSize }) => center ? `${-(size - dependenceSize) / 2 + 5}px` : 'initial'};
`;

export const ViolationCard = styled.div<{ size: number }>`
  border-radius: 6px;
  border: 1px solid rgba(36, 50, 57, 0.5);

  box-shadow: 0 3px 7px 0 rgba(36, 50, 57, 0.5);
  background-color: #ffffff;
  height: 100%;
`;

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: #818490;
  height: 100%;

  & > span {
    font-size: 9px;
    font-weight: bold;
    text-transform: uppercase;
  }

  & strong {
    color: #2a2a2c;
    margin-right: 3px;
  }
  & strong + span {
    margin-left: 3px;
  }
`;
