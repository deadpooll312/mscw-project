import styled from 'styled-components';

const ReportSimpleText = styled.div`
  margin-top: 110px;
  font-size: 1.5em;
  font-family: 'Circe-Regular';
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText};
  text-align: center;
`;

export default ReportSimpleText;
