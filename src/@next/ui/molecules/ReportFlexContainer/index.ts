import styled from 'styled-components';

type Props = {
  alignItems?: 'center';
  marginValue?: number | string;
};
const ReportFlexColumnContainer = styled.div<Props>`
  display: flex;
  flex-direction: column;
  height: 100%;
  color: ${({ theme }) => theme.colors.dashboardCard.defaultText};

  align-items: ${({ alignItems }) => alignItems ?? 'initial'};
  margin: ${({ marginValue }) => marginValue ?? '10px 20px'};

  overflow: auto;

  h3, h5 {
    color: ${({ theme }) => theme.colors.dashboardCard.defaultText};
  }
`;

export default ReportFlexColumnContainer;
