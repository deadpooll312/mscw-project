import styled from 'styled-components';
import { REPORT_RED } from 'styles/variables';

const ReportTitle = styled.div`
  background-color: ${REPORT_RED};
  color: white;
  text-align: center;
  font-size: 2em;
  font-family: 'Circe-Bold';
  border-radius: 1em;
  margin-top: 120px;
  padding: 10px 20px;
`;

export default ReportTitle;
