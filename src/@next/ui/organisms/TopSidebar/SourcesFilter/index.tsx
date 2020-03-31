import * as React from 'react';
import keyBy from 'lodash-es/keyBy';
import { useSelector, useDispatch } from 'react-redux';

import { selectInitialFiltersStateIsLoading, selectDashboardSourceWidget } from 'app/store/modules/dashboard/selectors';
import { selectModuleSidebarSources, selectModuleSidebarViolationTypeIsSys } from 'app/store/modules/sidebar/selectors';
import Loading from '@next/ui/atoms/Loading';
import { SidebarButton } from '@next/ui/atoms/SidebarButton';
import { WidgetElement } from 'app/swagger/model/widgetElement';
import { FILTER_ACTION } from 'app/types';
import { changeSelectedSources } from 'app/store/modules/sidebar/actions';
import { checkFieldInObject } from 'utils';
import { SeasonContainer } from '@next/ui/organisms/TopSidebar/PickSeason';
import { changeLastTouchFilter } from 'app/store/modules/dashboard/actions';
import { isNullOrUndefined } from 'util';

const renderTiltle = (element: WidgetElement, violationTypeIsSys: boolean) => {
  return (
    <React.Fragment>
      <span>
        {element.description}
      </span>
      &nbsp;&nbsp;&nbsp;
      <span>
        {element.value}
      </span>
      &nbsp;&nbsp;&nbsp;
      {
        Boolean(!violationTypeIsSys && !isNullOrUndefined(element.percent))
          ? `(${element.percent} %)`
          : null
      }
    </React.Fragment>
  );
};

type Props = {
  isDisabled: boolean;
};

const SourcesFilter: React.FC<Props> = React.memo(
  (props) => {
    const dispatch = useDispatch();
    const sourcesData = useSelector(selectDashboardSourceWidget);
    const isLoading = useSelector(selectInitialFiltersStateIsLoading);
    const currentFilter = useSelector(selectModuleSidebarSources);
    const violationTypeIsSys = useSelector(selectModuleSidebarViolationTypeIsSys);

    const [selectedSource, setSelectedSource] = React.useState<{type: string; action: FILTER_ACTION}>(null);

    const currentFilterKeys = React.useMemo(() => keyBy(currentFilter, 'type'), [currentFilter]);

    React.useEffect(() => {
      if (selectedSource && sourcesData){
        const object = sourcesData.find(item => item.type === selectedSource.type);
        let newObjects = currentFilter.slice();
        if (selectedSource.action === FILTER_ACTION.ADD) {
          if (!currentFilter.find(item => item.type === selectedSource.type)) {
            newObjects.push({
              type: object.type,
              description: object.description,
            });

          }
        } else {
          newObjects = newObjects.filter(item => item.type !== selectedSource.type);
        }
        dispatch(changeSelectedSources(newObjects));
        dispatch(
          changeLastTouchFilter('sources')
        );
      }
      return () => {
        setSelectedSource(null);
      };
    }, [selectedSource, sourcesData, currentFilter]);

    const onClickAdd = React.useCallback((event) => {
      const type = (event.target as HTMLButtonElement).value;
      setSelectedSource({ type, action: FILTER_ACTION.ADD});
    }, []);

    const onClickDelete = React.useCallback((event) => {
      const type = (event.target as HTMLButtonElement).value;
      setSelectedSource({ type, action: FILTER_ACTION.DELETE });
    }, []);

    return (
      <SeasonContainer>
        <span><b>Источники</b></span>
        {
          isLoading
            ? <Loading type="new_spinner" loadingWidth="20px"/>
            : (
                  sourcesData?.map((item)=>
                    <SidebarButton
                      title={renderTiltle(item, violationTypeIsSys)}
                      value={item.type}
                      key={item.type}
                      onClick={!checkFieldInObject<WidgetElement>(currentFilterKeys, item.type) ? onClickAdd : onClickDelete}
                      isActive={checkFieldInObject<WidgetElement>(currentFilterKeys, item.type)}
                      disabled={violationTypeIsSys || props.isDisabled}
                    />
                  )
            )
        }
      </SeasonContainer>
    );
  });

export default SourcesFilter;
