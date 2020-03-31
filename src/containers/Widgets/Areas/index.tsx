import * as React from 'react';
import { useSelector } from 'react-redux';
import { 
  AreasWrap, Area, Discription, DepartmentIcon, Together, 
  PeopleIcon, Text, IndicatorsWrap, ViolationsBlock, 
  Violations, PercentsBlock, Percents, Сhecked, Violation,
  StatisticsText, AreaControl, ToObjectPercentControl,
  ToObjectPercent, DiscriptionControl, IndicatorsWrapControl, FirstRow
} from './styled';
import Loading from '@next/ui/atoms/Loading';
import { selectModuleReportWidgetPageChartFormated, selectModuleReportWidgetPageChartIsLoading } from 'app/store/modules/analytics/selectors';

type Props = {};

// const checkPositive = (lastPeriodPercent) => lastPeriodPercent?.includes('-');
let isPlus = false;

const selectIcon = (chart) => {
  if (chart.type === 'government') {
    return <DepartmentIcon />;
  } else if (chart.type === 'citizen') {
    return <PeopleIcon />;
  } else if (chart.type === 'government_citizen') {
    return <Together />;
  } else if (chart.type === 'checked_object') {
    return <Сhecked />;
  } else if (chart.type === 'violation_object') {
    return <Violation />;
  }
};

const selectColor = (lastPeriodPercent) => {
  if (lastPeriodPercent?.includes('-')) {
    isPlus = false;
    return 'positive';
  } else if (lastPeriodPercent === '0.00') {
    isPlus = false;
    return 'unchanged';
  } else {
    isPlus = true;
    return 'negative';
  }
};

const textColor = (chart) => {
  if (chart.type === 'government') {
    return 'government';
  } else if (chart.type === 'citizen') {
    return 'citizen';
  } else if (chart.type === 'government_citizen') {
    return 'government_citizen';
  } else if (chart.type === 'checked_object') {
    return 'checked_object';
  } else if (chart.type === 'violation_object') {
    return 'violation_object';
  }
};

const WidgetsAreas: React.FC<Props> = React.memo(
  () => {
    const isLoading = useSelector(selectModuleReportWidgetPageChartIsLoading);
    const areasData = useSelector(selectModuleReportWidgetPageChartFormated);

    return (
      <AreasWrap>
        {
          isLoading
            ? (
              <Loading type="new_spinner" />
            )
            : (
              <React.Fragment>
                {/* <Indicators>
                          <p>Объекты с нарушениями</p>
                          <p>Динамика</p>
                        </Indicators> */}

                <FirstRow>
                  {
                    areasData?.allStatistics.map(chart => (
                      <Area key={chart.name}>
                        <Discription>
                          { selectIcon(chart) }
                          <StatisticsText typeDirection={textColor(chart)}>{chart.name}</StatisticsText>
                        </Discription>
                        <IndicatorsWrap>
                          <ViolationsBlock>
                            <ToObjectPercent typeDirection={textColor(chart)}>{`${chart.violationsToObjectPercent}%`}</ToObjectPercent>
                            <Violations>{`${chart.violation} из ${chart.amountObject}`}</Violations>
                          </ViolationsBlock>

                          <PercentsBlock>
                            {/* <Direction>
                              {
                                !!(chart.lastPeriodPercent !== '0.00') 
                                  && <StatisticsIcon typeDirection={checkPositive(chart.lastPeriodPercent) ? 'positive' : 'negative'}/>
                              }                    
                            </Direction> */}

                            <Percents typeDirection={selectColor(chart.lastPeriodPercent)} >{isPlus ? `+${chart.lastPeriodPercent}%`: `${chart.lastPeriodPercent}%`}</Percents>
                          </PercentsBlock>
                        </IndicatorsWrap>

                      </Area>
                    ))
                  }
                </FirstRow>

                {
                  areasData?.charts.map(chart => (
                    <AreaControl key={chart.name}>
                      <DiscriptionControl>
                        {/* { selectIcon(chart) } */}
                        <Text typeDirection={textColor(chart)}>{chart.name}</Text>
                      </DiscriptionControl>
                      <IndicatorsWrapControl>
                        <ViolationsBlock>
                          <ToObjectPercentControl typeDirection={textColor(chart)}>{`${chart.violationsToObjectPercent}%`}</ToObjectPercentControl>
                          <Violations>{`${chart.violation} из ${chart.amountObject}`}</Violations>
                        </ViolationsBlock>

                        <PercentsBlock>
                          {/* <Direction>
                            {
                              !!(chart.lastPeriodPercent !== '0.00') 
                                && <StatisticsIcon typeDirection={checkPositive(chart.lastPeriodPercent) ? 'positive' : 'negative'}/>
                            }                    
                          </Direction> */}

                          <Percents typeDirection={selectColor(chart.lastPeriodPercent)} >{isPlus ? `+${chart.lastPeriodPercent}%`: `${chart.lastPeriodPercent}%`}</Percents>
                        </PercentsBlock>
                      </IndicatorsWrapControl>

                    </AreaControl>
                  ))
                }
              </React.Fragment>
            )
        }
       
      </AreasWrap>
    );
  },
);

export default WidgetsAreas;
