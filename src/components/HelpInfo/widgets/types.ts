import * as React from 'react';

export type AdvancedTableColumn = {
    key: string;
    dataIndex: string;
    title: string | React.ReactNode;
    renderCell?: (text, record) => React.ReactNode;
};

export type AdvancedTableProps = {
    dataSource: any;
    columns: AdvancedTableColumn[];
    bodyHeight?: number;
    maxContainerHeight?: number;
    tableWidth?: number;
    columnWidth?: number;
    columnHeight?: number;
    stripped?: 'even' | 'odd';
    visibleRowsCount?: number;
    renderHeader?: () => React.ReactNode;
};