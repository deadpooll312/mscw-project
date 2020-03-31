import { AdvancedTableColumn } from 'components/HelpInfo/widgets/types';
import { ReportStore } from 'app/store/modules/report/types';

export type RegionInfo = {
    name: string;
    snowDepth: number;
    daysAfterSnowfall: number;
    checkedObject: number;
    violation: number;
    criticalViolation: number;
    percent: number;
    winterViolation: number;
    allViolation: number;
    winterCriticalViolation: number;
    allCriticalViolation: number;
};

export type DetailTableProps = {
    lastDayDate?: string;
    currentDayDate?: string;
    columns: AdvancedTableColumn[];
    dataSource: any[];
    renderHeader(): React.ReactNode;
};

export type DetailTableLegendProps = {
  legend: ReportStore['data']['colorSchema']['legend'];
};

export type WeatherStateTableProps = {
    tableColumns: AdvancedTableColumn[];
    dataSource: any;
};