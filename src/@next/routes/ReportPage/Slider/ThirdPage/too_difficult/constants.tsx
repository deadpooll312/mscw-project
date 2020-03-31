import * as React from 'react';
import { StyledDetailTableSpan } from 'components/ReportsWidgets/DetailTable';
import { AdvancedTableColumn } from 'components/HelpInfo/widgets/types';

export const matchingTableLastDay = {
  name: 'Округ',
  totalObject: 'Общее количество объектов контроля',
  checkedObject: 'Количество проверенных объектов',
  violation: 'Всего',
  winterViolation: 'Зимние',
  allViolation: 'Всесезонные',
  criticalViolation: 'Всего',
  winterCriticalViolation: 'Зимние',
  allCriticalViolation: 'Всесезонные',
  percent: 'Доля объектов с нарушениями от проверенных',
};

export const matchingTableCurrentDay = {
  checkedObject: 'Количество проверенных объектов',
  violation: 'Всего',
  winterViolation: 'Зимние',
  allViolation: 'Всесезонные',
  criticalViolation: 'Всего',
  winterCriticalViolation: 'Зимние',
  allCriticalViolation: 'Всесезонные',
  percent: 'Доля объектов с нарушениями от проверенных',
  delta: ''
};

export const violationsObjects = [
  'violation',
  'winterViolation',
  'allViolation',
];

export const criticalViolationsObjects = [
  'criticalViolation',
  'winterCriticalViolation',
  'allCriticalViolation',
];

export const renderDetailTableHeader = () => (
  <React.Fragment>
    <tr>
      <th rowSpan={2}> {matchingTableLastDay.name}</th>
      <th rowSpan={2}>{matchingTableLastDay.totalObject}</th>
      <th rowSpan={2}>{matchingTableLastDay.checkedObject}</th>
      <th colSpan={3}> Количество объектов с нарушениями </th>
      <th colSpan={3}>Количество объектов <StyledDetailTableSpan isCritic>с критичными</StyledDetailTableSpan> нарушениями</th>
      <th rowSpan={2}>{matchingTableLastDay.percent}</th>
            
      <th rowSpan={2}>{matchingTableCurrentDay.checkedObject}</th>
      <th colSpan={3}> Количество объектов с нарушениями </th>
      <th colSpan={3}>Количество объектов <StyledDetailTableSpan isCritic>с критичными</StyledDetailTableSpan> нарушениями</th>
      <th rowSpan={2}>{matchingTableCurrentDay.percent}</th>
    </tr>
    <tr>
      <th><b>{matchingTableLastDay.violation}</b></th>
      <th><i>{matchingTableLastDay.winterViolation}</i></th>
      <th><i>{matchingTableLastDay.allViolation}</i></th>
      <th><b>{matchingTableLastDay.criticalViolation}</b></th>
      <th><i>{matchingTableLastDay.winterCriticalViolation}</i></th>
      <th><i>{matchingTableLastDay.allCriticalViolation}</i></th>

      <th><b>{matchingTableCurrentDay.violation}</b></th>
      <th><i>{matchingTableCurrentDay.winterViolation}</i></th>
      <th><i>{matchingTableCurrentDay.allViolation}</i></th>
      <th><b>{matchingTableCurrentDay.criticalViolation}</b></th>
      <th><i>{matchingTableCurrentDay.winterCriticalViolation}</i></th>
      <th><i>{matchingTableCurrentDay.allCriticalViolation}</i></th>
    </tr>
  </React.Fragment>
);

export const weatherTableColumns: AdvancedTableColumn[] = [
  {
    key: 'date',
    dataIndex: 'date',
    title: <> </>
  },
  {
    key: 'temperature',
    dataIndex: 'temperature',
    title: <> </>,
    renderCell: (text, record) => <b>{typeof text !== 'undefined' ? `${text} °C` : 'Нет данных'} </b>
  },

];
