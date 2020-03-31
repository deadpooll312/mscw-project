import * as React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import { SidebarButton } from '@next/ui/atoms/SidebarButton';

import { SIDEBAR_TABS_LEFT_ENTRIES, SIDEBAR_TABS_RIGHT_MAP_ENTRIES } from '@next/ui/organisms/TopSidebar/constants';
import { SeasonContainer } from '@next/ui/organisms/TopSidebar/PickSeason';
import styled from 'styles';

const NavLinks = React.memo(() => {
  const dashboardLocation = useLocation();

  return (
    <SeasonContainer>
      {
        SIDEBAR_TABS_LEFT_ENTRIES.map(
          ([id, value]) => (
            <Link key={id} to={value.path}>
              <SidebarButton
                isActive={dashboardLocation.pathname.includes(value.path)}
                value={value.path}
                title={value.title}
              />
            </Link>
          )
        )
      }
      <WrapFlexContainer>
        {
          SIDEBAR_TABS_RIGHT_MAP_ENTRIES.filter(([id, rowData]) => !rowData.notVisible).map(
            ([id, value]) => (
              <Link key={id} to={value.path}>
                <SidebarButton
                  isActive={dashboardLocation.pathname.includes(value.path)}
                  value={value.path}
                  title={value.title}
                />
              </Link>
            )
          )
        }
      </WrapFlexContainer>
    </SeasonContainer>
  );
});

export default NavLinks;

const WrapFlexContainer = styled.div`
  display: inline-block;
  border-left: 1px solid ${(props) => props.theme.colors.dashboardCard.boxShadow };
`;
