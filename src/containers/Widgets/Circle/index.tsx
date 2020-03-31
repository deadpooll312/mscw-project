import * as React from 'react';
import { useSelector } from 'react-redux';
import { DonutsWrap, Donut } from 'containers/Widgets/Circle/styled';
import { NoChartData } from 'components/DonutChart/styled';
import Loading from '@next/ui/atoms/Loading';
import { selectModuleReportWidgetPageCircleIsLoading, selectModuleReportWidgetPageCircleFormated, selectetModuleReportWidgetColorCode } from 'app/store/modules/analytics/selectors';

const DonutChartComponent = React.lazy(() => (
  import(/* webpackChunkName: "@DonutChartComponent" */ 'components/DonutChart')
));

type Props = {};

const PIE_CHART_ADD_TEXT = [
  {
    inCircleDescription: (x) => <tspan><tspan style={{fontFamily: 'Circe-Bold', fontSize: '18px'}} y={210} > проверено </tspan> <tspan style={{fontFamily: 'Circe-Bold', fontSize: '18px'}} y={230} x={x}> без нарушений</tspan></tspan>,
  },
  {
    inCircleDescription: (x) => <tspan><tspan style={{fontFamily: 'Circe-Bold', fontSize: '18px'}} y={210} > с критичными </tspan> <tspan style={{fontFamily: 'Circe-Bold', fontSize: '18px'}} y={230} x={x}>нарушениями</tspan></tspan>,
  },
] as const;

const WidgetsCircle: React.FC<Props> = React.memo(
  () => {
    const isLoading = useSelector(selectModuleReportWidgetPageCircleIsLoading);
    const circleData = useSelector(selectModuleReportWidgetPageCircleFormated);
    const colorCode = useSelector(selectetModuleReportWidgetColorCode);

    return Boolean(colorCode || isLoading) && (
      <DonutsWrap>
        <React.Suspense fallback={<Loading type="new_spinner" />}>
          {
            isLoading
              ? (
                <Loading type="new_spinner" />
              )
              : (
              circleData?.charts?.map((chart, key) => (
                !!chart.objects.length ? (
                  <Donut key={chart.name}>
                    <DonutChartComponent
                      data={{...chart,
                        inCircleDescription: PIE_CHART_ADD_TEXT[key].inCircleDescription,
                      }}
                      colorCode={colorCode}
                      index={key}
                    />
                  </Donut>
                ) : (
                  <NoChartData>
                    По выбранным слоям нет нарушений
                  </NoChartData>
                )
              ))
              )
          }
        </React.Suspense>
      </DonutsWrap>
    );
  },
);

export default WidgetsCircle;
