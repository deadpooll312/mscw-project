import * as React from 'react';
import { get } from 'lodash';
import styled from 'styled-components';
import { AdvancedTableProps, AdvancedTableColumn } from './types';
import TableAdvanced from '@next/ui/atoms/TableAdvanced';

const renderSimpleHead = (columns: AdvancedTableColumn[]) => {
  return (
    <tr>
      {
        columns.map((column: AdvancedTableColumn) => <th key={column.key}>{column.title}</th>)
      }
    </tr>
  );
};

const AdvancedTableContainer: React.FC<AdvancedTableProps> = (props) => {
  const { 
    dataSource, 
    columns, 
    visibleRowsCount, 
    renderHeader,
    maxContainerHeight,
    bodyHeight,
    columnHeight,
    columnWidth,
    tableWidth,
    stripped,
  } = props;
  const [showAll, setShowAll] = React.useState(false);

  const changeShow = () => setShowAll(!showAll);

  const renderShowAll = React.useMemo(() => {
    return visibleRowsCount && dataSource && dataSource.length > 5 ? (
      <StyledSpan onClick={changeShow}>{showAll ? 'Скрыть' : 'Показать все'} </StyledSpan>
    ) : null;
  }, [dataSource, showAll]);

  return (
    <StyledAdvancedTableContainer maxContainerHeight={maxContainerHeight}>
      <TableAdvanced
        bodyHeight={bodyHeight}
        columnHeight={columnHeight}
        columnWidth={columnWidth}
        tableWidth={tableWidth}
        stripped={stripped}
        {...(visibleRowsCount ? {opened : showAll, visibleRowsCount} : null)}
      > 
        <thead>
          { renderHeader ? renderHeader() : renderSimpleHead(columns) }
        </thead>
        <tbody className="selected">
          {
            dataSource?.map((item) => (
              <tr key={item.name}>
                {
                  columns.map((column: AdvancedTableColumn, index: number) => (
                    <td key={`${column.key}_${index}`}>{column.renderCell ? column.renderCell(get(item, column.dataIndex), item) : get(item, column.dataIndex)}</td>
                  )
                  )
                }
              </tr>
            ))
          }
        </tbody>
      </TableAdvanced>
      { renderShowAll }
      
    </StyledAdvancedTableContainer>
  );
};

export const StyledAdvancedTableContainer = styled.div<{ maxContainerHeight?: number }>`
  max-height: ${({ maxContainerHeight }) => maxContainerHeight ? `${maxContainerHeight}px` : 'auto'};
  overflow: auto;
`;

const StyledSpan = styled.span`
  text-decoration: underline;
  cursor: pointer;
  position: absolute;
  bottom: 20px;

  &:hover {
    color: lightgray;
  }
`;

export default AdvancedTableContainer;
