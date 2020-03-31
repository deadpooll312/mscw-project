import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Stomp from 'stompjs';

import useDashboardSocket from '@next/ui/organisms/TopSidebar/WssStream/useDashboardSocket';
import { StateMachine, States } from 'app/store/modules/dashboard/types';
import { WidgetFilter } from 'app/swagger/model/widgetFilter';
import { updateDashboardData, updateDashboardStateMachine } from 'app/store/modules/dashboard/actions';
import { selectInitialFilters, selectModuleSidebarRegions, selectModuleSidebarViolationTypeIsSys, selectSecondaryFiltersWithSearch, selectPrimaryFilters } from 'app/store/modules/sidebar/selectors';
import { WidgetDataType } from 'app/types';
import { prepareFilters, preparePrimaryFiltersForSocket } from 'app/store/modules/dashboard/utils';
import { selectLastTouchFilter } from 'app/store/modules/dashboard/selectors';

type Props = {};

const checkType = (str: string) => str.replace(/\_\w/g, (match) => match[1].toUpperCase());

const responseDataTypes = {
  regions: [
    WidgetDataType.SOURCES,
    WidgetDataType.OBJECTS,
    WidgetDataType.EVENTS,
    WidgetDataType.REGIONS,
    WidgetDataType.SOURCE_GROUPS,
    WidgetDataType.DEFECTS,
  ],
  districts: [
    WidgetDataType.SOURCES,
    WidgetDataType.OBJECTS,
    WidgetDataType.EVENTS,
    WidgetDataType.DISTRICTS,
    WidgetDataType.SOURCE_GROUPS,
    WidgetDataType.DEFECTS,
  ],
  sys: [
    WidgetDataType.DEFECTS,
    WidgetDataType.SOURCES,
    WidgetDataType.OBJECTS,
  ]
};

const WssStream: React.FC<Props> = React.memo(
  (props) => {
    const dispatch = useDispatch();

    const primaryFiltersOwn = useSelector(selectPrimaryFilters);
    const secondaryFiltersOwnWithSearch = useSelector(selectSecondaryFiltersWithSearch);

    const initialFilters = useSelector(selectInitialFilters);
    const currentRegions = useSelector(selectModuleSidebarRegions);
    const violationTypeIsSys = useSelector(selectModuleSidebarViolationTypeIsSys);
    const lastTouchedFilter = useSelector(selectLastTouchFilter);

    const isDistrictMode = React.useMemo(()=> Boolean(currentRegions.length), [currentRegions]);

    const handleSubscribe = React.useCallback(
      (data: Stomp.Message) => {
        const response = JSON.parse(data.body);
        const type = (response.type as string).toLowerCase();
        const payloadType = checkType(type);
        let stateMachine: Partial<StateMachine<WidgetFilter>> = {};

        dispatch(updateDashboardData({
          [payloadType]: response.result
        }));

        stateMachine[payloadType] = States.SUCCESS;
        dispatch(updateDashboardStateMachine(stateMachine));
      },
      []
    );

    const {
      isSocketOpen,
      stompClientInstance,
    } = useDashboardSocket(handleSubscribe);

    React.useEffect(() => {
      if (Object.keys(initialFilters).length && isSocketOpen) {
        let subscribeGroups: {responseDataTypes?:  WidgetDataType[]} = {};
        if (violationTypeIsSys) {
          subscribeGroups.responseDataTypes = responseDataTypes.sys;
        } else {
          subscribeGroups.responseDataTypes = isDistrictMode ? responseDataTypes.districts : responseDataTypes.regions;
        }
        const objectToSend = {
          ...subscribeGroups,
          ...preparePrimaryFiltersForSocket(primaryFiltersOwn),
          ...prepareFilters(secondaryFiltersOwnWithSearch)
        };

        stompClientInstance.send('/app/filter', { priority: 9 }, JSON.stringify(objectToSend));

        if (__DEV__) {
          console.info(`API SERVICE SEND WSS`, { objectToSend });
        }

        let stateMachine: Partial<StateMachine<WidgetFilter>> = {};

        subscribeGroups.responseDataTypes.map((item)  => {
          const key = checkType(item.toLowerCase());
          if (lastTouchedFilter && lastTouchedFilter === key || violationTypeIsSys) {
            stateMachine[key] = States.SUCCESS;
          } else {
            stateMachine[key] = States.FETCHING;
          }
        });

        dispatch(updateDashboardStateMachine(stateMachine));
      }
    }, [primaryFiltersOwn, secondaryFiltersOwnWithSearch, initialFilters, stompClientInstance, isSocketOpen]);

    return null;
  },
);

export default WssStream;
