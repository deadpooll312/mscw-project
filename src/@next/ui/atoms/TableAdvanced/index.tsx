import styled, { css } from 'styled-components';

type PropsToStyledAdvancedTable = {
  tableWidth?: number;
  bodyHeight?: number;
  columnWidth?: number;
  columnHeight?: number;
  opened?: boolean;
  visibleRowsCount?: number;

  stripped?: 'even' | 'odd';
};

const TableAdvanced = styled.table<PropsToStyledAdvancedTable>`
  background-color: ${({ theme }) => theme.colors.dashboardCard.cardBackground};
  text-align: center;
  margin-bottom: 10px;
  width: ${({ tableWidth }) => tableWidth ? `${tableWidth}px` : 'auto'};

  tbody {
    position: fixed;
    margin-top: 42px;
    width: ${({ tableWidth }) => tableWidth ? `${tableWidth}px` : 'auto'};
    height: ${({ bodyHeight }) => bodyHeight ? `${bodyHeight}px` : 'auto'};;
    overflow: auto;
    td {
      width: ${({ columnWidth }) => columnWidth ? `${columnWidth}px` : 'auto'};
      height: ${({ columnHeight }) => columnHeight ? `${columnHeight - 30}px` : 'auto'};
    }
  }
  
  tbody tr {
    display: ${({ opened, visibleRowsCount }) => !visibleRowsCount || opened ? 'table-row' : 'none'}; 
  }   

  ${({ stripped }) => stripped ? css`
    tr:nth-child(${stripped}){
      background-color: rgba(43,85,230,0.1);
    }
  ` : null}

  ${({ visibleRowsCount }) => visibleRowsCount ? css`
    && tbody tr:nth-child(-n+${visibleRowsCount}) {
      display: table-row;
    }
  `: ``}

  th, td {
    border-right: 1px dashed grey;
  }

  th:last-child, td:last-child {
    border-right: none;
  }
  thead {
    background-color: rgba(43,85,230,0.1);
    position: fixed;
    width: ${({ tableWidth, opened }) =>  tableWidth ? `${opened ? tableWidth - 15 : tableWidth}px` : 'auto'};
  }
  th{
    /* padding: 4px; */
    text-align: inherit;
    /* display: inline-block; */
    width: ${({ columnWidth }) =>  columnWidth ? `${columnWidth}px` : 'auto'};
    padding: 0;
    height: 41px;
  }

  td {
    /* padding: 4px; */
    width: ${({ columnWidth }) => columnWidth ? `${columnWidth - 30}px` : 'auto'};
  }
`;

export default TableAdvanced;
