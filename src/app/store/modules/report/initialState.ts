import { ReportStore } from 'app/store/modules/report/types';
import { getCurrentMomentDate, formateDate } from '@next/utils/dates';

export const initialStateReport: ReportStore = {
  date: formateDate(getCurrentMomentDate()),                             // свой date (без семантика из-за dva)
  isLoading: false,
  data: null,
};
