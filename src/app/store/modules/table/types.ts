import { ObjectForTable, PageResultObjectForTable } from 'app/api/types';

export type GetDashboardTableDataPayload = {
  paginationData: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
  sortData: { 
    field: keyof ObjectForTable;
    isReverse: boolean ;
  };
};

export type DashboardTableState = {
  data: PageResultObjectForTable;
  isLoading: boolean;
};