import * as React from 'react';

import ReportTitle from '@next/ui/molecules/ReportTitle';
import ReportSimpleText from '@next/ui/molecules/ReportSimpleText';
import ReportInfoText from '@next/ui/molecules/ReportInfoText';
import ReportFlexColumnContainer from '@next/ui/molecules/ReportFlexContainer';
import ReportSimpleDataText from '@next/ui/molecules/ReportSimpleDataText';

type Props = {
  title: React.ReactNode;
  textOne: React.ReactNode;
  textTwo: React.ReactNode;
  textInfo: React.ReactNode;
};

const ReportFirstPageContainer: React.FC<Props> = React.memo(
  (props) => {
    return (
      <ReportFlexColumnContainer alignItems="center">
        <ReportTitle>
          {props.title}
        </ReportTitle>
        <ReportSimpleDataText>
          {props.textOne}
        </ReportSimpleDataText>
        <ReportSimpleText>
          {props.textTwo}
        </ReportSimpleText>
        <ReportInfoText>
          {props.textInfo}
        </ReportInfoText>
      </ReportFlexColumnContainer>
    );
  },
);

export default ReportFirstPageContainer;