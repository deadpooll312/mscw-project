import * as React from 'react';
import { Tabs } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import ObjectsContainer from 'containers/sidebar/TabContainers/TabMap/LayersSelector/ObjectsComponent';
import { TabTitle, LayerSelectorWrapper } from 'containers/sidebar/TabContainers/TabMap/LayersSelector/styled';
import { TabsProps } from 'antd/lib/tabs';
import { changeSelectedViolationType } from 'app/store/modules/semantics/actions';
import { selectSelectedViolationType } from 'app/store/modules/semantics/selectors';
import { ViolationsTypes } from '@next/ui/atoms/map/types';

const { TabPane } = Tabs;

type Props = {};

const CustomTab: React.FC<{ title: React.ReactNode }> = React.memo(
  (props) => (
    <TabTitle>
      {props.title}
    </TabTitle>
  )
);

const renderTabBar = (props: TabsProps, DefaultTabBar) => <DefaultTabBar {...props} className="customTabBar"/>;

const LayersSelector: React.FC<Props> = React.memo(
  () => {
    const selectedTab = useSelector(selectSelectedViolationType);

    const dispatch = useDispatch();

    const onTabChange = React.useCallback((activeTab: ViolationsTypes) => {
      dispatch(
        changeSelectedViolationType(activeTab),
      );
    }, []);
    
    return(
      <LayerSelectorWrapper>
        <Tabs renderTabBar={renderTabBar} activeKey={selectedTab} onTabClick={onTabChange}>
          <TabPane 
            tab={<CustomTab title={<span>Объекты  <br/> с нарушениями</span>} />} 
            key={ViolationsTypes.violations} 
          >
            <ObjectsContainer />
          </TabPane>
          <TabPane 
            tab={<CustomTab title={<span>Систематические <br/> нарушения</span>} />} 
            key={ViolationsTypes.violationsSys} 
          >
            <ObjectsContainer />
          </TabPane>
        </Tabs>
      </LayerSelectorWrapper>
    );
  },
);

export default LayersSelector;
