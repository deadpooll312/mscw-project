import * as React from 'react';
import {
  Container,
  useTheme,
  create,
  color,
  MouseCursorStyle,
  percent,
  Percent,
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
import { getFillPercent, getMaxAvailableValueByCircle } from '@next/utils/common';
import { AdvancedWidgetElement } from 'app/store/modules/dashboard/types';
import uniqueId from 'lodash-es/uniqueId';

type Props = {
  chartData: AdvancedWidgetElement[];
  cursorEnabled?: boolean;
  selectedType?: string;
  isRegion?: boolean;
  onColumnClick: (event: {target: AdvancedWidgetElement}) => void;

  backgroundColor: string;
};

// const LIGHT_GREEN = '#67DC75';
const LIGHT_GREEN = '#67DCBB';

const CATEGORY_OBJECT_RIGHT = {
  category: 'type',
  value: 'violationObjectCount',
  valueToShow: 'violationsValuesToShow',
  total: 'checkedObjectCount',
  percent: 'violationToCheckedPercent'
} as const;
const CATEGORY_OBJECT_LEFT = {
  category: 'type',
  value: 'checkedObjectCount',
  valueToShow: 'checkesValuesToShow',
  total: 'objectCount',
  percent: 'checkedToObjectPercent'
} as const;

const createChartContainer = (selector: string): Container => {
  useTheme(am4themesAnimated);
  // cointainer to hold both charts
  const container = create(selector, Container);

  container.width = percent(100);
  container.height = percent(100);
  container.paddingLeft = 90;
  container.paddingRight = 90;
  container.layout = 'horizontal';
  container.logo.__disabled = true;

  return container;
};

const createXYChart = (
  container: Container,
  object: {category: string; value: string; valueToShow: string},
  reverse?: boolean
) => {
  const chart = container.createChild(XYChart);
  chart.paddingLeft = 0;
  chart.hiddenState.properties.opacity = 0;
  chart.fontSize = 11;
  chart.zIndex = 1;
  chart.numberFormatter.numberFormat = '#';
  chart.maskBullets = false;
  chart.paddingRight = 0;

  // Create axes
  const categoryAxis = chart.yAxes.push(new CategoryAxis());
  categoryAxis.dataFields.category = object.category;
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 20;
  categoryAxis.renderer.grid.template.disabled = true;

  const valueAxis = chart.xAxes.push(new ValueAxis());
  valueAxis.min = 0;
  valueAxis.renderer.grid.template.opacity = 0;
  valueAxis.renderer.ticks.template.disabled = true;
  valueAxis.renderer.baseGrid.disabled = true;
  valueAxis.renderer.labels.template.disabled = true;
  valueAxis.renderer.minGridDistance = 50;

  if (reverse) {
    valueAxis.renderer.inversed = true;
  }

  return  { chart, categoryAxis};
};

const createChartSeries = (
  chartInstance: XYChart,
  object: {category: string; value: string; valueToShow: string; total: string; percent: string},
  backgroundColor: string,
  reverse?: boolean
) => {
  const series = chartInstance.series.push(new ColumnSeries());
  series.dataFields.valueX = object.valueToShow;
  series.dataFields.categoryY = object.category;
  series.fill = color('rgb(59, 85, 163)');
  series.columns.template.tooltipText = `{description}: [bold]{${object.value}}[/] из [bold]{${object.total}}[/]`;

  series.stroke = backgroundColor as any;

  // series.minWidth = 500;
  // series.minHeight = 500;

  const valueLabel = series.bullets.push(new LabelBullet());
  valueLabel.label.text = `[bold]{${object.value}}[/] [bold gray font-size: 11px]{checked} ({${object.percent}}%)[/]`;
  valueLabel.label.truncate = false;
  valueLabel.label.hideOversized = false;

  if (reverse) {
    valueLabel.label.horizontalCenter = 'right';
    valueLabel.label.dx = -10;
  } else {
    valueLabel.label.horizontalCenter = 'left';
    valueLabel.label.dx = 10;
  }

  series.clustered = false;

  return { series };
};

const RegionsXYChart: React.FC<Props> = React.memo(
  (props) => {
    const [id] = React.useState(() => uniqueId('chart_container-'));
    const { chartData, cursorEnabled, onColumnClick } = props;

    const [leftChartInstance, setLeftChartInstance] = React.useState<XYChart>(null);
    const [rightChartInstance, setRightChartInstance] = React.useState<XYChart>(null);
    const [leftChartSeriesInstance, setLeftChartSeriesInstance] = React.useState<ColumnSeries>(null);
    const [rightChartSeriesInstance, setRightChartSeriesInstance] = React.useState<ColumnSeries>(null);
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
      const container = createChartContainer(id);
      const { chart: leftChart, categoryAxis: leftChartCategoryAxis } = createXYChart(container, CATEGORY_OBJECT_LEFT, true);
      const { chart: rightChart, categoryAxis: rightChartCategoryAxis}  = createXYChart(container, CATEGORY_OBJECT_RIGHT);

      setLeftChartInstance(leftChart);
      setRightChartInstance(rightChart);

      leftChart.width = new Percent(35);
      rightChart.width = new Percent(45);

      const {series: leftChartSeries } = createChartSeries(
        leftChart,
        CATEGORY_OBJECT_LEFT,
        props.backgroundColor,
        true
      );

      const {series: rightChartSeries } = createChartSeries(
        rightChart,
        CATEGORY_OBJECT_RIGHT,
        props.backgroundColor
      );

      leftChartSeries.columns.template.events.on<Column, 'down'>('down', onChartClick);
      rightChartSeries.columns.template.events.on<Column, 'down'>('down', onChartClick);
      // leftChartCategoryAxis.renderer.line.disabled = true;
      leftChartCategoryAxis.renderer.labels.template.disabled = true;

      setCategoryAxis(rightChartCategoryAxis);
      setRightChartSeriesInstance(rightChartSeries);
      setLeftChartSeriesInstance(leftChartSeries);

      return () => {
        try {
          leftChartSeries.columns.template.events.off<Column, 'down'>('down', onChartClick);
          rightChartSeries.columns.template.events.off<Column, 'down'>('down', onChartClick);
          container.dispose();
        } catch (e) {
        }
      };
    }, [props.backgroundColor]);

    React.useEffect(() => {
      if (chartData && leftChartInstance && rightChartInstance) {
        const violationsValuesToShow = getMaxAvailableValueByCircle(chartData.map((rowData) => rowData.violationObjectCount), 1);
        const checkesValuesToShow = getMaxAvailableValueByCircle(chartData.map((rowData) => rowData.checkedObjectCount), 1);

        const newData = chartData.map((rowData, index) => ({
          ...rowData,
          violationsValuesToShow: violationsValuesToShow[index],
          checkesValuesToShow: checkesValuesToShow[index]
        })).slice();
        leftChartInstance.data = newData;
        rightChartInstance.data = newData;
        if (cursorEnabled){
          leftChartSeriesInstance.columns.template.cursorOverStyle = MouseCursorStyle.pointer;
          rightChartSeriesInstance.columns.template.cursorOverStyle = MouseCursorStyle.pointer;
        } else {
          leftChartSeriesInstance.columns.template.cursorOverStyle = null;
          rightChartSeriesInstance.columns.template.cursorOverStyle = null;
        }
        categoryAxis.renderer.labels.template.adapter.add('text', (_, target) => {
          return `${(target?.dataItem?.dataContext as WidgetElement)?.type === props.selectedType ? '[bold font-size:13px text-transform: uppercase]' : '' } {description}`;
        } );

        categoryAxis.renderer.labels.template.textAlign = 'middle';

        if (props.isRegion) {
          if (props.selectedType) {
            categoryAxis.renderer.labels.template.width = 180;
            leftChartInstance.width = new Percent(20);
            rightChartInstance.width = new Percent(50);
          } else {
            categoryAxis.renderer.labels.template.width = 135;
            leftChartInstance.width = new Percent(30);
            rightChartInstance.width = new Percent(50);
          }
        } else {
          categoryAxis.renderer.labels.template.minWidth = 60;
        }

        categoryAxis.renderer.labels.template.horizontalCenter = 'middle';

        // categoryAxis.renderer.labels.template.marginRight = 20;

        const colors = [];
        chartData?.map(item=> {
          colors.push(color(`${item.color}`));
        });

        // Modify chart's colors
        leftChartInstance.colors.list = colors;
        rightChartInstance.colors.list = colors;

        //Установка своих цветов
        rightChartSeriesInstance.columns.template.adapter.add('fill', (fill, target) => {
          return target.dataItem ? rightChartInstance.colors.getIndex(target.dataItem.index) : fill;
        });

        leftChartSeriesInstance.columns.template.adapter.add('fill', (fill, target) => color(LIGHT_GREEN));

      }

    }, [chartData, leftChartInstance, rightChartInstance, props.isRegion]);

    // @todo 12 через пропсы
    const heightPercent = getFillPercent(100, 12, chartData?.length);
    return <div id={id} style={{height: `${heightPercent}%`}}/>;
  });

export default RegionsXYChart;
