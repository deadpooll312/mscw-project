import styled from 'styled-components';

const MapCircleOverlay = styled.div<{ size: number }>`
  position: absolute;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid rgba(36, 50, 57, 0.5);

  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;

  font-family: Circe-Regular;
  font-weight: 800;
  line-height: 1.2;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default MapCircleOverlay;
