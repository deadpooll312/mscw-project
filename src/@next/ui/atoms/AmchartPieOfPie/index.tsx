import * as React from 'react';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import {
  Line,
  useTheme,
  create,
  percent,
  Container,
  Slice,
  utils,
  math,
  InterfaceColorSet,
  ease,
} from '@amcharts/amcharts4/core';
import { PieSeries, PieChart } from '@amcharts/amcharts4/charts';

import CONSTANTS from '@next/constants';
import uniqueId from 'lodash-es/uniqueId';

type Props = {
  data: {
    title?: string;
    color?: string;
    value?: number;
    children?: Omit<Props['data'], 'children'>;
  }[];

  labelTemplate?: string;
  tooltipColumnTemplate?: string;
  layoutAlgorithName?: 'binaryTree' | 'dice' | 'slice' | 'sliceDice' | 'squarify';
  noLegend?: boolean;

  backgroundColor: string;
};

const createChartContainer = (selector: string) => {
  useTheme(am4themesAnimated);
  const container = create(selector, Container);
  container.logo.__disabled = true;

  container.hiddenState.properties.opacity = 0;

  container.width = percent(CONSTANTS.PERCENT.EIGHTY_PERCENT);
  container.height = percent(CONSTANTS.PERCENT.ONE_HUNDRED_PERCENT);
  container.layout = 'horizontal';

  return container;
};

const AmchartPieOfPie: React.FC<Props> = React.memo(
  (props) => {
    const [id] = React.useState(() => uniqueId('chart_container-'));
    const [chartContainer, setChartContainer] = React.useState<Container>(null);
    const [chartBigLeft, setChartBigLeft] = React.useState<PieChart>(null);
    const [chartSmallRight, setChartSmallRightNew] = React.useState<PieChart>(null);

    const [chartBigLeftSeries, setChartBigLeftSeries] = React.useState<PieSeries>(null);
    const [chartSmallRightSeries, setChartSmallRightSeries] = React.useState<PieSeries>(null);

    const [lineOne, setLineOne] = React.useState<Line>(null);
    const [lineTwo, setLineTwo] = React.useState<Line>(null);

    React.useEffect(
      () => {
        const container = createChartContainer(id);
        setChartContainer(container);

        return () => {
          container.dispose();
          setChartContainer(null);
        };
      },
      [id],
    );

    React.useEffect(
      () => {
        if (chartContainer) {
          const chartBigLeftNew = chartContainer.createChild(PieChart);
          setChartBigLeft(chartBigLeftNew);
        }
      },
      [chartContainer],
    );

    React.useEffect(
      () => {
        if (chartContainer) {
          const chartSmallRightNew = chartContainer.createChild(PieChart);
          chartSmallRightNew.width = percent(CONSTANTS.PERCENT.TWENTY_PERCENT);
          chartSmallRightNew.radius = percent(CONSTANTS.PERCENT.SIXTY_PERCENT);

          setChartSmallRightNew(chartSmallRightNew);
        }
      },
      [chartContainer],
    );

    React.useEffect(
      () => {
        if (chartBigLeft) {
          const pieSeries = chartBigLeft.series.push(new PieSeries());

          pieSeries.dataFields.value = 'value';
          pieSeries.dataFields.category = 'title';

          pieSeries.slices.template.states.getKey('active').properties.shiftRadius = 0;
          pieSeries.slices.template.propertyFields.fill = 'color';

          pieSeries.labels.template.disabled = true;
          pieSeries.ticks.template.disabled = true;
          pieSeries.alignLabels = false;

          setChartBigLeftSeries(pieSeries);
        }
      },
      [chartBigLeft],
    );

    React.useEffect(
      () => {
        if (chartBigLeftSeries && props.tooltipColumnTemplate) {
          chartBigLeftSeries.slices.template.tooltipText = props.tooltipColumnTemplate;
        }
      },
      [chartBigLeftSeries, props.tooltipColumnTemplate],
    );

    React.useEffect(
      () => {
        if (chartSmallRight) {
          const pieSeriesRight = chartSmallRight.series.push(new PieSeries());
          pieSeriesRight.dataFields.value = 'value';
          pieSeriesRight.dataFields.category = 'title';
          pieSeriesRight.slices.template.states.getKey('active').properties.shiftRadius = 0;

          // pieSeriesRight.labels.template.disabled = true;
          // pieSeriesRight.ticks.template.disabled = true;
          // pieSeriesRight.alignLabels = false;

          setChartSmallRightSeries(pieSeriesRight);
        }
      },
      [chartSmallRight],
    );

    React.useEffect(
      () => {
        if (chartContainer) {
          const interfaceColors = new InterfaceColorSet();

          const line1 = chartContainer.createChild(Line);
          line1.strokeDasharray = '2,2';
          line1.strokeOpacity = 0.5;
          line1.stroke = interfaceColors.getFor('alternativeBackground');
          line1.isMeasured = false;

          const line2 = chartContainer.createChild(Line);
          line2.strokeDasharray = '2,2';
          line2.strokeOpacity = 0.5;
          line2.stroke = interfaceColors.getFor('alternativeBackground');
          line2.isMeasured = false;

          setLineOne(line1);
          setLineTwo(line2);
        }
      },
      [chartContainer],
    );

    React.useEffect(
      () => {
        if (chartBigLeft && chartSmallRightSeries && chartSmallRight && chartBigLeftSeries && lineOne && lineTwo) {
          let selectedSlice: Slice = null;

          const updateLines = () => {
            if (selectedSlice) {
              let p11 = {
                x: selectedSlice.radius * math.cos(selectedSlice.startAngle),
                y: selectedSlice.radius * math.sin(selectedSlice.startAngle),
              };
              let p12 = {
                x: selectedSlice.radius * math.cos(selectedSlice.startAngle + selectedSlice.arc),
                y: selectedSlice.radius * math.sin(selectedSlice.startAngle + selectedSlice.arc),
              };

              p11 = utils.spritePointToSvg(p11, selectedSlice);
              p12 = utils.spritePointToSvg(p12, selectedSlice);

              let p21 = { x: 0, y: -chartSmallRightSeries.pixelRadius };
              let p22 = { x: 0, y: chartSmallRightSeries.pixelRadius };

              p21 = utils.spritePointToSvg(p21, chartSmallRightSeries);
              p22 = utils.spritePointToSvg(p22, chartSmallRightSeries);

              lineOne.x1 = p11.x;
              lineOne.x2 = p21.x;
              lineOne.y1 = p11.y;
              lineOne.y2 = p21.y;

              lineTwo.x1 = p12.x;
              lineTwo.x2 = p22.x;
              lineTwo.y1 = p12.y;
              lineTwo.y2 = p22.y;
            }
          };

          const selectSlice = (dataItem) => {
            selectedSlice = dataItem.slice;

            let fill = selectedSlice.fill;

            let count = dataItem.dataContext.children?.length ?? CONSTANTS.COUNT.ZERO;
            chartSmallRightSeries.colors.list = [];
            for (var i = 0; i < count; i++) {
              chartSmallRightSeries.colors.list.push((fill as any).brighten(i * 2 / count));
            }

            chartSmallRight.data = dataItem.dataContext.children ?? [];
            chartSmallRightSeries.appear();

            let middleAngle = selectedSlice.middleAngle;
            let firstAngle = chartBigLeftSeries.slices.getIndex(CONSTANTS.INDEX_OF_ARR.FIRST_INDEX).startAngle;
            let animation = chartBigLeftSeries.animate(
              [
                {
                  property: 'startAngle',
                  to: firstAngle - middleAngle,
                },
                {
                  property: 'endAngle',
                  to: firstAngle - middleAngle + CONSTANTS.ANGLE.FULL_CIRCLE_IN_DEG,
                },
              ],
              CONSTANTS.TIME.SIX_HUNDRED_MS,
              ease.sinOut,
            );
            animation.events.on('animationprogress', updateLines);

            selectedSlice.events.on('transformed', updateLines);
          };

          const timeoutSliceOnDatavalidated = function(e) {
            setTimeout(function() {
              const firstSlice = chartBigLeftSeries.dataItems.getIndex(CONSTANTS.INDEX_OF_ARR.FIRST_INDEX);
              if (firstSlice) {
                selectSlice(firstSlice);
              }
            }, CONSTANTS.TIME.ONE_SECOND_IN_MS);
          };
          const selectSliceFromSeries = function(event) {
            selectSlice(event.target.dataItem);
          };

          chartBigLeft.events.on('datavalidated', timeoutSliceOnDatavalidated);
          chartSmallRightSeries.events.on('positionchanged', updateLines);
          chartBigLeftSeries.slices.template.events.on('hit', selectSliceFromSeries);
        }
      },
      [chartContainer, chartSmallRightSeries, chartSmallRight, chartBigLeftSeries, chartBigLeft],
    );

    React.useEffect(
      () => {
        if (chartBigLeft) {
          chartBigLeft.data = props.data?.slice();
        }
      },
      [JSON.stringify(props.data), chartBigLeft],
    );

    return <div id={id} style={{height: '100%', width: '100%'}}/>;
  },
);

export default AmchartPieOfPie;
