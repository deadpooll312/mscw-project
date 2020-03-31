import * as React from 'react';
import isEmpty from 'lodash-es/isEmpty';

import { tableComponents } from '../constants';
import { Pagination } from '../types';
import { StyledTable } from '../styled';

export type TableProps = {
    columns: any[];
    dataSource: any[];
    pagination: Pagination;
    footer?: React.ReactNode;
    onFiltersChange?(fields: string[]): void;
    onPaginationChange(page: number, size: number): void;
};

export const Table = (props: TableProps) => {
  const { columns,  onFiltersChange, onPaginationChange, dataSource, pagination, footer } = props;
  const handleTableChange = (pagination, filters, sorter) => {
    if (!isEmpty(filters)) {
      let fields = [];
      Object.keys(filters).forEach((key) => {
        const item = filters[key][0];
        if (item) {
          fields.push(`${item.key}|${item.value}`);
        }
      });
      if (onFiltersChange) {
        onFiltersChange(fields);
      }
    }
    onPaginationChange(pagination.current - 1, pagination.pageSize);
  };

  return (
    <StyledTable<any>
      size="small"
      rowKey={(record) => record.id}
      rowClassName={() => 'editable-row'}
      bordered
      dataSource={dataSource}
      columns={columns}
      components={tableComponents}
      pagination={{
        showTotal: (total, range) => `${range[0]}-${range[1]} (${total})`,
        current: pagination.page + 1,
        total: pagination.total,
        pageSize: pagination.size,
        pageSizeOptions: ['5', '15', '25', '35'],
        showSizeChanger: true
      }}
      onChange={handleTableChange}
      scroll={{ x: 1300, y: '100%' }}
      footer={footer}
    />
  );
};

