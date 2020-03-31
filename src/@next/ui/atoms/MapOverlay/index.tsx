import * as React from 'react';
import styled from 'styled-components';

import ReactDOM from 'react-dom';
import type Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import type { Coordinate } from 'ol/coordinate';

type Props = {
  map: Map;
  position: Coordinate;
  size: number;
  isSelected: boolean;
};

const Container = styled.div<Pick<Props, 'size' | 'isSelected'>>`
  position: relative;
  transform: translate(-${({ size }) => size / 2}px, -${({ size }) => size / 2}px);
  z-index: ${({ isSelected }) => isSelected ? 10 : 1};
  pointer-events: none;
`;

const MapOverlay: React.FC<Props> = React.memo(
  (props) => {
    const [ref, setRef] = React.useState<HTMLDivElement>(null);
    React.useEffect(
      () => {
        const node = document.createElement('div');
        setRef(node);

        // ol сам удаляет ноду, но на всякий оставлю
        // return () => document.removeChild(node);
      },
      [],
    );

    React.useEffect(
      () => {
        if (ref) {
          const overlay = new Overlay({
            position: props.position,
            element: ref,
          });

          props.map.addOverlay(overlay);

          return () => {
            props.map.removeOverlay(overlay);
          };
        }
      },
      [ref],
    );

    return ref && (
      ReactDOM.createPortal(
        <Container size={props.size} isSelected={props.isSelected}>
          {
            props.children
          }
        </Container>,
        ref,
      )

    );
  },
);

export default MapOverlay;
