import * as React from 'react';
import styled from 'styles';
import ViolationsMapCard from '@next/routes/MapPage/ViolationBlock/ViolationsMapCard';
import ShowNearestCameraTrigger from '@next/routes/MapPage/ViolationBlock/ShowNearestCameraTrigger';

const Cotainer = styled.div`
  position: absolute;
  pointer-events: none;
  width: 100%;
  height: 100%;
`;

type Props = {};

const ViolationBlock: React.FC<Props> = React.memo(
  () => {
    return (
      <Cotainer>
        <ViolationsMapCard />
        <ShowNearestCameraTrigger />
      </Cotainer>
    );
  }
);

export default ViolationBlock;
