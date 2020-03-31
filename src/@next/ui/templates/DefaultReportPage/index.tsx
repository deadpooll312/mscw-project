import * as React from 'react';

import ReportFlexColumnContainer from '@next/ui/molecules/ReportFlexContainer';
import { ReportPageNumber } from '@next/ui/molecules/ReportPageNumber';
import ReportTitleMonitoring from '@next/ui/molecules/ReportTitleMonitoring';

type Props = {
  title?: React.ReactNode;
  page: number | string;
};

const DefaultReportPageContainer: React.FC<Props> = React.memo(
  (props) => {
    return (
      <ReportFlexColumnContainer marginValue="5px 20px">
        <div>
          <ReportPageNumber children={`- ${props.page} -`} />
          <ReportTitleMonitoring children={props.title ?? 'Сводный мониторинг'} />
          { props.children }
        </div>

      </ReportFlexColumnContainer>
    );
  },
);

export default DefaultReportPageContainer;