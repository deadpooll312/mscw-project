import * as React from 'react';
import { useSelector } from 'react-redux';

import DefaultReportFourth from '@next/ui/templates/DefaultReportFourth';
import { selectDataSemanticPageIndexSixth, selectColorSchemaColorCode } from 'app/store/modules/report/selectors';

type Props = {};

const ReportSixthPage: React.FC<Props> = React.memo(
  (props) => {
    const data = useSelector(selectDataSemanticPageIndexSixth);
    const colorCode = useSelector(selectColorSchemaColorCode);

    return (
      <DefaultReportFourth
        data={data}
        colorCode={colorCode}
        page={6}
        title="Мониторинг зимней уборки"
      />
    );
  },
);

export default ReportSixthPage;
