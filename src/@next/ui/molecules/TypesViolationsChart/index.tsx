import * as React from 'react';
import {
  useTheme,
  create,
  color,
} from '@amcharts/amcharts4/core';
import {
  ValueAxisBreak,
  XYChart,
  CategoryAxis,
  ValueAxis,
  ColumnSeries,
} from '@amcharts/amcharts4/charts';
import { WidgetElement } from 'app/swagger/model/widgetElement';
import styled from 'styled-components';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import uniqueId from 'lodash-es/uniqueId';

type Props = {
  data: WidgetElement[];

  backgroundColor: string;
};

const createColumnChart = (selector: string, backgroundColor: string): { chart: XYChart; axisBreak: ValueAxisBreak }  => {
  useTheme(am4themesAnimated);

  const chart = create(selector, XYChart);

  const categoryAxis = chart.xAxes.push(new CategoryAxis());
  categoryAxis.dataFields.category = 'type';
  categoryAxis.renderer.labels.template.adapter.add('text', () => '{description}');

  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 20;

  const valueAxis = chart.yAxes.push(new ValueAxis());
  valueAxis.min = 0;
  valueAxis.renderer.minGridDistance = 20;
  valueAxis.renderer.grid.template.location = 0;

  // axis break
  const axisBreak = valueAxis.axisBreaks.create();
  axisBreak.breakSize = 0.3;

  const hoverState = axisBreak.states.create('hover');
  hoverState.properties.breakSize = 2;
  hoverState.properties.opacity = 0.1;
  hoverState.transitionDuration = 1500;

  axisBreak.defaultState.transitionDuration = 1000;

  // Configure axis label
  const label = categoryAxis.renderer.labels.template;
  label.wrap = true;
  label.maxWidth = 150;

  // Create series
  const series = chart.series.push(new ColumnSeries());
  series.dataFields.valueY = 'value';
  series.dataFields.categoryX = 'type';
  series.stroke = backgroundColor as any;
  series.columns.template.tooltipText = '{description}: [bold]{value} ({percent} %)[/]';

  // Установка своих цветов
  series.columns.template.adapter.add('fill', (fill, target) => {
    return target.dataItem ? chart.colors.getIndex(target.dataItem.index) : fill;
  });

  chart.logo.__disabled = true;

  return {
    chart,
    axisBreak
  };
};

const ColumnsChart: React.FC<Props> = (props) => {
  const [id] = React.useState(() => uniqueId('chart_container-'));
  const { data } = props;
  const [chartInstance, setChartInstance] = React.useState<XYChart>(null);
  const [axisBreakInstance, setAxisBreakInstance] = React.useState<ValueAxisBreak>(null);

  React.useEffect(()=>{
    const { chart: columnChart, axisBreak } = createColumnChart(id, props.backgroundColor);

    setChartInstance(columnChart);
    setAxisBreakInstance(axisBreak);

    return () => {
      columnChart.dispose();
      setAxisBreakInstance(null);
      setChartInstance(null);
    };
  }, [props.backgroundColor]);

  React.useEffect(() => {
    if (chartInstance) {
      chartInstance.data = data;

      const colors = [];
      data?.map(item => {
        colors.push(color(`${item.color}`));
      }
      );

      // Modify chart's colors
      chartInstance.colors.list = colors;

      if (data?.length){
        const startValue = data[0].value / 2;
        const endValue = startValue + (data[0].value / 100) * 20;

        axisBreakInstance.startValue = startValue;
        axisBreakInstance.endValue = endValue;
      }

    }
  }, [data, chartInstance]);

  return <ColumnsChartContainer id={id} />;
};

export default ColumnsChart;

const ColumnsChartContainer = styled.div`
  height: 90%;
  width: 95%;
  margin: 0 auto;
`;
