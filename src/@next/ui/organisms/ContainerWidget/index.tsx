import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { SidebarButton } from '@next/ui/atoms/SidebarButton';
import { SeasonContainer } from '@next/ui/organisms/TopSidebar/PickSeason';
import { selectModuleSidebarSearchButtonTrashContainerFilter, selectInitialFilters } from 'app/store/modules/sidebar/selectors';
import { changeSearchFilter, changeSelectedObjects } from 'app/store/modules/sidebar/actions';
import { changeViolationType } from 'app/store/modules/sidebar/actions';
import { AnalyticsViolationTypes } from 'app/store/modules/@types';
import { selectDashboardObjectWidget } from 'app/store/modules/dashboard/selectors';
import { WidgetElement } from 'app/swagger/model/widgetElement';
import { renderObjectTiltle } from '@next/ui/organisms/ObjectsWidget';
import { changeLastTouchFilter } from 'app/store/modules/dashboard/actions';
import usePrevious from '@next/hooks/usePrevious';

type Props = {
  isDisabled: boolean;
};

const containerButtonMargin = '2.5px 0px 5px 2.5px';

const ContainerWidget: React.FC<Props> = React.memo(
  (props) => {
    const dispatch = useDispatch();
    const trashContainerStatusData = useSelector(selectModuleSidebarSearchButtonTrashContainerFilter);
    const initialFilters = useSelector(selectInitialFilters);
    const objectsData = useSelector(selectDashboardObjectWidget);

    const data = React.useMemo(
      (): WidgetElement => {
        const localData = objectsData?.find(({ type }) => type === 'dt');

        return {
          description: 'Контейнеры',
          value: trashContainerStatusData.isActive ? localData?.value : null,
        };
      },
      [objectsData, trashContainerStatusData],
    );

    const handleClick = React.useCallback(
      (event) => {
        const valueNew = !trashContainerStatusData?.value;

        dispatch(
          changeSearchFilter([{
            ...trashContainerStatusData,
            isActive: valueNew,
            value: valueNew,
          }]),
        );
      },
      [trashContainerStatusData, initialFilters],
    );

    const trashContainerStatusDataPrev = usePrevious(trashContainerStatusData);
    React.useEffect(
      () => {
        if (trashContainerStatusDataPrev && trashContainerStatusData !== trashContainerStatusDataPrev) {
          if (trashContainerStatusData.isActive) {
            dispatch(
              changeViolationType(AnalyticsViolationTypes.SYS),
            );
            dispatch(changeSelectedObjects(initialFilters.objects.filter(({ type }) => type === 'dt')));
            dispatch(
              changeLastTouchFilter('objects')
            );
          } else {
            dispatch(changeSelectedObjects([]));
            dispatch(
              changeLastTouchFilter('objects')
            );
          }
        }
      },
      [trashContainerStatusData],
    );

    return (
      <SeasonContainer>
        <SidebarButton
          title={renderObjectTiltle(data, true, false)}
          value="TRASH_CONTAINERS"
          onClick={handleClick}
          isActive={trashContainerStatusData?.isActive}
          disabled={props.isDisabled}
          margin={containerButtonMargin}
        />
      </SeasonContainer>
    );
  },
);

export default ContainerWidget;
