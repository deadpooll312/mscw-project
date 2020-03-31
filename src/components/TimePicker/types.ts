import { Moment } from 'moment';

export type TimePickerProps = {
  time?: Moment;
  onApplyBtnClick(time: Moment): void;
};
