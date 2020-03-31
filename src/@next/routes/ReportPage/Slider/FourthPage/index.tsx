import * as React from 'react';
import { useSelector } from 'react-redux';

import DefaultReportFourth from '@next/ui/templates/DefaultReportFourth';
import { selectDataSemanticPageIndexFourth, selectColorSchemaColorCode } from 'app/store/modules/report/selectors';

type Props = {};

const ReportFourthPage: React.FC<Props> = React.memo(
  () => {
    const data = useSelector(selectDataSemanticPageIndexFourth);
    const colorCode = useSelector(selectColorSchemaColorCode);

    return (
      <DefaultReportFourth
        data={data}
        colorCode={colorCode}
        page={4}
        drawLastChart
      />
    );
  },
);

export default ReportFourthPage;
