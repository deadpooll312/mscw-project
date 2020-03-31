import * as React from 'react';
import { Row, Column, Value, Description, ColumnTitle } from '@next/routes/ReportPage/Slider/SecondPage/styled';
import { checkPercentValue } from 'utils';
import { useStyledTheme } from 'styles/themes/hooks';

type Props = {
  data: {
    date: string;
    checkToTotalPercent: string | number;
    checkedObject: string | number;
    totalObject: string | number;
    violationToTotalPercent: string | number;
    violationCitizenPercent: string | number;
    violationObject: string | number;
    violationChecksCitizen: string | number;
    violationGovPercent: string | number;
    violationCheckGov: string | number;
    violationCheckGovAndCitizenPercent: string | number;
    violationCheckGovAndCitizen: string | number;
    criticalViolationToViolationPercent: string | number;
    violationCritical: string | number;
    [k: string]: any;
  };
  colors: {
    greenColor: {
      color: string;
    };
    orangeColor: {
      color: string;
    };
    redColor: {
      color: string;
    };
  };
};

const DayColumnData: React.FC<Props> = (props) => {
  const { colors, data } = props;
  const { greenColor, orangeColor, redColor } = colors;
  const theme = useStyledTheme();
  
  return (
    <Column>
      <ColumnTitle  textColor={theme.colors.dashboardCard.defaultText}>За {data.date}:</ColumnTitle>
      <Row>
        <Value textColor={greenColor.color} flexBasic={90}>
          {checkPercentValue(data.checkToTotalPercent)}
        </Value>
        <Description>
          Объектов проверено <b>{data.checkedObject}</b> из <b>{data.totalObject}</b> объектов
        </Description>
      </Row>
      <Row>
        <Value textColor={orangeColor.color} flexBasic={90}>
          {checkPercentValue(data.violationToTotalPercent)}
        </Value>
        <Description>
          Объектов с нарушениями <b>{data.violationObject}</b> из <b>{data.checkedObject}</b> объектов
        </Description>
      </Row>
      <Row>
        <Value textColor={theme.colors.dashboardCard.defaultText} fontSize={1.5} flexBasic={90}>
          {checkPercentValue(data.violationCitizenPercent)}
        </Value>
        <Description fontSize={1}>
          <b>{data.violationChecksCitizen}</b> объектов с нарушениями <br /> <b>Контроль жителей</b>
        </Description>
      </Row>
      <Row>
        <Value textColor={theme.colors.dashboardCard.defaultText} fontSize={1.5} flexBasic={90}>
          {checkPercentValue(data.violationGovPercent)}
        </Value>
        <Description fontSize={1}>
          <b>{data.violationCheckGov}</b> объектов с нарушениями <br /> <b>Ведомственный контроль</b>
        </Description>
      </Row>
      <Row>
        <Value textColor={theme.colors.dashboardCard.defaultText} fontSize={1.5} flexBasic={90}>
          {checkPercentValue(data.violationCheckGovAndCitizenPercent)}
        </Value>
        <Description fontSize={1}>
          <b>{data.violationCheckGovAndCitizen}</b> объектов с нарушениями <br /> <b>Контроль жителей + <br /> Ведомственный контроль</b>
        </Description>
      </Row>
      <Row>
        <Value textColor={redColor.color} flexBasic={90}>
          {checkPercentValue(data.criticalViolationToViolationPercent)}
        </Value>
        <Description>
          Объектов с критичными нарушениями <b>{data.violationCritical}</b> из <b>{data.violationObject}</b> объектов
        </Description>
      </Row>
    </Column>
  );
};

export default DayColumnData;