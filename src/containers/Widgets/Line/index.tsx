import * as React from 'react';
import { useSelector } from 'react-redux';

import Loading from '@next/ui/atoms/Loading';
import { selectModuleReportWidgetPageLinesIsLoading, selectModuleReportWidgetPageLinesChartsFormated, selectModuleReportWidgetPageLinesLegendFormated, selectModuleReportWidgetPageLinesChartsTypesFormated } from 'app/store/modules/analytics/selectors';

const VerticalBarChart = React.lazy(() => (
  import(/* webpackChunkName: "@VerticalBarChart" */ '@next/ui/atoms/VerticalBarChart')
));

type Props = {};

const LegendByShowPercent: React.FC<{ showPercent: boolean }> = React.memo(
  (props) => {
    if (props.showPercent) {
      return <div>{'Проверено/Ведомством/Жителями/Ведомством и жителями'}</div>;
    }

    return <div>{'Проверено из всего'}</div>;
  }
);

const WidgetsLine: React.FC<Props> = React.memo(
  () => {
    const isLoading = useSelector(selectModuleReportWidgetPageLinesIsLoading);
    const chartsFormatted = useSelector(selectModuleReportWidgetPageLinesChartsFormated);
    const lineLegend = useSelector(selectModuleReportWidgetPageLinesLegendFormated);
    const types = useSelector(selectModuleReportWidgetPageLinesChartsTypesFormated);
    
    if (isLoading) {
      return (
        <Loading type="new_spinner" />
      );
    }

    return Boolean(lineLegend[0] && chartsFormatted[0]) && (
      <React.Suspense fallback={<Loading type="new_spinner" />}>
        <VerticalBarChart
          data={chartsFormatted}
          colors={lineLegend}
          types={types}
          LegendByShowPercent={LegendByShowPercent}
        />
      </React.Suspense>
    );
  },
);

export default WidgetsLine;
