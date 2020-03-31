import * as React from 'react';
import { Icon } from 'antd';
import {
  StyledTimePicker,
  StyledHour,
  StyledIncDec,
  StyledSeparator,
  StyledTimeInput,
  StyledApplyButton,
  StyledFooter,
  StyledContent } from './styled';
import { TimePickerProps } from './types';
import { getCurrentMomentDate } from '@next/utils/dates';

const checkTime = (minute: number) => {
  if(minute > 0 && Number(minute) < 10) {
    return `0${minute}`;
  }
  if(minute === 0) {
    return '00';
  }
  return minute;
};

const TimePicker: React.FC<TimePickerProps> = (props) => {
  const { time } = props;
  const [currentHour, setCurrentHour] = React.useState(time ? time.local().get('hour') : getCurrentMomentDate().hour());
  const [currentMinutes, setCurrentMinutes] = React.useState(time ? time.local().get('minute') : getCurrentMomentDate().minute());
  const hourRef = React.useRef(null);
  const minuteRef = React.useRef(null);

  React.useEffect(() => {
    hourRef.current.input.value = checkTime(currentHour);
    minuteRef.current.input.value = checkTime(currentMinutes);
  }, [time]);

  const changeHour = (direction?: string) => (e) => {
    const value = e?.target.value ? Number(e.target.value) : currentHour;
    let result = !isNaN(value) ? value : 0;
    if (direction === 'INC' && value < 23) {
      result = value + 1;
    } else if (direction === 'DEC' && value > 0) {
      result = value - 1;
    } else if (value > 23) {
      result = 0;
    } else if (value < 0) {
      result = 23;
    }
    setCurrentHour(result);
    setTimeout(() => {
      hourRef.current.input.value = checkTime(result);
    }, 10);
  };

  const changeMinutes = (direction?: string) => (e) => {
    const value = e?.target.value ? Number(e.target.value) : currentMinutes;
    let result = !isNaN(value) ? value : 0;
    if (direction === 'INC' && value < 59) {
      result = value + 1;
    } else if (direction === 'DEC' && value > 0) {
      result = value - 1;
    } else if (value > 59) {
      result = 0;
    } else if (value < 0) {
      result = 59;
    }
    setCurrentMinutes(result);
    setTimeout(() => {
      minuteRef.current.input.value = checkTime(result);
    }, 10);
  };

  const onApplyBtnClick = () => {
    const time = getCurrentMomentDate();
    time.set('hour', currentHour);
    time.set('minute', currentMinutes);
    time.set('seconds', 0);
    props.onApplyBtnClick(time);
  };

  const HourInput = React.useMemo(()  => <StyledTimeInput type='text' ref={hourRef} onChange={changeHour()} value={currentHour}/>, [currentHour]);
  const MinuteInput = React.useMemo(() => <StyledTimeInput ref={minuteRef} type='text' onChange={changeMinutes()} value={currentMinutes}/>, [currentMinutes]);

  return (
    <StyledTimePicker>
      <StyledContent>
        <StyledHour>
          <StyledIncDec onClick={changeHour('INC')}>
            <Icon type="up" />
          </StyledIncDec>
          {HourInput}
          <StyledIncDec onClick={changeHour('DEC')}>
            <Icon type="down" />
          </StyledIncDec>
        </StyledHour>

        <StyledSeparator>:</StyledSeparator>

        <StyledHour>
          <StyledIncDec onClick={changeMinutes('INC')}>
            <Icon type="up" />
          </StyledIncDec>
          {MinuteInput}
          <StyledIncDec onClick={changeMinutes('DEC')}>
            <Icon type="down" />
          </StyledIncDec>
        </StyledHour>
      </StyledContent>
      <StyledFooter>
        <StyledApplyButton onClick={onApplyBtnClick} >Применить</StyledApplyButton>
      </StyledFooter>
    </StyledTimePicker>
  );
};

export default React.memo(TimePicker);
