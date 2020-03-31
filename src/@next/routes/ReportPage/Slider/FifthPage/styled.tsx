import * as React from 'react';
import styled from 'styled-components';

import TableAdvanced from '@next/ui/atoms/TableAdvanced';
import { REPORT_RED } from 'components/ReportsWidgets/constants';
import { fifthReportTableNames } from '@next/routes/ReportPage/Slider/FifthPage/constants';

export const StyledFifthReportPage = styled.div`
  h2 {
    font-family: 'Circe-Bold';
    font-weight: bold;
  }
  &&& ${TableAdvanced}{
    tbody, thead {
      width: auto;
      position: relative;
    }
    th, td {
      width: 200px;
      border: 1px solid grey;
      font-size: 13px;
      padding: 5px;
    }
    th {
      height: initial;
    }
  }
`;

const Span = styled.span<{ color: string }>`
  color: ${({ color }) => color || 'black'};
`;

const BigB = styled.b`
  font-size: 13px;
`;

export const renderDetailTableHeader = () => (
  <React.Fragment>
    <tr>
      <th rowSpan={2}>{fifthReportTableNames.name}</th>
      <th rowSpan={2}>{fifthReportTableNames.totalObject}</th>
      <th rowSpan={2}>{fifthReportTableNames.totalChecked}</th>
      <th colSpan={4}><BigB>Ведомственный контроль</BigB></th>
      <th colSpan={4}><BigB>Контроль жителей</BigB></th>
      <th colSpan={4}><BigB>Сводный контроль</BigB></th>
    </tr>
    <tr>
      <th>{fifthReportTableNames.departmentalControl_uniqueCheckedPercent}</th>
      <th>{fifthReportTableNames.departmentalControl_violationToCheckedPercent}</th>
      <th>
        {'Доля объектов с '}<Span color={REPORT_RED}>критичными</Span>{' нарушениями, к всего проверенным объектов (%)*'}
      </th>
      <th>
        {'Место округа по доле объектов с '}<Span color={REPORT_RED}>критичными</Span>{' нарушениями**'}
      </th>

      <th>{fifthReportTableNames.citizenControl_uniqueCheckedPercent}</th>
      <th>{fifthReportTableNames.citizenControl_violationToCheckedPercent}</th>
      <th>
        {'Доля объектов с '}<Span color={REPORT_RED}>критичными</Span>{' нарушениями, к всего проверенным объектов (%)*'}
      </th>
      <th>
        {'Место округа по доле объектов с '}<Span color={REPORT_RED}>критичными</Span>{' нарушениями**'}
      </th>

      <th>{fifthReportTableNames.consolidatedControl_uniqueCheckedPercent}</th>
      <th>{fifthReportTableNames.consolidatedControl_violationToCheckedPercent}</th>
      <th>
        {'Доля объектов с '}<Span color={REPORT_RED}>критичными</Span>{' нарушениями, к всего проверенным объектов (%)*'}
      </th>
      <th>
        {'Место округа по доле объектов с '}<Span color={REPORT_RED}>критичными</Span>{' нарушениями**'}
      </th>
    </tr>
    <tr>
      { Object.entries(fifthReportTableNames).map((_, index) => <th key={index + 1}>{index + 1}</th> ) }
    </tr>
  </React.Fragment>
);

export const ParagraphPreWrap = styled.p<{ centerText?: boolean; fontSize?: number }>`
  white-space: pre-wrap;
  text-align: ${({ centerText: centerText }) => centerText ? 'center' : 'initial'};
  font-size: ${({ fontSize }) => fontSize ? `${fontSize}px` : 'initial'};
  margin: 0 80px;
`;

export const H3NoneMargin = styled.h3`
  margin: 0;
`;