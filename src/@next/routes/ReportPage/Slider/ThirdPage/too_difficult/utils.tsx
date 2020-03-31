import * as React from 'react';

import { StyledPercent, StyledDetailTableSpan } from 'components/ReportsWidgets/DetailTable';
import { REPORT_RED, REPORT_GREEN, REPORT_YELLOW } from 'components/ReportsWidgets/constants';

import {
  violationsObjects,
  criticalViolationsObjects,
  matchingTableLastDay,
  matchingTableCurrentDay,
} from '@next/routes/ReportPage/Slider/ThirdPage/too_difficult/constants';

import { AdvancedTableColumn } from 'components/HelpInfo/widgets/types';
import { ReportStore } from 'app/store/modules/report/types';
import { checkPercentValue } from 'utils';
import { LegendItem } from 'app/store/modules/semantics/types';

const getPercentColor = (legendForReport: ReportStore['data']['colorSchema']['legend']) => (percent: number): Partial<LegendItem> => {
  let color = { colorValue: '#ffff'};
  legendForReport.some((item) => {
    if(!item.emoji){
      if(percent >= item.minPercent && percent <= item.maxPercent){        
        color = item;
        return true;
      }
    }
    return false;
  });
  return color;
};

const checkNameAndDelta = (key, object) => key === 'name' || key === 'delta' ? key : `${object}.${key}`;

export const getPercentComparisonObj = (percent: number) => {
  if(percent > 0) {
    return {
      color: REPORT_RED,
      emoji: '😟',
    };
  }
  if( percent === 0){
    return {
      color: REPORT_YELLOW,
      emoji: '😐',
    };
  }
  if(percent < 0){
    return {
      color: REPORT_GREEN,
      emoji: '😊',
    };
  }
};

export const getViolationsObjectsColumn = (key:  string) => {
  switch(key){
    case 'violation':
      return (text, record) => 
        <StyledDetailTableSpan isBold>{text} </StyledDetailTableSpan>;
    case 'winterViolation':
    case 'allViolation':
      return (text, record) => 
        <StyledDetailTableSpan isItalic>{text}</StyledDetailTableSpan>;
  }
};

export const getCriticalObjectColumn = (key:  string) => {
  switch(key){
    case 'criticalViolation':
      return (text, record) => 
        <StyledDetailTableSpan isCritic isBold>{text}</StyledDetailTableSpan>;
    case 'winterCriticalViolation':
    case 'allCriticalViolation':
      return (text, record) => 
        <StyledDetailTableSpan isCritic isItalic>{text}</StyledDetailTableSpan>;
  }
};

export const getTextColor = (color: string) => {
  let textColor = '#ffff';
  if (color) {
    /* eslint-disable */
    if (color.indexOf('light') > -1 ||
        color.indexOf('not_critical_winter_season_violation') > -1 ||
        color.indexOf('orange') > -1 ||
        color.indexOf('not_critical') > -1 ||
        color.indexOf('no_violation') > -1 ||
        color.indexOf('critical_all_season_violation') > -1){
      textColor = 'black';
    } else 
    if (color.indexOf('green') > -1 || color.indexOf('critical_winter_season_violation') > -1 ){
      textColor = '#ffff';
    }
  }
  return textColor;
}

export const getRenderCell = (legend: ReportStore['data']['colorSchema']['legend'], key: string) => {
  if(violationsObjects.indexOf(key) > -1){
    return getViolationsObjectsColumn(key);
  }
  if(criticalViolationsObjects.indexOf(key) > -1){
    return getCriticalObjectColumn(key);
  }
  if(key === 'percent'){
    return (text, record) => {
      const color = getPercentColor(legend)(text >= 100 ? 100 : text);
      const textColor = getTextColor(color.color); 
      return (
        <StyledPercent backgroundColor={color.colorValue} textColor={textColor}>
          {
            text ? checkPercentValue(text) : '0 %'
          }
        </StyledPercent>
      );
    };
  }
  if(key === 'delta'){
    return (text, record) => {
      const obj = getPercentComparisonObj(text) || {color: 'black', emoji: '🙄'};
      return <StyledPercent backgroundColor={obj.color}>{obj.emoji}</StyledPercent>;
    };
  }
  return null;
};

export const prepareDetailTable = (legend: ReportStore['data']['colorSchema']['legend']) => {    
  const columnsLastDay = Object.keys(matchingTableLastDay).map((key) => {
    const renderCell = getRenderCell(legend, key);
    const column: AdvancedTableColumn = {
      key: checkNameAndDelta(key, 'lastDay'),
      dataIndex: checkNameAndDelta(key, 'lastDay'),
      title: matchingTableLastDay[key],
      renderCell: renderCell ? renderCell : (text, record) => <span>{text}</span>,
    };
    return column;
  });
  const columnsCurrentDay = Object.keys(matchingTableCurrentDay).map((key) => {
    const renderCell = getRenderCell(legend, key);
    const column: AdvancedTableColumn = {
      key: checkNameAndDelta(key, 'currentDay'),
      dataIndex: checkNameAndDelta(key, 'currentDay'),
      title: matchingTableCurrentDay[key],
      ...(renderCell ? {renderCell} : { renderCell: (text, record) => <span>{text}</span>})
    };
    return column;
  });

  return [...columnsLastDay, ...columnsCurrentDay ];
};

export const prepareWeatherData = (response) => {
  const data = [];
  data[1] = response.currentDay;
  data[0] = response.lastDay;
  return data;
};