import * as React from 'react';
import { useSelector } from 'react-redux';

import DefaultReportPageContainer from '@next/ui/templates/DefaultReportPage';
import { getFormattedDateWithSpace } from '@next/utils/dates';
import ReportFlexColumnContainer from '@next/ui/molecules/ReportFlexContainer';

import { Color } from '@next/ui/atoms/map/types';
import { SimpleText } from '@next/ui/atoms/SimpleText';
import { FlexRow } from '@next/ui/atoms/FlexRow';
import DayColumnData from '@next/ui/molecules/DayColumnData';
import ReportViolationRowData from '@next/ui/organisms/ReportViolationRowData';
import { REPORT_GREEN, REPORT_GREY } from 'styles/variables';
import DeltaDayColumn from '@next/ui/molecules/DeltaDayColumn';
import { selectDataSemanticPageIndexSecond, selectColorSchemaColorCode, selectDate } from 'app/store/modules/report/selectors';

type Props = {};

const ReportSecondPage: React.FC<Props> = React.memo(
  () => {
    const date = useSelector(selectDate);
    const data = useSelector(selectDataSemanticPageIndexSecond);
    const legend = useSelector(selectColorSchemaColorCode);

    const currentDay = data.currentDay;
    const lastDay = data.lastDay;
    const delta = data.delta;

    const colors = React.useMemo(
      () => {
        const greenColor = legend.find((item) => item.code === Color.GREEN );
        const orangeColor = legend.find((item) => item.code === Color.ORANGE);
        const redColor = legend.find((item) => item.code === Color.RED);

        return {
          greenColor,
          orangeColor,
          redColor,
        };
      },
      [
        legend,
      ],
    );
    const dateFormat = getFormattedDateWithSpace(date);
  
    const dateText = `Статистика качества содержания объектов городского хозяйства за ${
      dateFormat
    } года`;

    return (
      <DefaultReportPageContainer page={2}>
        <SimpleText>{dateText}</SimpleText>
        <ReportFlexColumnContainer alignItems="center" marginValue={0}>
          <FlexRow>
            <DayColumnData data={lastDay} colors={colors} />
            <DeltaDayColumn delta={delta} colors={colors} />
            <DayColumnData data={currentDay} colors={colors} />
          </FlexRow>

          <ReportViolationRowData
            title="ЗИМНИЕ НАРУШЕНИЯ"
            titleColor="#3666a7"
            textColor={colors.orangeColor.color}

            lastDayObjectWithViolations={lastDay.winter}
            deltaObjectWithViolations={delta.winter}
            currentDayObjectWithViolations={currentDay.winter}
          />
          <ReportViolationRowData
            title="ВСЕСЕЗОННЫЕ НАРУШЕНИЯ"
            titleColor={REPORT_GREEN}
            textColor={colors.orangeColor.color}

            lastDayObjectWithViolations={lastDay.all}
            deltaObjectWithViolations={delta.all}
            currentDayObjectWithViolations={currentDay.all}
          />
          <ReportViolationRowData
            title="ЗИМНИЕ И ВСЕСЕЗОННЫЕ НАРУШЕНИЯ"
            titleColor={REPORT_GREY}
            textColor={colors.redColor.color}

            lastDayObjectWithViolations={lastDay.winter_and_all}
            deltaObjectWithViolations={delta.winter_and_all}
            currentDayObjectWithViolations={currentDay.winter_and_all}
          />
        </ReportFlexColumnContainer>
      </DefaultReportPageContainer>
    );
  },
);

export default ReportSecondPage;