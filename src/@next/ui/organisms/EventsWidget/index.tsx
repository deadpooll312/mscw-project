import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styles';
import { DataItem } from '@amcharts/amcharts4/core';

import EventsDraggingPie from '@next/ui/molecules/EventsDraggingPie';
import { WidgetLegend } from '@next/ui/molecules/WidgetLegend';
import { selectDashboardEventWidget, selectDashboardRegionWidget, selectEventsWidgetStateIsLoading, selectDistrictsWidget } from 'app/store/modules/dashboard/selectors';
import { StyledDefectsWidgetTitle } from '@next/ui/organisms/DefectsWidget';
import { zeroValuesFilter } from '@next/utils/common';
import Loading from '@next/ui/atoms/Loading';
import { FILTER_ACTION } from 'app/types';
import { WidgetElement } from 'app/swagger/model/widgetElement';
import { selectModuleSidebarEvents, selectModuleSidebarRegions, selectModuleSidebarDistricts } from 'app/store/modules/sidebar/selectors';
import { changeSelectedEvents, changeSelectedRegions, changeSelectedDistricts } from 'app/store/modules/sidebar/actions';
import FlexContainer from '@next/ui/atoms/FlexContainer';
import { ContainerWidgetCard } from '@next/routes/ViolationsTablePage';
import ThemeDashboardCardBlock from '@next/ui/atoms/ThemeDashboardCardBlock';
import { getTitleObjectByCount, capitalize } from '@next/utils/names';
import { changeLastTouchFilter } from 'app/store/modules/dashboard/actions';
import { useStyledTheme } from 'styles/themes/hooks';
import RegionsXYChart from '@next/ui/molecules/RegionsXYChart';
import { AdvancedWidgetElement } from 'app/store/modules/dashboard/types';

// const decreaseItemsBy100 = (items: AdvancedWidgetElement[]) => items?.map(item => ({...item, checkedObjectCount: item.checkedObjectCount / 100, checkedObjectCountTrue: item.checkedObjectCount }));

const getCountObjects = (objects: AdvancedWidgetElement[]) => {
  let result =  { allObjectCount: 0, allChecksCount: 0, allViolationCount: 0};
  if (objects) {
    result = objects?.reduce((sum, item) =>
      (
        {
          allChecksCount: sum.allChecksCount + (item?.checkedObjectCount ?? 0),
          allObjectCount: sum.allObjectCount + (item?.objectCount ?? 0),
          allViolationCount: sum.allViolationCount + item.violationObjectCount
        }
      ), {allChecksCount: 0, allObjectCount: 0, allViolationCount: 0});
  }

  return result;
};

const EventsWidget: React.FC = React.memo(
  () => {
    const dispatch = useDispatch();
    const themeData = useStyledTheme();

    const data = useSelector(selectDashboardEventWidget);
    const regionChartData = useSelector(selectDashboardRegionWidget);
    const disctrictsChartData = useSelector(selectDistrictsWidget);
    const currentEvents = useSelector(selectModuleSidebarEvents);
    const isLoading = useSelector(selectEventsWidgetStateIsLoading);
    const currentRegions = useSelector(selectModuleSidebarRegions);
    const currentDistricts = useSelector(selectModuleSidebarDistricts);

    const chartData = React.useMemo(() => zeroValuesFilter(data), [data]);

    const [activeEvent, setActiveEvent] = React.useState<Partial<WidgetElement> & {action: FILTER_ACTION}>(null);

    const isDistrictMode = React.useMemo(()=> Boolean(currentRegions.length), [currentRegions]);

    const columnChartData = React.useMemo(
      () => {
        return currentRegions.length ? disctrictsChartData : regionChartData;
      },
      [regionChartData, disctrictsChartData, currentRegions]);

    const objectsCount = React.useMemo(
      () => getCountObjects(columnChartData), [columnChartData]);

    React.useEffect(() => {
      if (activeEvent) {
        dispatch(
          changeLastTouchFilter('events')
        );
        if (activeEvent.action === FILTER_ACTION.ADD) {
          const newEvents = currentEvents.slice();
          newEvents.push({
            type: activeEvent.type,
            description: activeEvent.description,
          });
          dispatch(changeSelectedEvents(newEvents));
        } else {
          const newEvents = currentEvents.filter(item =>
            item.type !== activeEvent.type && item.description !== activeEvent.description);
          dispatch(changeSelectedEvents(newEvents));
        }
        setActiveEvent(null);

      }
    }, [activeEvent, currentEvents]);

    const onFilterChange = React.useCallback((dataItem: DataItem, action: FILTER_ACTION) => {
      //  таймаут. обновить данные после завершения анимации в чарте 400с
      setTimeout(() => {
        const context: WidgetElement = dataItem.dataContext;
        setActiveEvent({
          ...context,
          action
        });
      }, 450);
    }, []);

    const onRegionsClick = React.useCallback((event: {target: WidgetElement}) => {
      dispatch(changeSelectedRegions([event.target]));
    }, [isDistrictMode]);

    const onDistrictsClick = React.useCallback((event: {target: WidgetElement}) => {
      dispatch(changeSelectedDistricts([event.target]));
    }, [isDistrictMode]);

    const isUAO = React.useMemo(
      () => Boolean(currentRegions?.find(item => item.description === 'ЮАО')), [currentRegions]);

    const onColumnClick = React.useMemo(
      () => isDistrictMode ? onDistrictsClick : onRegionsClick, [isDistrictMode, onDistrictsClick, onRegionsClick]
    );

    return (
      <EventsBlock>
        <ThemeDashboardCardBlock>
          <FlexContainer justifyContent="space-between">
            <StyledDefectsWidgetTitle>Состояние городских объектов и территорий</StyledDefectsWidgetTitle>
          </FlexContainer>
        </ThemeDashboardCardBlock>
        {
          isLoading
            ? <Loading type="new_spinner" />
            : (
              <RelativeBlock>
                <EventsPie>
                  <ActiveFilterTitle>
                    <span>Активные фильтры</span>
                  </ActiveFilterTitle>
                  <EventsDraggingPie
                    data={chartData}
                    currentFilter={currentEvents}
                    onFilterChange={onFilterChange}
                    backgroundColor={themeData.colors.dashboardCard.cardBackground}
                  />
                  {
                    Boolean(data) && (
                      <WidgetLegend
                        height={29}
                        fullData={currentEvents}
                        data={data}
                      />
                    )
                  }
                </EventsPie>
                <EventsLine>
                  <ObjectCountTitleContainer isDistrict={Boolean(currentRegions.length)} isUAO={isUAO}>
                    <ObjectCountTitle align="right">{`${objectsCount.allChecksCount}
                      (${(objectsCount.allChecksCount / (objectsCount.allObjectCount || 1) * 100).toFixed(2)} %)
                      ${capitalize(getTitleObjectByCount(objectsCount.allChecksCount))} проверено ?`}
                    </ObjectCountTitle>
                    <div />
                    <ObjectCountTitle align="left" isUAO={isUAO}>{`${objectsCount.allViolationCount}
                      (${(objectsCount.allViolationCount / (objectsCount.allChecksCount || 1) * 100).toFixed(2)} %)
                      ${capitalize(getTitleObjectByCount(objectsCount.allViolationCount))} с нарушениями ?`}
                    </ObjectCountTitle>
                  </ObjectCountTitleContainer>
                  <RegionsXYChart
                    chartData={columnChartData}
                    cursorEnabled
                    isRegion={Boolean(currentRegions.length)}
                    selectedType={currentDistricts.length ? currentDistricts[0].type : null}
                    onColumnClick={onColumnClick}
                    key={isDistrictMode.toString()}
                    backgroundColor={themeData.colors.dashboardCard.cardBackground}
                  />
                </EventsLine>
              </RelativeBlock>
            )
        }
      </EventsBlock>
    );
  },
);

export default EventsWidget;

const RelativeBlock = styled(ThemeDashboardCardBlock)`
  position: relative;
  height: 90%;
`;

const EventsBlock = styled(ContainerWidgetCard)`
  position: relative;
  height: 520px;

  width: 95%;
  margin: 0 auto;
  padding: 20px 10px;
  margin-top: 20px;
`;

const EventsPie = styled.div`
  display: inline-block;
  height: 80%;
  width: 50%;
`;

const EventsLine = styled.div`
  position: relative;
  left: -30px;
  display: inline-block;
  vertical-align: top;
  height: 100%;
  width: 50%;
`;

export const ActiveFilterTitle = styled.div`
  display: flex;
  justify-content: flex-end;

  & > span {
    width: 50%;
    text-align: center;
  }
`;

const ObjectCountTitle = styled.span<{align: string; isUAO?: boolean}>`
  text-align: ${({align}) => align};

  ${({isUAO}) => isUAO && css`
    margin-left: 15px;
  `};
`;

const ObjectCountTitleContainer = styled.div<{isDistrict: boolean; isUAO?: boolean}>`
  display: flex;
  font-weight: bold;

  & > div {
    width: ${({isDistrict, isUAO}) => {
    if(isDistrict) {
      return isUAO ? '196px' : '165px';
    }
    return '58px';
  }};
  }

  & ${ObjectCountTitle}:last-child {
    width: ${({isDistrict}) => isDistrict ? '50%' : '45%'};
  }

  & ${ObjectCountTitle} {
    width: ${({isDistrict, isUAO}) => {
    if(isDistrict) {
      return isUAO ? '49%' : '46%';
    }
    return '45%';
  }};
  }
`;
