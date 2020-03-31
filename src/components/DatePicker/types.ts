import { MomentInput } from 'moment';

export type DateComponentProps = {
  dateFormat: string;
  date: MomentInput;
  startDate?: MomentInput;
  showTime?: boolean;
  showDate?: boolean;
  onDateChange(value: MomentInput, isNow?: boolean): any;
  onDateRngeChange?: (startDate: MomentInput, endData: MomentInput, isNow?: boolean) => boolean;
  onTimeChange(value: MomentInput): any;

  notUseNowButton?: boolean;

  rangePicker?: boolean;
  isDisabled: boolean;
};
