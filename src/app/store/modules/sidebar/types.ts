import { DashboardDataFilter } from 'app/types';

export type SidebarState = {
  filters: DashboardDataFilter;
  initialFilters: Partial<DashboardDataFilter>;
};
