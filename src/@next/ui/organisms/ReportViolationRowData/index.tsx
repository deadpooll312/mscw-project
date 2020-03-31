import * as React from 'react';

import { Row, Column, Value, Description, ColumnTitle, FlexRow } from '@next/routes/ReportPage/Slider/SecondPage/styled';
import { valueWithplusOrMinus } from '@next/utils/common';

type Props = {
  title: string;
  titleColor: string;
  textColor: string;

  lastDayObjectWithViolations: number;
  deltaObjectWithViolations: number;
  currentDayObjectWithViolations: number;
};

const ReportViolationRowData: React.FC<Props> = React.memo(
  (props) => {
    return (
      <React.Fragment>
        <ColumnTitle textColor={props.titleColor}>{props.title}</ColumnTitle>
        <FlexRow>
          <Column>
            <Row>
              <Value textColor={props.textColor} flexBasic={90}>
                {props.lastDayObjectWithViolations}
              </Value>
              <Description>
                Объектов с нарушениями
              </Description>
            </Row>
          </Column>
          <Column>
            <Row>
              <Value textColor={props.textColor} flexBasic={90}>
                { valueWithplusOrMinus(props.deltaObjectWithViolations) }
              </Value>
              <Description>
                Объектов с нарушениями
              </Description>
            </Row>
          </Column>
          <Column>
            <Row>
              <Value textColor={props.textColor} flexBasic={90}>
                {props.currentDayObjectWithViolations}
              </Value>
              <Description>
                Объектов с нарушениями
              </Description>
            </Row>
          </Column>
        </FlexRow>
      </React.Fragment>
    );
  },
);

export default ReportViolationRowData;
