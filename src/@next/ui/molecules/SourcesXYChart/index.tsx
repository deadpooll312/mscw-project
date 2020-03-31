import * as React from 'react';
import {
  useTheme,
  create,
  color,
} from '@amcharts/amcharts4/core';
import {
  XYChart,
  CategoryAxis,
  ValueAxis,
  ColumnSeries,
  LabelBullet,
} from '@amcharts/amcharts4/charts';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import { WidgetElement } from 'app/swagger/model/widgetElement';
import { getFillPercent } from '@next/utils/common';
import uniqueId from 'lodash-es/uniqueId';

type Props = {
  chartData: WidgetElement[];

  backgroundColor: string;
};

const createXYChart = (selector: string, object: { category: string; value: string }, backgroundColor: string): XYChart => {
  // Create chart instance
  useTheme(am4themesAnimated);
  const chart = create(selector, XYChart);
  chart.numberFormatter.numberFormat = '#';
  chart.maskBullets = false;
  chart.paddingRight = 150;

  // Create axes
  const categoryAxis = chart.yAxes.push(new CategoryAxis());
  categoryAxis.dataFields.category = object.category;
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 20;
  categoryAxis.renderer.grid.template.disabled = true;
  categoryAxis.renderer.labels.template.adapter.add('text', () => '{description}');

  const valueAxis = chart.xAxes.push(new ValueAxis());
  valueAxis.renderer.grid.template.disabled = true;
  valueAxis.renderer.labels.template.disabled = true;

  // Configure axis label
  const label = categoryAxis.renderer.labels.template;
  label.wrap = true;

  // Create series
  const series = chart.series.push(new ColumnSeries());
  series.dataFields.valueX = object.value;
  series.dataFields.categoryY = object.category;
  series.stroke = backgroundColor as any;
  // series.fill = color('rgb(59, 85, 163)');
  series.columns.template.tooltipText = `{description}: [bold]{${object.value}}[/]`;

  const valueLabel = series.bullets.push(new LabelBullet());
  valueLabel.label.text = '[bold]{valueX}[/] [gray font-size: 12px]{checked} ({percent}%)[/]';
  valueLabel.label.horizontalCenter = 'left';
  valueLabel.label.dx = 10;
  valueLabel.label.truncate = false;
  valueLabel.label.hideOversized = false;

  // Установка своих цветов
  series.columns.template.adapter.add('fill', (fill, target) => {
    return target.dataItem ? chart.colors.getIndex(target.dataItem.index) : fill;
  });

  chart.logo.__disabled = true;

  return chart;

};

const SourcesXYChart: React.FC<Props> = (props) => {
  const [id] = React.useState(() => uniqueId('chart_container-'));
  const { chartData } = props;
  const [chartInstance, setChartInstance] = React.useState<XYChart>(null);

  React.useEffect(() => {

    const chart = createXYChart(id, {category: 'type', value: 'value'}, props.backgroundColor);
    setChartInstance(chart);

    return () => {
      chart.dispose();
      setChartInstance(null);
    };
  }, [props.backgroundColor]);

  React.useEffect(() => {
    if (chartData && chartInstance) {
      chartInstance.data = chartData;
      const colors = [];
      chartData?.map( item => {
        colors.push(color(`${item.color}`));
      }
      );
    
      // Modify chart's colors
      chartInstance.colors.list = colors;
    }
  }, [chartData, chartInstance]);

  // @todo 14 через пропсы
  const heightPercent = getFillPercent(100, 14, chartData?.length);
  return (
    <div
      id={id}
      style={{height: `${heightPercent}%`, width: '100%', top: '50%', transform: 'translateY(-50%)'}}/>
  );
};

export default SourcesXYChart;
