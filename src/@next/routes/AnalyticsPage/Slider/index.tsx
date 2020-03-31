import * as React from 'react';

import WrapperForSlide from '@next/ui/atoms/ReportSlider/WrapperForSlide';
import ReportSlider from '@next/ui/atoms/ReportSlider';

import { ReportsWrap } from '@next/routes/ReportPage/Slider/styled';
import AnalyticsPageWidget from '@next/routes/AnalyticsPage/Slider/Widget';

type Props = {};

const AnalyticsPageSlider: React.FC<Props> = React.memo(
  () => {
    return (
      <ReportsWrap >
        <ReportSlider>
          <WrapperForSlide>
            <AnalyticsPageWidget />
          </WrapperForSlide>
        </ReportSlider>
      </ReportsWrap>
    );
  },
);

export default AnalyticsPageSlider;