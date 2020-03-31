import styled from 'styled-components';

export const SimpleText = styled.div`
  font-size: 1.5em;
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText};
`;