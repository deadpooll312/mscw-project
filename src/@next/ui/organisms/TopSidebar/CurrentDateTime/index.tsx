import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectModuleSidebarEndDateRaw, selectModuleSidebarUsePeriod, selectModuleSidebarStartDateRaw } from 'app/store/modules/sidebar/selectors';

import { getFormattedDateTime, formateDate, dateDotFormat, diffDatesByDays, dateSubtractDays, getCurrentMomentDate, set2059IfNotToday, set210000YesterdayIfNotToday, set2059IfNotTodayModify } from '@next/utils/dates';
import { changeSidebarDate } from 'app/store/modules/sidebar/actions';
import { DateComponent } from 'components/DatePicker';
import CONSTANTS from '@next/constants';
import { notification } from 'antd';
import FlexContainer from '@next/ui/atoms/FlexContainer';

type Props = {
  isDisabled: boolean;
};

const CurrentDateTime: React.FC<Props> = React.memo((props) => {
  const startDate = useSelector(selectModuleSidebarStartDateRaw);
  const endDate = useSelector(selectModuleSidebarEndDateRaw);
  const usePeriod = useSelector(selectModuleSidebarUsePeriod);

  const dispatch = useDispatch();

  const handleDateRangeChange = React.useCallback(
    (startDateNew: string, endDateNew: string, isNow?: boolean) => {
      if (diffDatesByDays(endDateNew, startDateNew) > CONSTANTS.TIME.SIX_DAYS) {
        notification.info({
          message: 'Период не должен превышать 7 дней',
          duration: 2.5,
        });

        return false;
      }
      const checkNewStartDate = set210000YesterdayIfNotToday(startDateNew);

      if (diffDatesByDays(endDateNew, checkNewStartDate) <= CONSTANTS.TIME.ONE_DAY) {
        notification.info({
          message: 'Минимальный период должен превышать 1 день',
          duration: 2.5,
        });

        return false;
      }

      const startDateNewFormat = formateDate(checkNewStartDate);

      //если сейчас - условия DITAODS19-1496 не действуют
      const dateToFormat = isNow ? getCurrentMomentDate(endDateNew) : set2059IfNotTodayModify(endDateNew);
      const endDateNewFormat = formateDate(dateToFormat);

      dispatch(
        changeSidebarDate(startDateNewFormat, endDateNewFormat),
      );
      return true;
    },
    [],
  );

  const handleDateChange = React.useCallback(
    (endDate: string, isNow?: boolean) => {
      if (usePeriod) {
        let numberToSubtract = CONSTANTS.TIME.SIX_DAYS;
        const countHours = getCurrentMomentDate(endDate).get('hours');
        if (countHours >= 21) {
          numberToSubtract = CONSTANTS.TIME.FIVE_DAYS;
        }
        handleDateRangeChange(
          dateSubtractDays(getCurrentMomentDate(), numberToSubtract),
          formateDate(getCurrentMomentDate()),
          isNow
        );
      } else {
        const endDateNew = formateDate(
          set2059IfNotToday(endDate)
        );

        dispatch(
          changeSidebarDate(endDateNew, endDateNew),
        );
      }
    },
    [usePeriod, handleDateRangeChange],
  );

  const handleTimeChange = React.useCallback((value) => {
    const newValue = formateDate(value);

    dispatch(
      changeSidebarDate(newValue, newValue),
    );
  }, []);

  return (
    <React.Fragment>
      {
        <div>
          <DateComponent
            startDate={startDate}
            date={endDate}
            dateFormat={dateDotFormat}
            onDateChange={handleDateChange}
            onTimeChange={handleTimeChange}
            showTime={!usePeriod}
            rangePicker={usePeriod}
            onDateRngeChange={handleDateRangeChange}
            isDisabled={props.isDisabled}
          />
        </div>
      }
      <b>
        <FlexContainer flexDirection="column">
          { usePeriod && <div>{startDate && getFormattedDateTime(startDate, true, true)}</div> }
          <div>{endDate && getFormattedDateTime(endDate, true, true)}</div>
        </FlexContainer>
      </b>
    </React.Fragment>
  );
});

export default CurrentDateTime;

