import * as React from 'react';
import TimePicker from 'components/TimePicker';
import { Moment } from 'moment';
import { getCurrentMomentDate, formateDate, setMomentUnit, getFormattedDate } from '@next/utils/dates';

import {
  DateRadioGroup,
  StyledRadioDate,
  StyledIcon,
  StyledDatePicker,
  StyledFormattedDate,
  StyledRangeDatePicker,
} from './styled';
import { DateComponentProps } from './types';
import './style.css';
import CONSTANTS from '@next/constants';

function disabledDate(current) {
  return current && current > getCurrentMomentDate().endOf('day');
}

const rootElement = document.getElementById('root');

const DatePickerComponent: React.FC<DateComponentProps> = (props) => {
  const { dateFormat, date, showDate, showTime, onDateChange } = props;
  const [isOpen, setOpen] = React.useState(false); //непонятно используется или нет
  const ref = React.useRef<HTMLDivElement>();

  const onClickDocument = (e) => {
    setOpen(false);
    rootElement.removeEventListener('click', onClickDocument);
  };

  const onChangeRadioButton = React.useCallback((event) => {
    if (event.target.value === 'currentMoment') {
      setOpen(false);
      onDateChange(getCurrentMomentDate().local(), true);
    } else {
      (ref.current?.querySelector('.ant-calendar-picker-input') as HTMLElement)?.click();
      setOpen(true);
      rootElement.removeEventListener('click', onClickDocument);
      rootElement.addEventListener('click', onClickDocument);
    }
  }, [ref, onClickDocument]);

  const showCalendar = React.useCallback(() => {
      (ref.current?.querySelector('.ant-calendar-picker-input') as HTMLElement)?.click();
      setOpen(true);
      rootElement.removeEventListener('click', onClickDocument);
      rootElement.addEventListener('click', onClickDocument);
  }, [ref, onClickDocument]);

  const onTimeChange = React.useCallback((time: Moment) => {
    if (time) {
      let newDate = date ? date : formateDate(getCurrentMomentDate());
      newDate = setMomentUnit(newDate, 'hour', time.get('hour'));
      newDate = setMomentUnit(newDate, 'minute', time.get('minute'));
      newDate = setMomentUnit(newDate, 'seconds', 0);

      props.onTimeChange(newDate);
      setOpen(false);
      (ref.current?.querySelector('.ant-calendar-picker-input') as HTMLElement)?.click();
    }
  }, [ref, props.onTimeChange, date]);

  const handleChange = React.useCallback((value: Moment) => {
    if (value) {
      value.seconds(CONSTANTS.TIME.ZERO_SECOND);
      onDateChange(value.local());
    }
    setOpen(!!showTime);
  }, [onDateChange, showTime]);

  const handleChangeRange = React.useCallback(
    (value: [Moment, Moment]) => {
      let [startDate, endDate] = value;

      if (startDate) {
        startDate.seconds(CONSTANTS.TIME.ZERO_SECOND);
        startDate = startDate.local();
      }
      if (endDate) {
        endDate.seconds(CONSTANTS.TIME.ZERO_SECOND);
        endDate = endDate.local();
      }
      if (props.onDateRngeChange(startDate, endDate)) {
        setOpen(false);
      }
    },
    [props.onDateRngeChange],
  );

  const renderExtraFooter = React.useMemo(
    () => {
      if (showTime){
        return () => <TimePicker time={getCurrentMomentDate(date)} onApplyBtnClick={onTimeChange} key={getFormattedDate(date)}/>;
      }
    },
    [date, onTimeChange, showTime]
  );

  const defaultValue = React.useMemo(
    () => {
      return props.notUseNowButton ? 'calendar' : 'currentMoment';
    },
    [],
  );

  return (
    <DateRadioGroup defaultValue={defaultValue} onChange={onChangeRadioButton}>
      {
        !props.notUseNowButton && (
          <StyledRadioDate value="currentMoment">Сейчас</StyledRadioDate>
        )
      }
      <StyledRadioDate
        value="date"
        onClick={showCalendar}
        id="calendar"
        disabled={props.isDisabled}

        blockWidth={props.notUseNowButton && 100}
      >
        <StyledIcon type="calendar" />
        {
          showDate && (
            date
              ? <StyledFormattedDate>{formateDate(getCurrentMomentDate(date), dateFormat, { local: true })} </StyledFormattedDate>
              : <StyledFormattedDate>Искомая дата</StyledFormattedDate>
          )
        }
        <div ref={ref}>
          {
            !props.rangePicker
              ? (
                <StyledDatePicker
                  open={isOpen}
                  placeholder="Искомая дата"
                  dropdownClassName="date-picker-component"
                  onChange={handleChange}
                  format={dateFormat}
                  showToday={false}
                  disabledDate={disabledDate}
                  value={getCurrentMomentDate(date).local()}
                  renderExtraFooter={renderExtraFooter}
                  disabled={props.isDisabled}
                />
              )
              : (
                <StyledRangeDatePicker
                  open={isOpen}
                  placeholder={['Дата начала интрвала', 'Дата окончания интрвала']}
                  value={[getCurrentMomentDate(props.startDate).local(), getCurrentMomentDate(props.date).local()]}
                  dropdownClassName="date-picker-component"
                  showToday={false}
                  format={dateFormat}
                  onChange={handleChangeRange}
                  disabledDate={disabledDate}
                  disabled={props.isDisabled}

                  // placeholder="Искомая дата"
                  // dropdownClassName="date-picker-component"
                  // onChange={handleChange}
                  // format={dateFormat}
                  // showToday={false}
                  // disabledDate={disabledDate}
                  // value={date ? getCurrentMomentDate(date).local() : getCurrentMomentDate()}
                  // renderExtraFooter={renderExtraFooter}
                />
              )
          }
        </div>
      </StyledRadioDate>
    </DateRadioGroup>
  );
};

export const DateComponent = React.memo(DatePickerComponent);

