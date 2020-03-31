import * as React from 'react';
import uniqueId from 'lodash-es/uniqueId';
import {
  useTheme,
  create,
  color,
  MouseCursorStyle,
} from '@amcharts/amcharts4/core';
import {
  Column,
  XYChart,
  CategoryAxis,
  ValueAxis,
  ColumnSeries,
  LabelBullet,
  AxisRenderer,
} from '@amcharts/amcharts4/charts';

import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import { WidgetElement } from 'app/swagger/model/widgetElement';
import { getFillPercent } from '@next/utils/common';

type Props = {
  chartData: WidgetElement[];
  cursorEnabled?: boolean;
  selectedType?: string;
  onColumnClick: (event: {target: WidgetElement}) => void;

  backgroundColor: string;
};

const createChart = <T extends {color?: string}[]>(
  selector: string,
  object: {category: string; value: string},
  backgroundColor: string,
) => {
  useTheme(am4themesAnimated);

  // Create chart instance
  const chart = create(selector, XYChart);
  chart.numberFormatter.numberFormat = '#';
  chart.maskBullets = false;
  chart.paddingRight = 85;

  // Create axes
  const categoryAxis = chart.yAxes.push(new CategoryAxis());
  categoryAxis.dataFields.category = object.category;
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 20;
  categoryAxis.renderer.grid.template.disabled = true;

  const valueAxis = chart.xAxes.push(new ValueAxis());
  valueAxis.renderer.grid.template.disabled = true;
  valueAxis.renderer.labels.template.disabled = true;

  // Create series
  const series = chart.series.push(new ColumnSeries());
  series.dataFields.valueX = object.value;
  series.dataFields.categoryY = object.category;
  series.stroke = backgroundColor as any;
  series.fill = color('rgb(59, 85, 163)');
  series.columns.template.tooltipText = `{description}: [bold]{${object.value}}[/]`;

  const valueLabel = series.bullets.push(new LabelBullet());
  valueLabel.label.text = '[bold]{valueX}[/] [gray font-size: 11px] ({violationToCheckedPercent}%)[/]';
  valueLabel.label.horizontalCenter = 'left';
  valueLabel.label.dx = 10;
  valueLabel.label.truncate = false;
  valueLabel.label.hideOversized = false;

  // Установка своих цветов
  series.columns.template.adapter.add('fill', (fill, target) => {
    return target.dataItem ? chart.colors.getIndex(target.dataItem.index) : fill;
  });

  //удаление лого с ссылкорй на либу
  chart.logo.__disabled = true;
  return { chart, series, categoryAxis };
};

const DistrictXYChart: React.FC<Props> = (props) => {
  const [id] = React.useState(() => uniqueId('chart_container-'));
  const { chartData, cursorEnabled, onColumnClick } = props;
  const [chartInstance, setChartInstance] = React.useState<XYChart>(null);
  const [chartSeriesInstance, setChartSeriesInstance] = React.useState<ColumnSeries>(null);
  const [ categoryAxis, setCategoryAxis ] = React.useState<CategoryAxis<AxisRenderer>>(null);

  const onChartClick = React.useCallback(
    (event: {
        type: 'down';
        target: Column;
      }
    ) => {
      const target: WidgetElement = event.target.dataItem.dataContext;
      onColumnClick({ target });
    }, [onColumnClick]);

  React.useEffect(() => {
    const { chart, series: chartSeries, categoryAxis: chartCategoryAxis } = createChart<WidgetElement[]>(id, {category: 'type', value: 'violationObjectCount'}, props.backgroundColor);
    setChartInstance(chart);
    setChartSeriesInstance(chartSeries);
    setCategoryAxis(chartCategoryAxis);
    chartSeries.columns.template.events.on<Column, 'down'>('down', onChartClick);
    return () => {
      try {
        chartSeries.columns.template.events.off<Column, 'down'>('down', onChartClick);
        setChartInstance(null);
        chart.dispose();
      } catch (e) {
      }
    };
  }, [props.backgroundColor]);

  React.useEffect(() => {
    if (chartInstance) {
      chartInstance.data = chartData;

      const colors = [];
      chartData?.map(item=> {
        colors.push(color(`${item.color}`));
      }
      );

      // Modify chart's colors
      chartInstance.colors.list = colors;

      if (cursorEnabled){
        chartSeriesInstance.columns.template.cursorOverStyle = MouseCursorStyle.pointer;
      } else {
        chartSeriesInstance.columns.template.cursorOverStyle = null;
      }
      categoryAxis.renderer.labels.template.adapter.add('text', (_, target) => {
        return `${(target?.dataItem?.dataContext as WidgetElement)?.type === props.selectedType ? '[bold font-size:15px text-transform: uppercase]' : '' } {description}`;
      } );
    }

  }, [chartInstance, chartData, cursorEnabled, props.selectedType]);

  // @todo 15 через пропсы
  const heightPercent = getFillPercent(100, 15, chartData?.length);
  return <div id={id} style={{height: `${heightPercent}%`, width: '90%', top: '50%', transform: 'translateY(-50%)'}}/>;
};

export default DistrictXYChart;
