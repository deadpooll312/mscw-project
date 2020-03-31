import * as React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { SidebarButton, StyledSidebarButton } from '@next/ui/atoms/SidebarButton';
import { changeSelectedEvents, resetToInitialFilters, changeSelectedRegions, changeSelectedDistricts, changeSelectedObjects, changeSelectedSources, changeSearchFilter } from 'app/store/modules/sidebar/actions';
import { selectModuleSidebarEvents, selectModuleSidebarRegions, selectModuleSidebarDistricts, selectModuleSidebarSources, selectModuleSidebarObjects, selectModuleSidebarSearchButtonTrashContainerFilter } from 'app/store/modules/sidebar/selectors';
import { WidgetElement } from 'app/swagger/model/widgetElement';
import { changeLastTouchFilter } from 'app/store/modules/dashboard/actions';
import FlexContainer from '@next/ui/atoms/FlexContainer';
import { ButtonTrashContainer } from 'app/store/modules/sidebar/initialState';

type Props = {
  isDisabled: boolean;
};

const ActiveFilterList: React.FC<Props> = React.memo((props) => {
  const currentObjects = useSelector(selectModuleSidebarObjects);
  const currentSources = useSelector(selectModuleSidebarSources);
  const currentEvents = useSelector(selectModuleSidebarEvents);
  const currentRegions = useSelector(selectModuleSidebarRegions);
  const currentDistricts = useSelector(selectModuleSidebarDistricts);
  const trashContainerStatusData = useSelector(selectModuleSidebarSearchButtonTrashContainerFilter);

  const dispatch = useDispatch();
  const [activeFilters, setActiveFilters] = React.useState<WidgetElement[]>([]);
  const [objectToDelete, setObjectToDelete] = React.useState<WidgetElement>(null);

  React.useEffect(() => {
    const activeFiltersNew = [
      ...currentSources,
      ...currentEvents,
      ...currentRegions,
      ...currentDistricts,
    ];

    if (trashContainerStatusData.isActive) {
      activeFiltersNew.push({
        type: 'trash',
        description: 'Контейнеры',
      });
    } else {
      activeFiltersNew.push(...currentObjects);
    }

    setActiveFilters(activeFiltersNew);
  }, [trashContainerStatusData, currentObjects, currentRegions, currentEvents, currentDistricts, currentSources]);

  React.useEffect(() => {
    if (objectToDelete) {
      const { type, description } = objectToDelete;
      setActiveFilters(prevState => {
        return prevState.filter(item => item.type === type && item.description === description);
      });

      if (type === 'trash') {
        dispatch(
          changeSearchFilter([{
            ...trashContainerStatusData,
            isActive: false,
            value: false,
          }]),
        );
        return;
      }
      if (currentRegions.find(item => item.type === type && item.description === description)) {
        dispatch(changeSelectedDistricts([]));
        dispatch(changeSelectedRegions([]));
        return ;
      }
      if (currentDistricts.find(item => item.type === type && item.description === description)) {
        dispatch(changeSelectedDistricts([]));
        return ;
      }
      if (currentEvents.find(item => item.type === type && item.description === description)) {
        const newObjects = currentEvents.filter(
          item => item.type !== type && item.description !== description
        );
        dispatch(
          changeLastTouchFilter('events')
        );
        dispatch(changeSelectedEvents(newObjects));
      }
      if (currentObjects.find(item => item.type === type && item.description === description)) {
        const newObjects = currentObjects.filter(
          item => item.type !== type && item.description !== description
        );

        dispatch(
          changeSearchFilter([ButtonTrashContainer]),
        );
        dispatch(
          changeLastTouchFilter('objects')
        );
        dispatch(changeSelectedObjects(newObjects));
      }
      if (currentSources.find(item => item.type === type && item.description === description)) {
        const newSources = currentSources.filter(
          item => item.type !== type && item.description !== description
        );
        dispatch(
          changeLastTouchFilter('sources')
        );
        dispatch(changeSelectedSources(newSources));
      }
    }
  }, [objectToDelete]);

  const onDeleteActiveFilter = React.useCallback((event: React.BaseSyntheticEvent<{}, {}, {value: WidgetElement}>) => {
    setObjectToDelete(event.target.value);
  }, []);

  const onClearActiveFilters = React.useCallback(() => {
    dispatch(resetToInitialFilters());
  }, []);

  return (
    <SeasonContainerFilters alignItems="center" flexWrap="wrap">
      <ActiveFiltersTitle>Активные фильтры</ActiveFiltersTitle>
      {
        activeFilters?.map(
          filter =>
            <SidebarButton
              key={`${filter.type}___${filter.description}`}
              title={filter.description}
              value={filter}
              onClick={onDeleteActiveFilter}
              disabled={props.isDisabled}
              isFilterButton
            />
        )
      }
      {
        Boolean(!props.isDisabled && activeFilters.length) && (
          <ClearFilter onClick={onClearActiveFilters}>
            Сбросить фильтры
          </ClearFilter>
        )
      }
    </SeasonContainerFilters>
  );
});

export default ActiveFilterList;

const SeasonContainerFilters = styled(FlexContainer)`
  position: relative;

  min-height: 50px;
  & > span {
    margin-right: 10px;
  }

  ${StyledSidebarButton} {
    margin: 2.5px 5px;
  }
`;

const ActiveFiltersTitle = styled.div`
  display: inline-block;
`;

const ClearFilter = styled.div`
  margin-left: 10px;
  cursor: pointer;
`;
