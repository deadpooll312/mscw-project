import styled from 'styled-components';

export const Table = styled.table`
  font-family: 'Circe-Regular';
  border-collapse: separate;
  border-spacing: 0;
  thead {
    font-family: 'Circe-Bold';
  }
  tr {
    &:last-child {
      td, th {
        border-right: dashed 1px gray;
        border-bottom: dashed 1px gray;
      }
    }
  }
  td, th {
    padding: 5px;
    border-left: dashed 1px gray;
    border-top: dashed 1px gray;
  }
  tr > th, tr > td {
    &:last-child {
      border-right: dashed 1px gray;
    }
  }

  th {
    text-align: center;
  }
`;

export const ColorTr= styled.tr`
  background-color: ${({ theme }) => theme.colors.dashboardCard.tableMatrixBackground} !important;
  transition: background-color 0.5s;
`;

export const BoldTd= styled.td`
  font-family: 'Circe-Bold';
`;
