import * as React from 'react';
import { DataItem } from '@amcharts/amcharts4/core';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styles';
import EventsDraggingPie from '@next/ui/molecules/EventsDraggingPie';
import { WidgetLegend } from '@next/ui/molecules/WidgetLegend';
import SourcesXYChart from '@next/ui/molecules/SourcesXYChart';

import { selectDashboardSourceWidget, selectDashboardSourceGroupWidget, selectSourcesWidgetStateIsLoading } from 'app/store/modules/dashboard/selectors';
import { StyledDefectsWidgetTitle } from '@next/ui/organisms/DefectsWidget';
import { zeroValuesFilter } from '@next/utils/common';
import Loading from '@next/ui/atoms/Loading';
import { FILTER_ACTION } from 'app/types';
import { selectModuleSidebarSources } from 'app/store/modules/sidebar/selectors';
import { WidgetElement } from 'app/swagger/model/widgetElement';
import { changeSelectedSources } from 'app/store/modules/sidebar/actions';
import ThemeDashboardCardBlock from '@next/ui/atoms/ThemeDashboardCardBlock';
import { ContainerWidgetCard } from '@next/routes/ViolationsTablePage';
import { ActiveFilterTitle } from '@next/ui/organisms/EventsWidget';
import { changeLastTouchFilter } from 'app/store/modules/dashboard/actions';
import { useStyledTheme } from 'styles/themes/hooks';

const SourcesWidget: React.FC = React.memo(
  () => {
    const [activeSource, setActiveSource] = React.useState<WidgetElement & { action: FILTER_ACTION }>(null);

    const dispatch = useDispatch();
    const themeData = useStyledTheme();

    const sourcesData = useSelector(selectDashboardSourceWidget);
    const sourceGroupsData = useSelector(selectDashboardSourceGroupWidget);
    const currentFilter = useSelector(selectModuleSidebarSources);
    const isLoading = useSelector(selectSourcesWidgetStateIsLoading);

    const chartData = React.useMemo(() => zeroValuesFilter(sourcesData), [sourcesData]);
    // const isLastTouchingFilterIsCurrent = useSelector((state: ReduxState) => selectLastTouchFilter(state) === 'sources');

    React.useEffect(
      () => {
        if (activeSource) {
          dispatch(
            changeLastTouchFilter('sources')
          );

          if (activeSource.action === FILTER_ACTION.ADD) {
            const newSources = currentFilter.slice();
            newSources.push({
              type: activeSource.type,
              description: activeSource.description,
            });
            dispatch(changeSelectedSources(newSources));
          } else {
            const newSources = currentFilter.filter(item =>
              item.type !== activeSource.type && item.description !== activeSource.description);
            dispatch(changeSelectedSources(newSources));
          }

          setActiveSource(null);
        }
      },
      [activeSource, currentFilter],
    );

    const onFilterChange = React.useCallback(
      (dataItem: DataItem, action: FILTER_ACTION) => {
        //  таймаут. обновить данные после завершения анимации в чарте 400с
        setTimeout(() => {
          const context: WidgetElement = dataItem.dataContext;
          const activeSource = {
            ...context,
            action,
          };
          setActiveSource(activeSource);
        }, 450);
      }, [],
    );

    return (
      <SourcesBlock>
        <StyledDefectsWidgetTitle>Источники и виды контроля</StyledDefectsWidgetTitle>
        {
          isLoading
            ? <Loading type="new_spinner" />
            : (
              <RelativeBlock>
                <SourcesPie>
                  <ActiveFilterTitle>
                    <span>Активные фильтр</span>
                  </ActiveFilterTitle>
                  <EventsDraggingPie
                    data={chartData}
                    currentFilter={currentFilter}
                    onFilterChange={onFilterChange}
                    backgroundColor={themeData.colors.dashboardCard.cardBackground}
                  />
                  {
                    Boolean(sourcesData) && (
                      <WidgetLegend
                        height={37}
                        fullData={currentFilter}
                        data={sourcesData}
                      />
                    )
                  }
                </SourcesPie>

                <SourcesLine>
                  <SourcesXYChart
                    chartData={sourceGroupsData}
                    backgroundColor={themeData.colors.dashboardCard.cardBackground}
                  />
                </SourcesLine>
              </RelativeBlock>
            )
        }
      </SourcesBlock>
    );
  },
);

export default SourcesWidget;

const RelativeBlock = styled(ThemeDashboardCardBlock)`
  position: relative;
  height: 90%;
`;

const SourcesBlock = styled(ContainerWidgetCard)`
  height: 580px;

  width: 95%;
  margin: 0 auto;
  padding: 20px 10px;
  margin-top: 10px;
`;

const SourcesPie = styled.div`
  display: inline-block;
  height: 80%;
  width: 50%;
`;

const SourcesLine = styled.div`
  position: relative;
  /* left: -30px; */
  display: inline-block;
  vertical-align: top;
  height: 100%;
  width: 50%;
`;
