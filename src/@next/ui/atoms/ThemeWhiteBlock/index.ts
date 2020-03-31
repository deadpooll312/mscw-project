import styled from 'styles';

const ThemeWhiteBlock = styled.div`
  &&& {
    background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};
    color: ${({ theme }) => theme.colors.dashboardCard.defaultText};

    transition: background-color 0.5s, color 0.5s;
  }
`;

export default ThemeWhiteBlock;