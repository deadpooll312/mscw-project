import * as React from 'react';
import styled from 'styles';
import { useSelector } from 'react-redux';

import EventsWidget from '@next/ui/organisms/EventsWidget';
import SourcesWidget from '@next/ui/organisms/SourcesWidget';
import DefectsWidget from '@next/ui/organisms/DefectsWidget';

import DashleatWidget from '@next/ui/organisms/DashleatWidget';
import { selectModuleSidebarViolationTypeIsSys } from 'app/store/modules/sidebar/selectors';

const Container = styled.div`
  flex: 1 1 100%;
`;

const DashboardPageContainer: React.FC = React.memo(
  () => {
    const violationTypeIsSys = useSelector(selectModuleSidebarViolationTypeIsSys);

    return (
      <Container>
        {
          !violationTypeIsSys && (
            <EventsWidget />
          )
        }
        {
          !violationTypeIsSys && (
            <SourcesWidget />
          )
        }
        <DefectsWidget />
        <DashleatWidget />
      </Container>
    );
  },
);

export default DashboardPageContainer;
