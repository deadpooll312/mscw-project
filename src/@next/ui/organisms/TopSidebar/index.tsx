import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styles';
import { useLocation } from 'react-router';

import { getDashboardInitialFilters } from 'app/store/modules/dashboard/actions';
import ObjectsWidget from '@next/ui/organisms/ObjectsWidget';
import ChangeTheme from '@next/ui/organisms/ChangeTheme';
import PickSeason from '@next/ui/organisms/TopSidebar/PickSeason';
import PickViolations from '@next/ui/organisms/TopSidebar/PickViolations';
import FlexContainer from '@next/ui/atoms/FlexContainer';
import CurrentDateTime from '@next/ui/organisms/TopSidebar/CurrentDateTime';
import NavLinks from '@next/ui/organisms/TopSidebar/NavLinks';
import SourcesFilter from '@next/ui/organisms/TopSidebar/SourcesFilter';
import ActiveFilterList from '@next/ui/organisms/TopSidebar/ActiveFilterList';

import ThemeWhiteBlock from '@next/ui/atoms/ThemeWhiteBlock';
import { SIDEBAR_TABS } from '@next/ui/organisms/TopSidebar/constants';
import { TabId } from 'app/types';
import ComponentChangeUsePeriod from '@next/ui/organisms/TopSidebar/ChangeUsePeriod';
import MapPageTopRight from '@next/routes/MapPage/TopRight';
import SearchComponent from '@next/ui/organisms/TopSidebar/SearchComponent';
import { selectModuleSidebarViolationTypeIsSys, selectModuleSidebarSearchButtonTrashContainerFilter } from 'app/store/modules/sidebar/selectors';
import WssStream from '@next/ui/organisms/TopSidebar/WssStream';
import ContainerWidget from '@next/ui/organisms/ContainerWidget';
import { selectShowCars } from 'app/store/modules/app/selectors';

const simpleTopSidebarMode = [
  SIDEBAR_TABS[TabId.REPORT].path
];

const TopSidebar = React.memo(() => {
  const dispatch = useDispatch();
  const dashboardLocation = useLocation();
  const violationTypeIsSys = useSelector(selectModuleSidebarViolationTypeIsSys);
  const showCars = useSelector(selectShowCars);
  const trashContainerStatusData = useSelector(selectModuleSidebarSearchButtonTrashContainerFilter);

  React.useEffect(() => {
    dispatch(
      getDashboardInitialFilters()
    );
  }, []);

  const isReportPage = simpleTopSidebarMode.some((path) => dashboardLocation.pathname.includes(path));

  return (
    <ThemeWhiteBlock>
      <WssStream />

      <StyledTopSidebar>
        <FlexContainerRow justifyContent="space-between">
          <BlockContainer flex isHidden={isReportPage}>
            <PickSeason isDisabled={showCars || trashContainerStatusData.isActive} />
            <PickViolations isDisabled={showCars || trashContainerStatusData.isActive} />
          </BlockContainer>
          <BlockContainer flex isHidden={isReportPage}>
            <ComponentChangeUsePeriod isHidden={violationTypeIsSys} isDisabled={showCars} />
            <CurrentDateTime isDisabled={showCars} />
          </BlockContainer>
          <ChangeTheme />
          <NavLinks />
          <MapPageTopRight />
        </FlexContainerRow>
        {
          !isReportPage && (
            <SourcesFilter isDisabled={showCars || trashContainerStatusData.isActive} />
          )
        }
        {
          !isReportPage && (
            <BlockContainer fullWidth flex justifyContent="space-between">
              <ObjectsWidget isDisabled={showCars || trashContainerStatusData.isActive} />
              <ContainerWidget isDisabled={showCars} />
            </BlockContainer>

          )
        }
        {
          !isReportPage && (
            <ActiveFilterList isDisabled={showCars} />
          )
        }
        <SearchComponent isDisabled={showCars} />
      </StyledTopSidebar>
    </ThemeWhiteBlock>
  );
});

export default TopSidebar;

const FlexContainerRow = styled(FlexContainer)`
  align-items: center;
`;

const BlockContainer = styled.div<{flex?: boolean; isHidden?: boolean; fullWidth?: boolean; justifyContent?: string }>`
  white-space: nowrap;
  ${({ fullWidth }) => fullWidth && css`width: 100%;`};
  ${({ justifyContent }) => justifyContent && css`justify-content: ${justifyContent}`};

  ${({isHidden}) => isHidden && css`visibility: hidden;`}

  ${({flex}) => flex && css`
    display: flex;
    align-items: center;

    @media (min-width: 1005px) and (max-width: 1240px)  {
      padding-left: 0;
    }
  `}

  >* {
    padding: 0 10px;

    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
    }
    &:nth-child(n+2) {
      border-left: 1px solid ${(props) => props.theme.colors.dashboardCard.boxShadow };
    }
  }
`;

const StyledTopSidebar = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;

  box-shadow: 0px 5px 5px 0px ${({ theme }) => theme.colors.dashboardCard.boxShadow};
  padding: 0 30px;
  border-bottom: 1px solid ${(props) => props.theme.colors.dashboardCard.boxShadow };
  font-family: Circe-Bold;

  >* {
    padding: 5px 10px;
    border-bottom: 1px solid ${(props) => props.theme.colors.dashboardCard.boxShadow };
    flex-wrap: wrap;
    &:last-child {
      border-bottom: initial;
    }
  }
`;

// const DummyBlock = styled.div`
//   width: 0.4%;
// `;
