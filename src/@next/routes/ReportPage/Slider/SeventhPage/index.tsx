import * as React from 'react';
import { useSelector } from 'react-redux';

import DefaultReportFourth from '@next/ui/templates/DefaultReportFourth';
import { selectDataSemanticPageIndexSeventh, selectColorSchemaColorCode } from 'app/store/modules/report/selectors';

type Props = {};

const ReportSeventhPage: React.FC<Props> = React.memo(
  (props) => {
    const data = useSelector(selectDataSemanticPageIndexSeventh);
    const colorCode = useSelector(selectColorSchemaColorCode);

    return (
      <DefaultReportFourth
        data={data}
        colorCode={colorCode}
        page={7}
        title="Всесезонный мониторинг"
      />
    );
  },
);

export default ReportSeventhPage;
