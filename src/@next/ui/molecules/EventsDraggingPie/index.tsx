import * as React from 'react';
import {
  DataItem,
  useTheme,
  create,
  percent,
  Container,
  Slice,
  utils,
} from '@amcharts/amcharts4/core';
import { PieSeries, PieChart } from '@amcharts/amcharts4/charts';

import { WidgetElement } from 'app/swagger/model/widgetElement';
import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import { FILTER_ACTION } from 'app/types';
import { getMaxAvailableValueByCircle } from '@next/utils/common';
import uniqueId from 'lodash-es/uniqueId';

type Props = {
  data: WidgetElement[];
  currentFilter: WidgetElement[];
  onFilterChange: (dataItem: DataItem, action: FILTER_ACTION) => void;

  backgroundColor: string;
};

const dummyElement = {
  type: 'Dummy',
  disabled: true,
  value: 1,
  originValue: 1,
  valueToShow: 1,
  description: 'Выберите фильтр',
  color: '#dadada',
  opacity: 0.3,
  strokeDasharray: '4,4'
};

const createChartContainer = (selector: string): Container => {
  useTheme(am4themesAnimated);
  // cointainer to hold both charts
  const container = create(selector, Container);

  container.width = percent(100);
  container.height = percent(100);
  container.layout = 'horizontal';
  return container;
};

const radiusInPercent = 90;
const createChart = (container: Container): PieChart => {
  const chart = container.createChild(PieChart);
  chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
  chart.fontSize = 11;
  chart.radius = percent(radiusInPercent);
  chart.innerRadius = percent(radiusInPercent - 35);
  chart.zIndex = 1;
  return chart;
};

const createChartSeries = (chartInstance: PieChart, object: {category: string; value: string}) => {
  const series = chartInstance.series.push(new PieSeries());
  series.dataFields.value = object.value;
  series.dataFields.category = object.category;
  series.labels.template.disabled = true;
  series.colors.step = 2;
  series.alignLabels = false;

  series.minWidth = 500;
  series.minHeight = 500;

  return series;
};

const createSliceTemplate = (chartSeries: PieSeries, backgroundColor: string) => {
  const sliceTemplate = chartSeries.slices.template;
  sliceTemplate.cornerRadius = 5;
  sliceTemplate.draggable = true;
  sliceTemplate.inert = true;
  sliceTemplate.minWidth = 500;
  sliceTemplate.minHeight = 500;

  sliceTemplate.propertyFields.fill = 'color';
  sliceTemplate.propertyFields.fillOpacity = 'opacity';
  sliceTemplate.stroke = backgroundColor as any;
  sliceTemplate.propertyFields.strokeDasharray = 'strokeDasharray';
  sliceTemplate.strokeWidth = 2;
  sliceTemplate.strokeOpacity = 1;
  sliceTemplate.tooltipText = '{description}: {originValue}';
  return sliceTemplate;
};

const toggleDummySlice = (series: PieSeries) => {
  let show = true;
  for (let i = 1; i < series.dataItems.length; i++) {
    let dataItem = series.dataItems.getIndex(i);
    if (dataItem.slice.visible && !dataItem.slice.isHiding) {
      show = false;
    }
  }

  let dummySlice = series.dataItems.getIndex(0);
  if (show) {
    dummySlice.show();
  } else {
    dummySlice.hide();
  }
};

const handleDragStop = (
  leftSeries: PieSeries,
  rightSeries: PieSeries,
  container: Container,
  onFilterChange: (dataItem: DataItem, action: FILTER_ACTION) => void,
  typesFilters: ValuesOf<Props['currentFilter']>['type'][],
  setLocalTypesFilters: (typesFilters: ValuesOf<Props['currentFilter']>['type'][]) => any,
  event,
) => {
  const targetSlice: Slice = event.target;
  let slice1: Slice = null;
  let slice2: Slice = null;
  let dataItem1: DataItem = null;
  let dataItem2: DataItem = null;
  if (leftSeries.slices.indexOf(targetSlice) !== -1) {
    slice1 = targetSlice;
    slice2 = rightSeries.dataItems.getIndex(targetSlice.dataItem.index).slice;
  } else if (rightSeries.slices.indexOf(targetSlice) !== -1) {
    slice1 = leftSeries.dataItems.getIndex(targetSlice.dataItem.index).slice;
    slice2 = targetSlice;
  }

  dataItem1 = slice1.dataItem;
  dataItem2 = slice2.dataItem;

  const series1Center = utils.spritePointToSvg({ x: 0, y: 0 }, leftSeries.slicesContainer);
  const series2Center = utils.spritePointToSvg({ x: 0, y: 0 }, rightSeries.slicesContainer);

  const series1CenterConverted = utils.svgPointToSprite(series1Center, rightSeries.slicesContainer);
  const series2CenterConverted = utils.svgPointToSprite(series2Center, leftSeries.slicesContainer);

  // tooltipY and tooltipY are in the middle of the slice, so we use them to avoid extra calculations
  const targetSlicePoint = utils.spritePointToSvg(
    { x: Number(targetSlice.tooltipX), y: Number(targetSlice.tooltipY) },
    targetSlice
  );

  //направо
  if (targetSlice === slice1) {
    if (targetSlicePoint.x > container.pixelWidth / 2) {

      dataItem1.hide();

      var animation = slice1.animate([{ property: 'x', to: series2CenterConverted.x }, { property: 'y', to: series2CenterConverted.y }], 400);
      animation.events.on('animationprogress', function(event) {
        slice1.hideTooltip();
      });

      slice2.x = 0;
      slice2.y = 0;

      dataItem2.show();
      setLocalTypesFilters([
        ...typesFilters,
        (dataItem1.dataContext as WidgetElement).type,
      ]);
      onFilterChange(dataItem2, FILTER_ACTION.ADD);
    } else {
      slice1.animate([{ property: 'x', to: 0 }, { property: 'y', to: 0 }], 400);
    }
  }
  //налево
  if (targetSlice === slice2) {
    if (targetSlicePoint.x < container.pixelWidth / 2) {

      dataItem2.hide();

      var animation = slice2.animate([{ property: 'x', to: series1CenterConverted.x }, { property: 'y', to: series1CenterConverted.y }], 400);
      animation.events.on('animationprogress', function(event) {
        slice2.hideTooltip();
      });

      slice1.x = 0;
      slice1.y = 0;
      dataItem1.show();
      setLocalTypesFilters(typesFilters.filter((type) => type !== (dataItem1.dataContext as WidgetElement).type));
      onFilterChange(dataItem1, FILTER_ACTION.DELETE);
    } else {
      slice2.animate([{ property: 'x', to: 0 }, { property: 'y', to: 0 }], 400);
    }
  }

  toggleDummySlice(leftSeries);
  toggleDummySlice(rightSeries);

  leftSeries.hideTooltip();
  rightSeries.hideTooltip();

};

const EventsDraggingPie: React.FC<Props> = (props) => {
  const [id] = React.useState(() => uniqueId('chart_container-'));
  const { data, currentFilter } = props;

  const typesFilters = React.useMemo(() => currentFilter?.map(item => item.type) ?? [], [currentFilter]);

  // const [localTypesFilters, setLocalTypesFilters] = React.useState<typeof typesFilters>([]);

  const [chartContainer, setChartContainer] = React.useState<Container>(null);

  const [leftChartInstance, setLeftChartInstance] = React.useState<PieChart>(null);
  const [rightChartInstance, setRightChartInstance] = React.useState<PieChart>(null);

  const [leftChartSeriesInstance, setLeftChartSeriesInstance] = React.useState<PieSeries>(null);
  const [rightChartSeriesInstance, setRightChartSeriesInstance] = React.useState<PieSeries>(null);

  const onRightChartDataItemsValidated = React.useCallback(() => {
    if (rightChartSeriesInstance?.dataItems.length) {
      const dummyDataItem = rightChartSeriesInstance.dataItems.getIndex(0);
      dummyDataItem.slice.draggable = false;
      let hasVisibleItems = false;

      for (var i = 1; i < rightChartSeriesInstance.dataItems.length; i++) {
        const element = rightChartSeriesInstance.dataItems.getIndex(i);

        if (!typesFilters.includes((element.dataContext as WidgetElement).type)) {
          element.hide(0);
        } else {
          element.show(0);
          hasVisibleItems = true;
        }
      }

      if (!hasVisibleItems) {
        dummyDataItem.show(0);
      } else {
        dummyDataItem.hide(0);
      }
    }
  }, [rightChartSeriesInstance, typesFilters]);

  const onLeftChartDataItemsValidated = React.useCallback(() => {
    if (leftChartSeriesInstance?.dataItems.length) {
      const dummyDataItem = leftChartSeriesInstance.dataItems.getIndex(0);
      dummyDataItem.slice.draggable = false;
      let hasVisibleItems = false;

      for (var i = 1; i < leftChartSeriesInstance.dataItems.length; i++) {
        const element = leftChartSeriesInstance.dataItems.getIndex(i);

        if (typesFilters.includes((element.dataContext as WidgetElement).type)) {
          element.hide(0);
        } else {
          element.show(0);
          hasVisibleItems = true;
        }
      }

      if (!hasVisibleItems) {
        dummyDataItem.show(0);
      } else {
        dummyDataItem.hide(0);
      }
    }
  }, [leftChartSeriesInstance, typesFilters]);

  React.useEffect(() => {
    //создание контейнера и чартов
    const container = createChartContainer(id);
    const leftChart = createChart(container);
    const rightChart = createChart(container);
    container.logo.__disabled = true;

    setChartContainer(container);
    setLeftChartInstance(leftChart);
    setRightChartInstance(rightChart);

    //создание серий
    const leftChartSeries = createChartSeries(leftChart, {category: 'type', value: 'valueToShow'});
    leftChartSeries.ticks.template.disabled = true;
    const leftChartSliceTemplate = createSliceTemplate(leftChartSeries, props.backgroundColor);
    leftChartSliceTemplate.states.getKey('active').properties.shiftRadius = 0;

    const rightChartSeries = createChartSeries(rightChart, {category: 'type', value: 'valueToShow'});
    rightChartSeries.labels.template.propertyFields.disabled = 'disabled';
    rightChartSeries.ticks.template.disabled = true;

    //копируем поведение левого чарта в правый
    const rightChartSliceTemplate = rightChartSeries.slices.template;
    rightChartSliceTemplate.copyFrom(leftChartSliceTemplate);

    setLeftChartSeriesInstance(leftChartSeries);
    setRightChartSeriesInstance(rightChartSeries);

    return () => {
      try {
        container.dispose();
      } catch {
        // для православных
      }
    };
  }, [props.backgroundColor]);

  React.useEffect(
    () => {
      if (chartContainer && leftChartSeriesInstance && rightChartSeriesInstance) {
        const onDragstop = (event) => {
          return handleDragStop(
            leftChartSeriesInstance,
            rightChartSeriesInstance,
            chartContainer,
            props.onFilterChange,
            typesFilters,
            () => null,
            event,
          );
        };

        const onDown = (event) => {
          event.target.toFront();
          const series = event.target.dataItem.component as PieSeries;

          series.chart.zIndex = (series.chart.zIndex ?? 5) + 1;
        };
        const onUp = (event) => {
          const series = event.target.dataItem.component as PieSeries;

          series.chart.zIndex = (series.chart.zIndex ?? 5) - 1;
        };

        // события перетаскивания
        leftChartSeriesInstance.slices.template.events.on('down', onDown);
        leftChartSeriesInstance.slices.template.events.on('up', onUp);
        const handleDragStopLeft = leftChartSeriesInstance.slices.template.events.on('dragstop', onDragstop);

        //копируем поведение левого чарта в правый
        rightChartSeriesInstance.slices.template.events.on('down', onDown);
        const handleDragStopRight = rightChartSeriesInstance.slices.template.events.on('dragstop', onDragstop);
        rightChartSeriesInstance.slices.template.events.on('up', onUp);

        return () => {
          try {
            leftChartSeriesInstance.slices.template.events.off('down', onDown);
            leftChartSeriesInstance.slices.template.events.off('up', onUp);
            handleDragStopLeft.dispose();
            rightChartSeriesInstance.slices.template.events.off('down', onDown);
            rightChartSeriesInstance.slices.template.events.off('up', onUp);
            handleDragStopRight.dispose();
          } catch {
            // для православных
          }
        };
      }
    },
    [
      currentFilter,
      chartContainer,
      leftChartSeriesInstance?.data,
      rightChartSeriesInstance?.data,
      props.onFilterChange,
      typesFilters,
    ],
  );

  React.useEffect(() => {
    if (data && leftChartInstance && rightChartInstance) {
      const valuesToShow = getMaxAvailableValueByCircle(data.map((rowData) => rowData.value), 10);

      const newData = data.map((rowData, index) => ({
        ...rowData,
        originValue: rowData.value,
        valueToShow: valuesToShow[index],
      })).slice();
      newData.unshift(dummyElement);
      leftChartInstance.data = newData;
      rightChartInstance.data = newData;
    }
  }, [data, leftChartInstance, rightChartInstance, typesFilters]);

  React.useEffect(() => {
    if (rightChartSeriesInstance && leftChartSeriesInstance) {
      rightChartSeriesInstance.events.on('dataitemsvalidated', onRightChartDataItemsValidated);
      leftChartSeriesInstance.events.on('dataitemsvalidated', onLeftChartDataItemsValidated);

      return () => {
        try {
          rightChartSeriesInstance.events.off('dataitemsvalidated', onRightChartDataItemsValidated);
          leftChartSeriesInstance.events.off('dataitemsvalidated', onLeftChartDataItemsValidated);
        } catch {
          // для православных
        }
      };
    }
  }, [
    onRightChartDataItemsValidated,
    onLeftChartDataItemsValidated,
    rightChartSeriesInstance,
    leftChartSeriesInstance,
  ]);

  // React.useEffect(
  //   () => {
  //     if (rightChartSeriesInstance && leftChartSeriesInstance) {
  //       console.log('typesFilters', typesFilters, localTypesFilters);
  //       if (!isEqualStringArray(typesFilters, localTypesFilters)) {
  //         console.log('typesFilters true');
  //         rightChartSeriesInstance.dispatchImmediately('dataitemsvalidated');
  //         leftChartSeriesInstance.dispatchImmediately('dataitemsvalidated');

  //         setLocalTypesFilters(typesFilters);
  //       }
  //     }
  //   },
  //   [typesFilters],
  // );

  return <div id={id} style={{height: '100%', width: '100%'}}/>;
};

export default EventsDraggingPie;
