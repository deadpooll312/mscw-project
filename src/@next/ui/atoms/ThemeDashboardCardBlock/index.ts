import styled from 'styles';

const ThemeDashboardCardBlock = styled.div`
  position: relative;

  &&& {
    background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};
    color: ${({ theme }) => theme.colors.dashboardCard.defaultText};

    tspan {
      fill: ${({ theme }) => theme.colors.dashboardCard.defaultText};
      transition: fill 0.5s;
    }

    transition: background-color 0.5s, color 0.5s;
  }
`;

export default ThemeDashboardCardBlock;