import * as moment from 'moment';
import 'moment/locale/ru';
import CONSTANTS from '@next/constants';

export const dateSpaceFormat = 'DD MMMM YYYY';
export const dateDotFormat = 'DD.MM.YYYY';
export const dateDashFormat = 'YYYY-MM-DD';
export const timeFormat = 'HH:mm:ss';
export const timeFormatWithoutSec = 'HH:mm';
export const dateDayMonthFormat = 'DD MMMM';
export const reportDateFormat = 'DD:MM:YYYY HH:mm';

export const dateTimeDotFormat = `${dateDotFormat} ${timeFormat}`;
export const dateTimeDotFormatWithoutSec = `${dateDotFormat} ${timeFormatWithoutSec}`;
export const dateTimeFormatStandart = `${dateDashFormat}T${timeFormat}`;

export const getUtcDate = (date) => {
  return moment.utc(date);
};
export const getCurrentMomentDate = (date?: moment.MomentInput) => {
  return moment(date);
};

export const formateDate = (date: moment.MomentInput, format?: string, options?: { local?: boolean; utc?: boolean }) => {
  let dateMoment = options?.utc ? getUtcDate(date) : getCurrentMomentDate(date);

  if (dateMoment.isValid()) {
    if (options?.local) {
      dateMoment = dateMoment.local();
    }

    return dateMoment.format(format);
  }
  return '';
};

export const getFormattedDateWithSpace = (date: moment.MomentInput, local?: boolean) => {
  return formateDate(date, dateSpaceFormat, { local });
};

export const getFormattedDate = (date: moment.MomentInput, local?: boolean) => {
  return formateDate(date, dateDotFormat, { local });
};

export const getFormattedDashDate = (date: moment.MomentInput, local?: boolean, utc?: boolean) => {
  return formateDate(date, dateDashFormat, { local, utc });
};

export const getFormattedDayMonthDate = (date: moment.MomentInput, local?: boolean) => {
  return formateDate(date, dateDayMonthFormat, { local });
};

export const getFormattedDateTime = (date: moment.MomentInput, local?: boolean, withoutSec?: boolean) => {
  return formateDate(date, withoutSec ? dateTimeDotFormatWithoutSec : dateTimeDotFormat, { local });
};

export const getDateFromUtcToLocal = (date: moment.MomentInput) => {
  return getUtcDate(date).local();
};

export const getFormattedDateTimeStandart = (date: moment.MomentInput, local?: boolean) => {
  return formateDate(moment(date).utc(), dateTimeFormatStandart, { local });
};
export const getFormattedUtcDateTimeStandart = (date: moment.MomentInput, options?: { local?: boolean; utc?: boolean }) => {
  return formateDate(date, dateTimeFormatStandart, options);
};

export const setMomentUnit = (date: moment.MomentInput, unit: moment.unitOfTime.All, count: number) => {
  return formateDate(getCurrentMomentDate(date).set(unit, count));
};

export const diffDates = (
  dateA?: moment.MomentInput,
  dateB?: moment.MomentInput,
  typeDiff: 'seconds' | 'hours' | 'minutes' | 'days' | 'months' = 'seconds',
  float: boolean = true,
): number => {
  return moment(dateA).diff(moment(dateB), typeDiff, float);
};

export const diffDatesByDays = (dateA: moment.MomentInput, dateB: moment.MomentInput) => {
  return diffDates(getFormattedDashDate(dateA), getFormattedDashDate(dateB), 'days');
};

export const set210000IfNotToday = (date: moment.MomentInput) => {
  const diffInDays = diffDatesByDays(getCurrentMomentDate(), date);

  if (diffInDays > CONSTANTS.COUNT.ZERO) {
    return setDateTime210000(getCurrentMomentDate(date).clone());
  }

  const cloneDate = getCurrentMomentDate(date).clone();

  return setDateTimeCurrent(cloneDate);
};

export const set210000YesterdayIfNotToday = (date: moment.MomentInput) => {
  const diffInDays = diffDatesByDays(getCurrentMomentDate(), date);

  if (diffInDays > CONSTANTS.COUNT.ZERO) {
    return setDateTime210000(dateSubtractDays(getCurrentMomentDate(date).clone(), 1));
  }

  const cloneDate = getCurrentMomentDate(date).clone();

  return setDateTimeCurrent(cloneDate);
};

export const set2059IfNotToday = (date: moment.MomentInput) => {
  const diffInDays = diffDatesByDays(getCurrentMomentDate(), date);

  if (diffInDays > CONSTANTS.COUNT.ZERO) {
    return setDateTime2059(getCurrentMomentDate(date).clone());
  }

  const cloneDate = getCurrentMomentDate(date).clone();

  return setDateTimeCurrent(cloneDate);
};

export const set2059IfNotTodayModify = (date: moment.MomentInput) => {
  const diffInDays = diffDatesByDays(getCurrentMomentDate(), date);

  if (diffInDays > CONSTANTS.COUNT.ZERO) {
    return setDateTime2059(getCurrentMomentDate(date).clone());
  }

  const countHours = moment.utc(date).get('hours');
  const cloneDate = getCurrentMomentDate(date).clone();

  if (countHours >= CONSTANTS.TIME.TWENTY_ONE_HOUR_GRINWICH && countHours < 21) {
    return setDateTime2059(cloneDate);
  } else {
    return setDateTimeCurrent(cloneDate);
  }
};

export const dateSubtract = (date: moment.MomentInput, amount?: moment.DurationInputArg1, unit?: moment.DurationInputArg2) => {
  return moment(date).subtract(amount, unit);
};

export const dateSubtractDays = (date: moment.MomentInput, unit?: moment.DurationInputArg1) => {
  return formateDate(moment(date).subtract(unit, 'days'));
};

export const setDateTime210000 = (dateOwn: moment.MomentInput) => {
  const date = moment(dateOwn);
  date.hours(21);
  date.minutes(0);
  date.seconds(0);

  return formateDate(date);
};

export const setDateTime2059 = (dateOwn: moment.MomentInput) => {
  const date = moment(dateOwn);
  date.hours(20);
  date.minutes(59);
  date.seconds(0);

  return formateDate(date);
};

export const setDateTimeCurrent = (dateOwn: moment.MomentInput) => {
  const date = moment(dateOwn);
  date.hours(getCurrentMomentDate().get('hour'));
  date.minutes(getCurrentMomentDate().get('minutes'));
  date.seconds(0);

  return formateDate(date);
};

export const getLastCleaningDate = (dateOwn: moment.MomentInput) => {
  let date = formateDate(dateOwn);

  if (diffDatesByDays(getCurrentMomentDate(), date) > CONSTANTS.COUNT.ZERO) {
    date = setDateTime210000(dateSubtractDays(date, CONSTANTS.TIME.ONE_DAY));
  }

  if (diffDatesByDays(getCurrentMomentDate(), date) === CONSTANTS.COUNT.ZERO) {
    return formateDate(getCurrentMomentDate());
  }

  return date;
};

export const checkToday21AndSubtract = (dateOwn: moment.MomentInput) => {
  const date = moment.utc(dateOwn);
  const diffInDays = diffDatesByDays(getCurrentMomentDate(), dateOwn);
  let numberToSubtract = CONSTANTS.TIME.SIX_DAYS;
  
  //если не сегодня
  if (diffInDays > CONSTANTS.COUNT.ZERO) {
    return dateSubtractDays(dateOwn, numberToSubtract);
  }

  const countHours = date.get('hours');
  if (countHours >= CONSTANTS.TIME.TWENTY_ONE_HOUR_GRINWICH && countHours < 21) {
    numberToSubtract = CONSTANTS.TIME.FIVE_DAYS;
  }
  
  return dateSubtractDays(date, numberToSubtract);
};

export const getReportFormattedDate = (date: moment.MomentInput) => {
  return formateDate(date, reportDateFormat, {local: true});
};
