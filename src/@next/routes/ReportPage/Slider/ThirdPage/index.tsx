import * as React from 'react';
import { useSelector } from 'react-redux';

import { WeatherStateTable, StyledSnowHeight } from 'components/ReportsWidgets/WeatherState';
import { DetailTable } from 'components/ReportsWidgets/DetailTable';
import { DetailTableLegend } from 'components/ReportsWidgets/DetailTableLegend';

import { prepareDetailTable, prepareWeatherData } from '@next/routes/ReportPage/Slider/ThirdPage/too_difficult/utils';
import { renderDetailTableHeader, weatherTableColumns } from '@next/routes/ReportPage/Slider/ThirdPage/too_difficult/constants';

import { AdvancedTableColumn } from 'components/HelpInfo/widgets/types';
import { RegionInfo } from 'components/ReportsWidgets/types';
import { getPluralDays, sortNumber } from '@next/utils/common';
import { PageThreeData } from 'app/store/modules/report/types';

import { getFormattedDateWithSpace } from '@next/utils/dates';
import DefaultReportPageContainer from '@next/ui/templates/DefaultReportPage';
import { selectDataSemanticPageIndexThird, selectColorSchemaLegent, selectDate } from 'app/store/modules/report/selectors';

type Props = {};

const ReportThirdPage: React.FC<Props> = React.memo(
  () => {
    const data = useSelector(selectDataSemanticPageIndexThird);
    const legend = useSelector(selectColorSchemaLegent);
    const selectedDate = useSelector(selectDate);

    if (!data){
      return null;
    }
    const commonColumns = prepareDetailTable(legend);
    const lastDaySource = data.lastDay.info;
    const dataSource = React.useMemo(() =>
      data.currentDay.info.map((item) => ({
        name: item.name,
        currentDay: item,
        lastDay: lastDaySource.find((el) => el.name === item.name),
        delta: item.percent - lastDaySource.find((el) => el.name === item.name).percent,
      })).sort((a, b) => sortNumber(b.currentDay.percent, a.currentDay.percent)), [data]);

    const weatherDataSource = prepareWeatherData(data);
    const regionsInfoColumns: AdvancedTableColumn[] = React.useMemo(() =>
      weatherDataSource?.length && weatherDataSource[0].info.map((element: RegionInfo) => ({
        key: element.name,
        dataIndex: 'info',
        title: element.name,
        renderCell: (infoElements, record: PageThreeData['lastDay']) => {
          const regionInfo = record.info.find(item => element.name === item.name) || {daysAfterSnowfall: 0, snowDepth: 0};
          const daysAfterSnowfallIsExist = typeof regionInfo.daysAfterSnowfall !== 'undefined';
          const snowDepthIsExist = typeof regionInfo.snowDepth !== 'undefined';
          return (
            <React.Fragment>
              <p> {daysAfterSnowfallIsExist ? getPluralDays(regionInfo.daysAfterSnowfall) : 'Нет данных'} </p>
              <StyledSnowHeight colorStatus="green"> { snowDepthIsExist ? `${regionInfo.snowDepth} см` : 'Нет данных' }  </StyledSnowHeight>
            </React.Fragment>
          );
        }
      })
      ), [weatherDataSource]);

    const tableColumns = weatherTableColumns.concat(regionsInfoColumns || []);

    const momentDay = getFormattedDateWithSpace(selectedDate);

    return (
      <DefaultReportPageContainer page={3}>
        <p>{`Статистика качества содержания объектов городского хозяйства за ${momentDay} `}</p>
        <WeatherStateTable
          dataSource={weatherDataSource}
          tableColumns={tableColumns}
        />
        <DetailTable
          lastDayDate={data.lastDay.date}
          currentDayDate={data.currentDay.date}
          columns={commonColumns}
          dataSource={dataSource}
          renderHeader={renderDetailTableHeader}
        />
        <DetailTableLegend
          legend={legend}
        />
      </DefaultReportPageContainer>
    );
  },
);

export default ReportThirdPage;
