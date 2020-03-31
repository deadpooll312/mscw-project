import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import keyBy from 'lodash-es/keyBy';

import { selectDashboardObjectWidget, selectInitialFiltersStateIsLoading } from 'app/store/modules/dashboard/selectors';
import { SidebarButton } from '@next/ui/atoms/SidebarButton';
import { WidgetElement } from 'app/swagger/model/widgetElement';
import Loading from '@next/ui/atoms/Loading';
import { isNullOrUndefined } from 'util';
import { changeSelectedObjects, changeSearchFilter } from 'app/store/modules/sidebar/actions';
import { selectModuleSidebarObjects, selectModuleSidebarViolationTypeIsSys, selectModuleSidebarSearchButtonTrashContainerFilter } from 'app/store/modules/sidebar/selectors';
import { FILTER_ACTION } from 'app/types';
import { checkFieldInObject } from 'utils';
import { SeasonContainer } from '@next/ui/organisms/TopSidebar/PickSeason';
import { changeLastTouchFilter } from 'app/store/modules/dashboard/actions';
import { ButtonTrashContainer } from 'app/store/modules/sidebar/initialState';

export const renderObjectTiltle = (element: WidgetElement, violationTypeIsSys: boolean, nullValue: boolean) => {
  return (
    <React.Fragment>
      <span>
        {element.description}
      </span>
      &nbsp;&nbsp;&nbsp;
      <span>
        {!nullValue ? element.value : 0}
      </span>
      &nbsp;&nbsp;&nbsp;
      {
        Boolean(!nullValue && !violationTypeIsSys && !isNullOrUndefined(element.percent))
          ? `(${element.percent} %)`
          : null
      }
    </React.Fragment>
  );
};

type Props = {
  isDisabled: boolean;
};

const ObjectsWidget: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const currentObjects = useSelector(selectModuleSidebarObjects);
  const objectsData = useSelector(selectDashboardObjectWidget);
  const violationTypeIsSys = useSelector(selectModuleSidebarViolationTypeIsSys);
  const trashContainerStatusData = useSelector(selectModuleSidebarSearchButtonTrashContainerFilter);

  const isLoading = useSelector(selectInitialFiltersStateIsLoading);
  const [selectedType, setSelectedType] = React.useState<{type: string; action: FILTER_ACTION}>(null);

  const currentFilterKeys = React.useMemo(() => keyBy(currentObjects, 'type'), [currentObjects]);

  React.useEffect(() => {
    if (selectedType && objectsData){
      const object = objectsData.find(item => item.type === selectedType.type);
      let newObjects = currentObjects.slice();
      if (selectedType.action === FILTER_ACTION.ADD) {
        if (!currentObjects.find(item => item.type === selectedType.type)) {
          newObjects.push({
            type: object.type,
            description: object.description,
          });

        }
      } else {
        newObjects = newObjects.filter(item => item.type !== selectedType.type);
      }

      dispatch(
        changeSearchFilter([ButtonTrashContainer]),
      );
      dispatch(changeSelectedObjects(newObjects));
      dispatch(
        changeLastTouchFilter('objects')
      );
    }
    return () => {
      setSelectedType(null);
    };
  }, [selectedType, objectsData, currentObjects]);

  const onClickAdd = React.useCallback((event) => {
    const type = (event.target as HTMLButtonElement).value;
    setSelectedType({ type, action: FILTER_ACTION.ADD});
  }, []);

  const onClickDelete = React.useCallback((event) => {
    const type = (event.target as HTMLButtonElement).value;
    setSelectedType({ type, action: FILTER_ACTION.DELETE });
  }, []);

  return (
    <SeasonContainer>
      <span>Объекты</span>
      {
        isLoading
          ? <Loading type="new_spinner" loadingWidth="20px"/>
          : (
                objectsData?.map(
                  (item)=> {
                    return (
                      <SidebarButton
                        title={renderObjectTiltle(item, violationTypeIsSys, trashContainerStatusData.isActive)}
                        value={item.type}
                        key={item.type}
                        onClick={!checkFieldInObject(currentFilterKeys, item.type) ? onClickAdd : onClickDelete}
                        isActive={!trashContainerStatusData.isActive && checkFieldInObject(currentFilterKeys, item.type)}
                        disabled={props.isDisabled}
                      />
                    );
                  },
                )
          )
      }
    </SeasonContainer>
  );
};

export default ObjectsWidget;
