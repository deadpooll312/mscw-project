import * as React from 'react';
import styled from 'styled-components';
import Loading from '@next/ui/atoms/Loading';

const SlideItem = styled.div`
  max-height: 850px;
  padding: 10px 0;
  height: 100vh;
  box-sizing: content-box;
`;

const SlideWrap = styled.div`
  background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText};
  overflow: auto;
  height: 100%;
`;

type Props = {};

const WrapperForSlide: React.FC<Props> = React.memo(
  (props) => {
    return (
      <SlideItem>
        <SlideWrap>
          <React.Suspense fallback={<Loading />}>
            { props.children }
          </React.Suspense>
        </SlideWrap>
      </SlideItem>
    );
  },
);

export default WrapperForSlide;
