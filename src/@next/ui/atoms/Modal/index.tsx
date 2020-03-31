import * as React from 'react';
import styled, { css } from 'styled-components';

type Props = {
  noBackdrop?: boolean;
  position?: 'topRight' | 'center';
};

const cssCenter = css`
  top: 50%;
  left: 50%;
  width: 700px;
  height: 500px;
  margin: auto;
  transform: translateX(-50%) translateY(-50%);
`;

const cssTopRight = css`
  position: fixed;
  top: 60px;
  right: 10px;
  height: 470px;
`;

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 50;
  background-color: #2a2a2c;
  opacity: 0.1;
`;

export const Container = styled.div<Pick<Props, 'position'>>`
  position: fixed;
  z-index: 150;
  width: 700px;
  margin: auto;
  padding: 30px;
  border-radius: 6px;
  border: 1px solid grey;
  background-color: #ffffff;
  display: flex;
  justify-content: center;

  ${({ position }) => (
    position === 'center'
      ? cssCenter
      : position === 'topRight' && cssTopRight
  )};

  @media (max-height: 768px)  {
    overflow-y: auto;
    height: 440px;
  }
`;

const Modal: React.FC<Props> = React.memo(
  (props) => {
    return (
      <React.Fragment>
        {
          !props.noBackdrop && (
            <Backdrop />
          )
        }
        <Container position={props.position}>
          <div>
            { props.children}
          </div>
        </Container>
      </React.Fragment>
    );
  },
);

export default Modal;
