import uniqBy from 'lodash-es/uniqBy';
import { MomentInput } from 'moment';

import { ChartObject } from 'app/store/modules/analytics/types';
import { WidgetDataLine, WidgetDataCirle, WidgetDataCharts } from 'app/store/modules/analytics/types';
import { getCurrentMomentDate, getUtcDate, set2059IfNotToday } from '@next/utils/dates';

export const getDateParams = (propsDate: MomentInput) => {
  const currentDate = getCurrentMomentDate();
  const date = propsDate ? propsDate : currentDate;
  // const startDate = toUTC(set21Hours(date));
  const endDate = getUtcDate(set2059IfNotToday(date));

  return {
    // date: startDate,
    date: getUtcDate(getCurrentMomentDate()),
    startDateArea: getUtcDate(getCurrentMomentDate().subtract(1, 'days')),
    endDate,
    endDateArea: getUtcDate(getCurrentMomentDate())
  };
};

export const getChartObjects = (dataCharts: WidgetDataLine['charts']) => {
  const result: ChartObject[] = dataCharts?.reduce((accum: any, item) =>{
    return (accum as ChartObject[]).concat(item.objects);
  }, [] as ChartObject[]);
  return uniqBy(result, 'name');
};

export const getPageLegend = (colorCode: WidgetDataLine['colorSchema']['colorCode'], data: WidgetDataLine) => {
  return getChartObjects(data?.charts)?.map((item) => {
    const color = colorCode.find((color) => color.code === item.type) || null;

    return ({
      color: color?.color || 'black',
      code: color?.code ||  'no_violation',
      description: item.name,
    });
  }) || [];
};

export const getColorCode = (...arr: [WidgetDataCirle, WidgetDataLine, WidgetDataCharts]) => {
  let colorCode = null;

  arr.some((data) => {
    colorCode = data?.colorSchema?.colorCode;
    return !!colorCode;
  });

  return colorCode;
};
