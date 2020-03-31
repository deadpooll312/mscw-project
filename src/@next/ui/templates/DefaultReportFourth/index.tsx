import * as React from 'react';
import keyBy from 'lodash-es/keyBy';
import mapValues from 'lodash-es/mapValues';

import {
  RowOne,
  Description,
  StyledLegend,
  StyledLegendItem,
  RowTwo,
  RowThree,
  BarDescription,
  RowFour,
  LegendItemBottom,
  StyledObjectStatusesBlock,
  StyledObjectCriticalBlock,
} from './styled';

import DefaultReportPageContainer from '@next/ui/templates/DefaultReportPage';
import { getTextColor } from '@next/routes/ReportPage/Slider/ThirdPage/too_difficult/utils';
import { getPageLegend } from '@next/utils/report';

import LabelColor from '@next/ui/atoms/LabelColor';
import Loading from '@next/ui/atoms/Loading';

const BarChart = React.lazy(() => (
  import(/* webpackChunkName: "@BarChart" */ 'components/BarChart')
));
const ReportPieChartComponent = React.lazy(() => (
  import(/* webpackChunkName: "@BarChart" */ '@next/ui/molecules/ReportPieChartComponent')
));

type Props = {
  data: any;
  colorCode: any;
  title?: string;
  page: string | number;
  drawLastChart?: boolean;
};

const checkEmptyValues = (chartData) => {
  const sum = chartData?.objects?.reduce((acc, item) => acc + item.value, 0);
  return Boolean(sum);
};

const DefaultReportFourth: React.FC<Props> = React.memo(
  (props) => {
    const {
      data,
      colorCode,
      drawLastChart,
    } = props;

    const pageLegend = React.useMemo(
      () => getPageLegend(colorCode, data),
      [colorCode, data],
    );
    const objectStatusesColors = React.useMemo(
      () => pageLegend.objectStatuses.map((item) => item.color),
      [pageLegend.objectStatuses],
    );
    const objectSeasonAndCriticalColors = React.useMemo(
      () => drawLastChart ? pageLegend.objectSeasonAndCritical?.map((item) => item.color) : [],
      [pageLegend.objectSeasonAndCritical],
    );
    const objectCriticalToCheckedColors = pageLegend.objectCriticalToChecked;

    const barChartData = React.useMemo(() => {
      return (data?.objectCriticalToChecked || []).map((item) => {
        const otherData = mapValues(
          keyBy(item.objects, 'name'),
          (o) => ({
            ...o,
            value: o.total,

          }),
        );

        return {
          name: item.name,
          total: item.total,
          ...otherData,
        };
      });
    }, [data]);

    const barChartTypes = React.useMemo(
      () => {
        return mapValues(keyBy(data.objectCriticalToChecked[0].objects, 'type'), 'name');
      },
      [data.objectCriticalToChecked[0].objects],
    );

    const objectCriticalBlock = React.useMemo(() => 
      <React.Fragment>
        <BarDescription>Рейтинг округов по доле объектов с критичными нарушениями от проверенных</BarDescription>
        <RowThree>
          <React.Suspense fallback={<Loading type="new_spinner" />}>
            <BarChart
              data={barChartData} // {name: 'ВАО', total: 6, 'Нет критичных нарушений': 8, ...}
              colors={objectCriticalToCheckedColors}
              types={barChartTypes}
            />
          </React.Suspense>
        </RowThree>
      </React.Fragment>
    , [barChartData, objectCriticalToCheckedColors, barChartTypes]);

    const objectStatusesBlock = React.useMemo(() => 
      <React.Fragment>
        <RowOne>
          <Description>
            Распределение объетов по статусам, % от общего количества объетов
          </Description>
        </RowOne>
        <RowTwo>
          {
            data.objectStatuses.map((item, key) => (
              <React.Suspense key={key} fallback={<Loading type="new_spinner" />}>
                <ReportPieChartComponent
                  colors={objectStatusesColors}
                  item={item}
                />
              </React.Suspense>
            ))
          }
        </RowTwo>
      </React.Fragment>
    , []);

    const LegendBlock = React.useMemo(() =>        
      <StyledLegend>
        {
          pageLegend.objectStatuses.map((item, key) => (
            <StyledLegendItem 
              key={key} 
              textColor={getTextColor(item.code)} 
              backgroundColor={item.color}>
              {item.description}
            </StyledLegendItem>
          ))
        }
      </StyledLegend>
    , [pageLegend.objectStatuses]);

    const lastChartBlock = React.useMemo(() => 
      <React.Fragment>
        <RowFour>
          <Description>
            Распределение объетов по сезону и критичности, % от общего количества объектов с нарушениями
          </Description>
          <StyledLegend>
            {
              pageLegend.objectSeasonAndCritical?.map((item, key) => (
                <LegendItemBottom 
                  key={key} 
                  backgroundColor={item.color} 
                  textColor={getTextColor(item.code)}
                >
                  {item.description}
                </LegendItemBottom>
              ))
            }
          </StyledLegend>
        </RowFour>
        <RowTwo>
          {
            data?.objectSeasonAndCritical?.map((item, key) => (
              checkEmptyValues(item) 
                ? <ReportPieChartComponent
                  key={key}
                  colors={objectSeasonAndCriticalColors}
                  item={item}
                />
                : null
            ))
          }
        </RowTwo>
      </React.Fragment>
    , [pageLegend?.objectSeasonAndCritical, data?.objectSeasonAndCritical]);

    const checkRender = () => {
      if (drawLastChart) {
        return (
          <React.Fragment>
            {LegendBlock}
            {objectStatusesBlock}
            {objectCriticalBlock}
            {lastChartBlock}
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            {LegendBlock}
            <StyledObjectCriticalBlock>
              {objectCriticalBlock}
            </StyledObjectCriticalBlock>
            <StyledObjectStatusesBlock>
              {objectStatusesBlock}
            </StyledObjectStatusesBlock>

          </React.Fragment>
        );
      }
    };

    return (
      <DefaultReportPageContainer page={props.page} title={props.title}>
        <LabelColor backgroundColor="green">Все объекты</LabelColor>
        { checkRender() }
      </DefaultReportPageContainer>
    );
  },
);

export default DefaultReportFourth;
