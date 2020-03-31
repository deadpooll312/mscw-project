import keyBy from 'lodash-es/keyBy';
import mapValues from 'lodash-es/mapValues';

import type { ReduxState } from 'app/store/modules/@types';
import { WIDGET_PAGE_CIRCLE, WIDGET_PAGE_LINES, WIDGET_PAGE_CHARTS } from 'app/store/modules/analytics/constants';
import { createSelector } from 'reselect';
import { prepareTiNao } from 'utils';
import { getPageLegend, getColorCode, getChartObjects } from 'app/store/modules/analytics/utils';

// старые селекторы

export function selectAnalyticsModule(state: ReduxState) {
  return state.analytics;
}

export const selectDate = (state: ReduxState) => {
  return selectAnalyticsModule(state).date;
};

export function selectModuleReportWidgetPageCircleInitial(state: ReduxState) {
  return selectAnalyticsModule(state)[WIDGET_PAGE_CIRCLE];
}
export function selectModuleReportWidgetPageCircle(state: ReduxState) {
  return selectModuleReportWidgetPageCircleInitial(state).data;
}
export function selectModuleReportWidgetPageCircleIsLoading(state: ReduxState) {
  return selectModuleReportWidgetPageCircleInitial(state).isLoading;
}
// для компонента с графиками кольцами
export const selectModuleReportWidgetPageCircleFormated = createSelector(
  selectModuleReportWidgetPageCircle,
  (widgetData) => {
    return widgetData;
  },
);
export function selectModuleReportWidgetPageLinesInitial(state: ReduxState) {
  return selectAnalyticsModule(state)[WIDGET_PAGE_LINES];
}
export function selectModuleReportWidgetPageLines(state: ReduxState) {
  return selectModuleReportWidgetPageLinesInitial(state).data;
}
export function selectModuleReportWidgetPageLinesIsLoading(state: ReduxState) {
  return selectModuleReportWidgetPageLinesInitial(state).isLoading;
}
// для компонента с графиком линиями
export const selectModuleReportWidgetPageLinesFormated = createSelector(
  selectModuleReportWidgetPageLines,
  (widgetData) => {
    return widgetData;
  },
);
export const selectModuleReportWidgetPageLinesChartsFormated = createSelector(
  selectModuleReportWidgetPageLines,
  (widgetData) => {
    const charts = widgetData?.charts || [];

    return prepareTiNao(charts).map((item) => {
      const tooltipPercent = mapValues(keyBy(item.objects, 'name'), 'percent');

      return {
        name: item.name,
        total: item.total,
        percent: item.percent,
        checkedObject: item.checkedObject,
        totalObject: item.totalObject,
        coefficients: item.coefficients,
        tooltipPercent,
        ...mapValues(keyBy(item.objects, 'name'), 'value'),
      };
    });
  },
);

export const selectetModuleReportWidgetColorCode = createSelector(
  selectModuleReportWidgetPageCircle,
  selectModuleReportWidgetPageLines,
  selectModuleReportWidgetPageChart,
  (circleData, lineData, areaData) => {
    return getColorCode(circleData, lineData, areaData);
  }
);

export const selectModuleReportWidgetPageLinesLegendFormated = createSelector(
  selectModuleReportWidgetPageLines,
  selectetModuleReportWidgetColorCode,
  (widgetData, colorCode) => {
    return getPageLegend(colorCode, widgetData);
  },
);

export const selectModuleReportWidgetPageLinesChartsTypesFormated = createSelector(
  selectModuleReportWidgetPageLines,
  (lineData) => {
    return mapValues(keyBy(getChartObjects(lineData?.charts), 'type'), 'name');
  },
);

export function selectModuleReportWidgetPageChartInitial(state: ReduxState) {
  return selectAnalyticsModule(state)[WIDGET_PAGE_CHARTS];
}
export function selectModuleReportWidgetPageChart(state: ReduxState) {
  return selectModuleReportWidgetPageChartInitial(state).data;
}
export const selectModuleReportWidgetPageChartIsLoading = (state: ReduxState) => {
  return selectModuleReportWidgetPageChartInitial(state).isLoading;
};

export const selectSelectedFilters = (state: ReduxState) => {
  return selectAnalyticsModule(state).selectedFilters;
};
export const selectCurrentSeason = (state: ReduxState) => {
  return selectSelectedFilters(state).currentSeason;
};
export const selectCurrentViolationType = (state: ReduxState) => {
  return selectSelectedFilters(state).currentViolationType;
};
export const selecteCurrentTypes = (state: ReduxState) => {
  return selectSelectedFilters(state).currentTypes;
};

export const selecteCurrentSystems = (state: ReduxState) => {
  return selectSelectedFilters(state).currentSystems;
};

// для компонента с графиком графиков)
export const selectModuleReportWidgetPageChartFormated = createSelector(
  selectModuleReportWidgetPageChart,
  (widgetData) => {
    return widgetData;
  },
);
