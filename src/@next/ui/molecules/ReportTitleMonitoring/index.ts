import styled from 'styled-components';

const ReportTitleMonitoring = styled.div`
  font-size: 1.5em;
  font-family: 'Circe-Bold';
  font-weight: bold;
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText};
  width: 100%;
`;

export default ReportTitleMonitoring;
