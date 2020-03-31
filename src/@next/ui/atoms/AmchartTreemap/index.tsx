import * as React from 'react';
import uniqueId from 'lodash-es/uniqueId';
import {
  useTheme,
  create,
  percent,
  color,
} from '@amcharts/amcharts4/core';
import { TreeMap, TreeMapSeries, LabelBullet, Legend } from '@amcharts/amcharts4/charts';

import am4themesAnimated from '@amcharts/amcharts4/themes/animated';
import CONSTANTS from '@next/constants';

type Props = {
  data: (
    {
      title?: string;
      color?: string;
      [k: string]: any;
    } & (
      {
        value: number;
      }
      | {
        children?: Props['data'];
      }
    )
  )[];

  labelTemplate?: string;
  tooltipColumnTemplate?: string;
  layoutAlgorithName?: 'binaryTree' | 'dice' | 'slice' | 'sliceDice' | 'squarify';
  noLegend?: boolean;

  backgroundColor: string;
};

const createChartContainer = (selector: string) => {
  useTheme(am4themesAnimated);
  const container = create(selector, TreeMap);
  container.logo.__disabled = true;

  container.hiddenState.properties.opacity = 0;

  container.width = percent(CONSTANTS.PERCENT.ONE_HUNDRED_PERCENT);
  container.height = percent(CONSTANTS.PERCENT.ONE_HUNDRED_PERCENT);

  return container;
};

const AmchartTreemap: React.FC<Props> = React.memo(
  (props) => {
    const [id] = React.useState(() => uniqueId('chart_container-'));

    const [chartContainer, setChartContainer] = React.useState<TreeMap>(null);
    // const [level0ST, setLevel0ST] = React.useState<TreeMapSeries>(null);
    const [level1ST, setLevel1ST] = React.useState<TreeMapSeries>(null);

    React.useEffect(
      () => {
        const container = createChartContainer(id);
        setChartContainer(container);

        return () => {
          container.dispose();
          setChartContainer(null);
        };
      },
      [],
    );

    React.useEffect(
      () => {
        if (chartContainer) {
          chartContainer.layoutAlgorithm = chartContainer[props.layoutAlgorithName || 'squarify'];
        }
      },
      [chartContainer, props.layoutAlgorithName],
    );

    React.useEffect(
      () => {
        if (chartContainer) {
          chartContainer.data = props.data;
        }
      },
      [chartContainer, props.data],
    );

    React.useEffect(
      () => {
        if (chartContainer) {
          chartContainer.colors.step = 2;

          // define data fields
          chartContainer.dataFields.value = 'value';
          chartContainer.dataFields.name = 'title';
          chartContainer.dataFields.children = 'children';
          chartContainer.dataFields.color = 'color';

          chartContainer.zoomable = false;
        }
      },
      [chartContainer],
    );

    React.useEffect(
      () => {
        if (chartContainer) {
          // level 0 series template
          const level0SeriesTemplate = chartContainer.seriesTemplates.create('0');
          const level0ColumnTemplate = level0SeriesTemplate.columns.template;

          level0ColumnTemplate.column.cornerRadius(10, 10, 10, 10);
          level0ColumnTemplate.fillOpacity = 0;
          level0ColumnTemplate.strokeWidth = 4;
          level0ColumnTemplate.strokeOpacity = 0;

          // setLevel0ST(level0SeriesTemplate);
        }
      },
      [chartContainer],
    );

    React.useEffect(
      () => {
        if (chartContainer) {
          // level 1 series template
          let level1SeriesTemplate = chartContainer.seriesTemplates.create('1');
          let level1ColumnTemplate = level1SeriesTemplate.columns.template;

          level1SeriesTemplate.tooltip.pointerOrientation = 'down';
          level1SeriesTemplate.tooltip.dy = -15;

          level1SeriesTemplate.tooltip.animationDuration = 0;
          level1SeriesTemplate.strokeOpacity = 1;

          level1ColumnTemplate.column.cornerRadius(10, 10, 10, 10);
          level1ColumnTemplate.fillOpacity = 1;
          level1ColumnTemplate.strokeWidth = 2;
          level1ColumnTemplate.stroke = props.backgroundColor as any;

          level1ColumnTemplate.tooltipText = props.tooltipColumnTemplate;
          setLevel1ST(level1SeriesTemplate);
        }
      },
      [chartContainer, props.tooltipColumnTemplate, props.backgroundColor],
    );

    React.useEffect(
      () => {
        if (level1ST) {
          let bullet1 = level1ST.bullets.push(new LabelBullet());
          bullet1.locationY = 0.5;
          bullet1.locationX = 0.5;
          bullet1.label.text = props.labelTemplate;

          bullet1.label.fill = color('#ffffff');
        }
      },
      [level1ST, props.labelTemplate]
    );

    React.useEffect(
      () => {
        if (chartContainer) {
          chartContainer.maxLevels = 2;
        }
      },
      [chartContainer],
    );

    React.useEffect(
      () => {
        if (chartContainer && !props.noLegend) {
          chartContainer.legend = new Legend();
        }
      },
      [chartContainer, props.noLegend],
    );

    return <div id={id} style={{height: '100%', width: '100%'}}/>;
  },
);

export default AmchartTreemap;
