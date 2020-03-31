import * as React from 'react';
import { useSelector } from 'react-redux';

import ReportSlider from '@next/ui/atoms/ReportSlider';
import WrapperForSlide from '@next/ui/atoms/ReportSlider/WrapperForSlide';

import { getPages } from '@next/routes/ReportPage/Slider/utils';
import { ReportsWrap, FixSize } from '@next/routes/ReportPage/Slider/styled';
import ReportFlexColumnContainer from '@next/ui/molecules/ReportFlexContainer';
import Loading from '@next/ui/atoms/Loading';
import { selectHasData, selectIsLoading, selectReportPageNumbers } from 'app/store/modules/report/selectors';

type Props = {};

const ReportPageSlider: React.FC<Props> = React.memo(
  () => {
    const hasData = useSelector(selectHasData);
    const isLoading = useSelector(selectIsLoading);
    const pageNumbers = useSelector(selectReportPageNumbers);

    const pagesData = React.useMemo(
      () => {
        return getPages().filter(item => pageNumbers.includes(item.pageNumber));
      },
      [pageNumbers],
    );

    return (
      <ReportsWrap >
        {
          isLoading
            ? (
              <ReportSlider>
                <WrapperForSlide>
                  <ReportFlexColumnContainer alignItems="center">
                    <Loading />
                  </ReportFlexColumnContainer>
                </WrapperForSlide>
              </ReportSlider>
            )
            : (
              hasData ? (
                <ReportSlider>
                  {
                    pagesData.map((page) => (
                      <WrapperForSlide key={page.pageNumber}>
                        <FixSize>
                          <page.Component />
                        </FixSize>
                      </WrapperForSlide>
                    ))
                  }
                </ReportSlider>
              ) : (
                <ReportSlider>
                  <WrapperForSlide>
                  </WrapperForSlide>
                </ReportSlider>
              )
            )
        }
      </ReportsWrap>
    );
  },
);

export default ReportPageSlider;